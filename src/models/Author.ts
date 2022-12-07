import mongoose from "mongoose";

const models = {
  Author() {
    const authorSchema = new mongoose.Schema({
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      born: { type: String, required: true },
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
};


export default models