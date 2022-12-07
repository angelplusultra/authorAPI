import { Request, Response } from "express";
import { upload, whitelist } from "../config/multer";
import cloudinary from "../config/cloudinary";
import models from "../models/Author";

const Author = models.Author();
const Image = models.AuthorImg();

const controllers = {
  async postAuthor(req: Request, res: Response) {
    console.log(req.body);

    const { firstName, lastName, born } = req.body;

    try {
      const results = await Author.findOne({ firstName, lastName, born });
      if (!results) {
        const newAuthor = new Author({ firstName, lastName, born });
        if(!req.file){
        const dbSave = await newAuthor.save();
        res.json({
            status: "Success",
            msg: "data stored to API",
          });

        } else{
            const image = await cloudinary.uploader.upload(req.file?.path!, {
                folder: "authors",
              });
              console.log(image);
              const dbSave = await newAuthor.save();
              const newAuthorImg = new Image({
                cloudinaryID: image.public_id,
                url: image.secure_url,
                authorID: dbSave.id,
              });
              const imageSave = await newAuthorImg.save();
              console.log(
                `Result of image upload: ${image} \n Result of author save: ${dbSave}\n Result of new image save ${imageSave}`
              );
      
              res.json({
                status: "Success",
                msg: "Files uploaded succesfully and data stored to API",
              });

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
  },

  async getAuthor(req: Request, res: Response) {
    console.log(req.query);
  },
  async queryAuthor(req: Request, res: Response) {
    console.log(req.query);
    const {fn, ln} = req.query

    if(!fn && !ln){
        console.log('unsupported queries')
    } else{
        const regexfn = new RegExp(fn as string, "i");
        const regexln = new RegExp(ln as string, "i");
        const result = await Author.find({firstName: {$regex: regexfn}, lastName: {$regex: regexln }});
        res.json(result)

    }



    
    
  },
};

export default controllers;
