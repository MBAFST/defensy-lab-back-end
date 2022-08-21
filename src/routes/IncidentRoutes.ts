import {Router} from "express"
import IncidentController from "../controllers/IncidentController";

const router = Router();
router.post("./incident",IncidentController.Post);

router.get("./incident",IncidentController.Get);
router.get("./incident/id",IncidentController.GetOne);
router.patch("./incident/id",IncidentController.Update);
router.delete("./incident/id",IncidentController.Delete);
export default router;