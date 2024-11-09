import multer from "multer";
import { __dirName } from '../utils.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirName}/public/images/`);
  },
  filename: function (req, file, cb) {
    const date = new Date().toDateString();
    cb(null, date + "-" + file.originalname);
  },
});

export const uploader = multer({ storage: storage });
