import {Router} from "express"
import ResumeController from "../controllers/ResumeController";

const router = Router();
router.post("./resume",ResumeController.Post);

router.get("./resume",ResumeController.Get);
router.get("./resume/id",ResumeController.GetOne);
router.patch("./resume/id",ResumeController.Update);
export default router;