import mongoose from "mongoose";
import Shipment from "../model/shipment.js";
import { calculateETA } from "./ETA.js";
import { get_Coordinates } from "./GetCoor.js";

export const CreateShipment = async (req, res) => {
    try {
        const { containerId, route, currentLocation, deliveredAt, status } = req.body;



        const Source_corr = await get_Coordinates(currentLocation);
        const Desti_coor = await get_Coordinates(deliveredAt);
        const Date = calculateETA(Source_corr, Desti_coor);

        const newShipment = new Shipment({
            containerId: containerId,
            route,
            currentLocation,
            currentETA: Date,
            deliveredAt: deliveredAt,
            destination_corr: Desti_coor,
            source_corr: Source_corr,
            status: status || "In Transit"
        });

        await newShipment.save();

        res.status(201).json({
            message: "Shipment created successfully"
        });

    }
    catch (error) {
        console.error("Error creating shipment:", error);
        res.status(500).json({ error: "Failed to create shipment" });
    }

};

export const RetrieveDetail = async (req, res) => {
    try {
        const { id } = req.params;



        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid shipment ID format" });
        }

        const shipment = await Shipment.findById(id).select('-createdAt -updatedAt');

        if (!shipment) {
            return res.status(404).json({ error: "Shipment not found" });
        }

        return res.status(200).json({ data: shipment });
    } catch (error) {
        console.error("Backend error in RetrieveDetail:", error);
        return res.status(500).json({ error: "Error in retrieving" });
    }
};

export const GetETA = async (req, res) => {


    try {


        const { id } = req.params;

        const shipment = await Shipment.findById(id).select('currentLocation deliveredAt currentETA');

        if (!shipment) {
            return res.status(404).json({ error: 'Shipment not found' });
        }

        // Format ETA to DD-MM-YYYY
        const eta = new Date(shipment.currentETA);
        const formattedETA = `${String(eta.getDate()).padStart(2, '0')}-${String(eta.getMonth() + 1).padStart(2, '0')}-${eta.getFullYear()}`;

        res.json({
            shipmentId: shipment._id,
            from: shipment.currentLocation,
            to: shipment.deliveredAt,
            eta: formattedETA
        });


    } catch (error) {

        console.error('Error fetching ETA:', err);
        res.status(500).json({ error: 'Server error while fetching ETA' });
    }
}

export const updateShipmentLocation = async (req, res) => {
    try {
        const { id } = req.params;
        const { newLocation } = req.body;



        if (!newLocation) {
            return res.status(400).json({ error: "newLocation is required in body" });
        }


        const shipment = await Shipment.findById(id);
        if (!shipment) {
            return res.status(404).json({ error: "Shipment not found" });
        }


        const Source_corr = await get_Coordinates(newLocation);
        const Desti_coor = shipment.destination_corr;

        shipment.source_corr = Source_corr;

        if (!Source_corr?.lat || !Source_corr?.lon || !Desti_coor?.lat || !Desti_coor?.lon) {
            return res.status(400).json({ error: "Invalid coordinates for ETA calculation" });
        }

        const eta = calculateETA(Source_corr, Desti_coor);


        shipment.currentLocation = newLocation;
        shipment.currentETA = eta;


        if (newLocation.toLowerCase() === shipment.deliveredAt.toLowerCase()) {
            shipment.status = 'Delivered';
        }

        await shipment.save();

        res.status(200).json({
            message: "Shipment location updated successfully",

        });

    } catch (error) {
        console.error("Error updating shipment location:", error);
        res.status(500).json({ error: "Server error updating shipment location" });
    }
};