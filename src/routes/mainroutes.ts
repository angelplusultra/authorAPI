import { Router } from "express";
import {Author} from '../models/Author'

import { singleUpload, postNewAuthorupload } from "../config/multer";

const router = Router();


router.get("/", (req, res): void => {
  res.render("index");
});
router.get("/submit", (req, res): void => {
  res.render("submit");
});
router.get("/submitimage", (req, res): void => {
  res.render("submitimage");
});

router.get("/authors",  async (req, res) => {
    try {
        const result = await Author.find().collation({locale:'en',strength: 2}).sort({firstName:1})
        console.log(result)
        res.render('authors', {result})
    } catch (error) {
        console.log(error)
        
    }
    

});

export default router;
