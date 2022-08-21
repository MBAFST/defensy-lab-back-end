import {Router} from "express"
import ActionsController from "../controllers/ActionsController";

const router = Router();
router.post("./action",ActionsController.Post);

router.get("./action",ActionsController.Get);
router.get("./action/id",ActionsController.GetOne);
router.patch("./action/id",ActionsController.Update);

export default router;