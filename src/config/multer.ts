import multer, { diskStorage, StorageEngine } from 'multer';


const whitelist = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp'
  ]

const postNewAuthorupload = multer({dest: './src/uploads' , fileFilter(req, file, callback) {
    if(whitelist.includes(file.mimetype) || typeof file === 'undefined'){
        callback(null, true)
    } else{

        return callback(new Error('file is not allowed'))


    }
},})

const singleUpload = multer({dest: './src/uploads' , fileFilter(req, file, callback) {
    if(!whitelist.includes(file.mimetype) || typeof file === 'undefined'){
        return callback(new Error('file is not allowed'))
    } else{
        callback(null, true)



    }
},})

export { singleUpload, postNewAuthorupload, whitelist }