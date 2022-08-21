import {Router} from "express"
import EvaluationController from "../controllers/EvaluationController";

const router = Router();
router.post("./evaluation",EvaluationController.Post);

router.get("./evaluation",EvaluationController.Get);


export default router;