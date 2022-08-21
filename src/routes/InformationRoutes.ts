import {Router} from "express"
import InformationController from "../controllers/InformationController";

const router = Router();
router.post("./information",InformationController.Post);

router.get("./information",InformationController.Get);
router.get("./information/id",InformationController.GetOne);
router.patch("./information/id",InformationController.Update);
export default router;