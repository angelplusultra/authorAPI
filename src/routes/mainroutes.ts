import { Router } from "express";
import { Author } from "../models/Author";
import bcrypt from "bcrypt";
import validator from "validator";

import { singleUpload, postNewAuthorupload } from "../config/multer";
import { User } from "../models/Author";
import passport from "passport";

const router = Router();

router.get("/", (req, res): void => {
  res
    .cookie("Test", "This is a test cookie", {
      maxAge: 10000,
    })
    .render("index", {loggedIn: req.user ? true : false});
  console.log(req.headers.cookie);
});

router.get("/register", (req, res) => {
  
  res.render("register", {loggedIn: req.user ? true : false});
});

router.post("/register", (req, res) => {
  const { email, password, confPassword } = req.body;
  if (!validator.isEmail(email)) {
    res.status(400).redirect("/register");
  } else {
    if (password !== confPassword) {
      res.send('passwords do not match')
    } else {
      User.findOne({ email }).then((user) => {
        if (user) {
          res.send('email already regsitered')
        } else {
          bcrypt.genSalt().then((salt) => {
            bcrypt.hash(password, salt).then((hash) => {
              User.create({ email, password: hash }).then((newUser) => {
                newUser.apiKey = newUser.id;
                newUser
                  .save()
                  .then((user) =>{
                    console.log(user)
                    res.send(`Thank you for registering, your API key is ${user.apiKey}, please store in a safe please, it will be needed to use the API`)})
                  .catch((err) => console.log(err));
              });
            });
          });
        }
      });
    }
  }
});

router.get('/login', (req, res) => {
  res.status(200).render('login', {loggedIn: req.user ? true : false})

})
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).redirect('/api/authors')

})
// router.post("/login", (req, res) => {
//   const { email, password, confPassword } = req.body;
//   if (!validator.isEmail(email)) {
//     res.status(400).redirect("/register");
//   } else {
//     if (password !== confPassword) {
//       res.send('passwords do not match')
//     } else {
//       User.findOne({ email }).then((user) => {
//         if (user) {
//           res.send('email already regsitered')
//         } else {
//           bcrypt.genSalt().then((salt) => {
//             bcrypt.hash(password, salt).then((hash) => {
//               User.create({ email, password: hash }).then((newUser) => {
//                 newUser.apiKey = newUser.id;
//                 newUser
//                   .save()
//                   .then((user) =>{
//                     console.log(user)
//                     res.send("sucesfully registered")})
//                   .catch((err) => console.log(err));
//               });
//             });
//           });
//         }
//       });
//     }
//   }
// });

router.get("/docs", (req, res) => {
  res.render("docs", {loggedIn: req.user ? true : false});
});

export default router;
