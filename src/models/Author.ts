import mongoose, { model } from "mongoose";

const models = {
  Author() {
    const authorSchema = new mongoose.Schema({
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      born: { type: Date, required: true },
    });

    return mongoose.model('author', authorSchema)
  },
  AuthorImg() {
    const authorImageSchema = new mongoose.Schema({
      cloudinaryID: { type: String, required: true },
      url: { type: String, required: true },
      authorID: {type: String, required: true}
    });

    const Image = mongoose.model('authorimage', authorImageSchema)
    return Image
  },

  User(){
    const userSchema = new mongoose.Schema({
      email: {type: String, required: true, unique: true},
      password: {type: String, required: true },
      apiKey: {type: String, unqiue: true}
    })

    return mongoose.model('user', userSchema)

    
  }
};


const Author = models.Author()
const Image = models.AuthorImg()
const User = models.User()

export {Author, Image, User}