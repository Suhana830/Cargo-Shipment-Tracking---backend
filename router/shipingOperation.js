import express from 'express'
import { CreateShipment, GetETA, updateShipmentLocation, RetrieveDetail } from '../controller/Shipment.js';


const router = express.Router();

router.post('/', CreateShipment);
router.get('/:id', RetrieveDetail);
router.get('/:id/eta', GetETA);
router.post('/:id/update-location', updateShipmentLocation);

export default router;