import {v2} from 'cloudinary'
import { keys } from './keys';

v2.config({
    cloud_name: keys.CLOUD_NAME,
    api_key: keys.CLOUD_API_KEY,
    api_secret: keys.CLOUD_API_SECRET
  });

  export default v2