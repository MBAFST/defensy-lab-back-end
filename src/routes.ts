import { Router } from "express";
import * as Auth from "./controller/auth.controller";
import * as Forgot from "./controller/forgot.controller";
import * as Admin from "./controller/admin.controller";
import * as Document from "./controller/document.controller";

export const routes = (router: Router) => {
    router.post("/api/register", Auth.Register);
    router.post("/api/login", Auth.Login);
    router.get("/api/user", Auth.AuthenticatedUser);
    router.post("/api/refresh", Auth.Refresh);
    router.post("/api/logout", Auth.Logout);
    router.post("/api/forgot", Forgot.ForgotPassword);
    router.post("/api/reset", Forgot.ResetPassword);
    router.get("/api/admin", Admin.GetAll);
    router.get("/api/admin/:id", Admin.Get);
    router.delete("/api/admin/:id", Admin.Delete);
    router.get("/api/incident", Document.GetAll);
    router.get("/api/incident/:id", Document.Get);
    router.post("/api/user/:id/incident/", Document.Create);
}
