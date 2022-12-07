import { Router } from "express";
import controllers from "../controllers/apicontrollers";

import { upload } from "../config/multer";

const router = Router();

router.post("/authors", upload.single("image"), controllers.postAuthor);
router.get('/authors', controllers.queryAuthor)
router.get('/authors/:id', controllers.getAuthor)

export default router;
