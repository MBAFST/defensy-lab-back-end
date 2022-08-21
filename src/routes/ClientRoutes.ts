import {Router} from "express"
import ClientController from "../controllers/ClientController";

const router = Router();
router.post("./client",ClientController.Post);

router.get("./client",ClientController.Get);
router.get("./client/id",ClientController.GetOne);
router.patch("./client/id",ClientController.Update);
router.delete("./client/id",ClientController.Delete);
export default router;