import {
    Router,
} from "express";


import {
    protect,
} from "../middlewares/auth.middleware.js";


import {
    asyncHandler,
} from "../utils/asyncHandler.js";


import {
    CoverLetterController,
} from "../controllers/coverLetter.controller.js";



const router = Router();



router.use(

    protect

);




router.post(

    "/generate",

    asyncHandler(

        CoverLetterController.generate

    )

);




router.get(

    "/reports",

    asyncHandler(

        CoverLetterController.getReports

    )

);




router.get(

    "/reports/:id",

    asyncHandler(

        CoverLetterController.getById

    )

);




router.delete(

    "/reports/:id",

    asyncHandler(

        CoverLetterController.delete

    )

);



export default router;