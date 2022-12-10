import { Router } from "express";
import { Author } from "../models/Author";

import { singleUpload, postNewAuthorupload } from "../config/multer";

const router = Router();

router.get("/", (req, res): void => {
  res.cookie('Test', 'This is a test cookie', {
    maxAge: 10000
  }).render("index");
  console.log(req.headers.cookie)
});

router.get("/submit", (req, res): void => {
  res.render("submit", {message: req.flash('alert')})
});

router.get("/submitimage", (req, res): void => {
  
  res.render("submitimage", {message: req.flash('alert')});
});

router.get("/authors", async (req, res) => {
  try {
    const result = await Author.find()
      .collation({ locale: "en", strength: 2 })
      .sort({ firstName: 1 });
    res.render("authors", { result });
  } catch (error) {
    console.log(error);
  }
});

router.get('/docs', (req,res) => {
    res.render('docs')
})

export default router;
