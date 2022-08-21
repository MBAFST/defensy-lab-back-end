import {Router} from "express"
import AttachementController from "../controllers/AttachementController";

const router = Router();
router.post("./attachement",AttachementController.Post);

router.get("./attachement",AttachementController.Get);
router.get("./attachement/id",AttachementController.GetOne);
router.patch("./attachement/id",AttachementController.Update);

export default router;