import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema({

    containerId: {
        type: String,
        required: true
    },
    route: {
        type: [String],
        required: true
    },
    currentLocation: {
        type: String,
        required: true
    },
    currentETA: {
        type: Date
    },
    deliveredAt: {
        type: String,
        required: true
    },
    destination_corr: {
        lat: { type: Number, required: true },
        lon: { type: Number, required: true }
    },
    source_corr: {
        lat: { type: Number, required: true },
        lon: { type: Number, required: true }
    },
    status: {
        type: String,
        enum: ['In Transit', 'Delivered'],
        default: 'Pending'
    }
}, { timestamps: true });

const Shipment = mongoose.model("Shipment", shipmentSchema);
export default Shipment;