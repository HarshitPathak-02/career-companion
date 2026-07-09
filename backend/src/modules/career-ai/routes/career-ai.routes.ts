import {
    Router,
} from "express";


import {
    protect,
} from "../../../middlewares/auth.middleware.js";


import {
    reviewResume,
} from "../controllers/career-ai.controller.js";



const router =
    Router();



router.post(

    "/resume-review",

    protect,

    reviewResume

);



export default router;