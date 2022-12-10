import {v2} from 'cloudinary'
import { keys } from './keys';


if(process.env.NODE_ENV === 'production'){
  v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key:  process.env.CLOUD_API_KEY ,
    api_secret: process.env.CLOUD_API_SECRET,
    
  });

} else if(process.env.NODE_ENV === 'development'){
  v2.config({
    cloud_name: keys.CLOUD_NAME ,
    api_key:  keys.CLOUD_API_KEY ,
    api_secret: keys.CLOUD_API_SECRET,
  });
}


  export default v2