import multer, { diskStorage, StorageEngine } from 'multer';


const whitelist = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp'
  ]

const upload = multer({dest: './src/uploads' , fileFilter(req, file, callback) {
    if(whitelist.includes(file.mimetype) || typeof file === 'undefined'){
        callback(null, true)
    } else{
        
        return callback(new Error('file is not allowed'))
        
        
    }
},})

export { upload, whitelist }