import { Response, Router } from "express";
import controllers from "../controllers/apicontrollers";
import { Author, User } from "../models/Author";
import { singleUpload, postNewAuthorupload } from "../config/multer";
import { isAuth } from "../middleware/auth";

const router = Router();

router.use(isAuth)


router.get("/authors", async (req, res) => {
    try {
      const result = await Author.find()
        .collation({ locale: "en", strength: 2 })
        .sort({ firstName: 1 });
      res.render("authors", { result, loggedIn: true });
    } catch (error) {
      console.log(error);
    }
  });


router.post("/authors", postNewAuthorupload.single("image"), controllers.postAuthor);
router.get('/authors', controllers.queryAuthor)
router.get('/authors/:id', controllers.getImages)
router.post('/authors/image', singleUpload.single('image'), controllers.postImage)


  
  router.get("/submit", (req, res): void => {
    res.render("submit", { message: req.flash("alert"), loggedIn: true });
  });
  
  router.get("/submitimage", (req, res): void => {
    res.render("submitimage", { message: req.flash("alert"), loggedIn: true  });
  });
  
  router.get('/myapikey', (req, res): void => {
    const {apiKey} = req.user as any
    // console.log(req.user)

    res.render('myapikey', {loggedIn: true, apiKey })
  })
  
  router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if(err){
            return next(err)
        } else{
            res.redirect('/')
        }
    })
  })
 
export default router;
