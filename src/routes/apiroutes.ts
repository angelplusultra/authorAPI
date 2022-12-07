import { Router } from "express";
import controllers from "../controllers/apicontrollers";

import { singleUpload, postNewAuthorupload } from "../config/multer";

const router = Router();

router.post("/authors", postNewAuthorupload.single("image"), controllers.postAuthor);
router.get('/authors', controllers.queryAuthor)
router.get('/authors/:id', controllers.getImages)
router.post('/authors/image', singleUpload.single('image'), controllers.postImage)

export default router;
