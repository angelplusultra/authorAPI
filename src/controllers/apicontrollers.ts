import { Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import {Author, Image} from "../models/Author";
import moment from "moment";


const controllers = {
  async postAuthor(req: Request, res: Response) {
    const { firstName, lastName, born } = req.body;

    if (!moment(born, "YYYY-MM-DD", true).isValid()) {
      res.json({
        status: "Failure",
        msg: "Date of birth not formatted correctly, please format as YYYY-MM-DD ",
      });
    } else {
      try {
        const results = await Author.findOne({ firstName, lastName, born });
        if (!results) {
          const newAuthor = new Author({ firstName, lastName, born });
          if (!req.file) {
            const dbSave = await newAuthor.save();
            res.json({
              status: "Success",
              msg: "data stored to API",
            });
          } else {
            const image = await cloudinary.uploader.upload(req.file?.path!, {
              folder: "authors",
            });
            const dbSave = await newAuthor.save();
            const newAuthorImg = new Image({
              cloudinaryID: image.public_id,
              url: image.secure_url,
              authorID: dbSave.id,
            });
            const imageSave = await newAuthorImg.save();
            req.flash('alert', 'New author added!')
            res.redirect('/submit')
          }
        } else {
          res.json({
            status: "Failure",
            msg: "Sorry, we already have that author in our database, if you would like to add photos of the author, please visit the official docs for the proper rest request",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  },

  async getImages(req: Request, res: Response) {

    const id = req.params.id;

    try {
      const result = await Image.find({ authorID: id });
      if (result.length === 0) {
        res.json({
          status: "Failure",
          msg: "No images were found under that id number",
        });
      } else {
        const newarr = result.map((image) => ({
          url: image.url,
        }));
        res.json(newarr);
      }
    } catch (error) {
      console.log(error);
    }
  },

  async queryAuthor(req: Request, res: Response) {
    const { fn, ln } = req.query;
    const queries = Object.keys(req.query);
    // If no query parameters were used and we get all authors
    if (queries.length === 0) {
      const allAuthors = await Author.find().catch(err => console.log(err))
      res.json(allAuthors)
    } else if (!queries.includes("fn") && !queries.includes("ln")) {
      res
        .status(400)
        .json({ status: "Failure", msg: "Unsupported query parameter used" });
    } else {
      const regexfn = new RegExp(fn as string, "i");
      const regexln = new RegExp(ln as string, "i");
      const result = await Author.find({
        firstName: { $regex: regexfn },
        lastName: { $regex: regexln },
      }).catch(err => console.log(err))
      res.json(result);
    }

  },
  async postImage(req: Request, res: Response) {
    const authorID = req.body.authorID;
    const file = req.file;

    try {
      const result = await Author.findById(authorID).lean();
      if (!result) {
        req.flash('failure', 'Inccorect author ID')
        res.redirect('/submitimage')
      } else {
        const image = await cloudinary.uploader.upload(req.file?.path!, {
          folder: "authors",
        });
        const newImage = new Image({
          authorID,
          url: image.secure_url,
          cloudinaryID: image.public_id,
        });

        const finalresult = await newImage.save();
        req.flash('alert', 'New Image added')
        res.redirect('/submitimage')
      }
    } catch (error) {
      console.log(error);
      req.flash('alert', 'Something went wrong, check ID')
      res.status(400).redirect('/submitimage')
    }
  },
};

export default controllers;
