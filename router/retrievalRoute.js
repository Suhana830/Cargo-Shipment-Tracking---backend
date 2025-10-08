import express from 'express'
const route = express.Router();
import Shipment from '../model/shipment.js';

route.get('/', async (req, res) => {

    try {
        const allShipments = await Shipment.find().select('-destination_corr  -source_coor -createdAt -updatedAt');
        return res.status(200).json({
            data: allShipments
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Error in Retrieving the shiping data"
        })
    }


})

export default route;
