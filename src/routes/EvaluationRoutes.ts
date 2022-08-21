import {Router} from "express"
import EvaluationController from "../controllers/EvaluationController";

const router = Router();
router.post("./evaluation",EvaluationController.Post);

router.get("./evaluation",EvaluationController.Get);
router.get("./evaluation/id",EvaluationController.GetOne);
router.patch("./evaluation/id",EvaluationController.Update);
export default router;