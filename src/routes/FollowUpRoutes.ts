import {Router} from "express"
import FollowUpController from "../controllers/FollowUpController";

const router = Router();
router.post("./follow",FollowUpController.Post);

router.get("./fllow",FollowUpController.Get);
router.get("./follow/id",FollowUpController.GetOne);
router.patch("./follow/id",FollowUpController.Update);
export default router;