import passport from "passport";
import * as PassportLocal from "passport-local";
import { User } from "../models/Author";
import bcrypt from "bcrypt";
import mongoose from "mongoose";



export const LocalStrat = () => {
    
  passport.use(
    new PassportLocal.Strategy(
      { usernameField: "email" },
      (email, password, done) => {
        console.log(email);
        User.findOne({ email }).then((user) => {
          if (user) {
            bcrypt.compare(password, user.password).then((isMatch) => {
              if (isMatch) {
                console.log("Authenticated");
                done(null, user);
              } else {
                console.log("Invalid Credentials");
                done(null, null);
              }
            }).catch(err => console.log(err));
          } else {
            done(new Error("User not found"), null);
          }
        });
      }
    )
  );
};


passport.serializeUser((user: any, done) => done(null, user.id))
passport.deserializeUser((id: any, done) => {
    User.findById(id)
    .then(user => user ? done(null, user) : new Error('User not found'))
    .catch(err => done(err, null))
})
