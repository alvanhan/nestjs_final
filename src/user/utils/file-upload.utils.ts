import { HttpException, HttpStatus } from "@nestjs/common";
import { extname } from "path";

export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return callback(new HttpException('Only image files are allowed! :jpg,jpeg,png.', HttpStatus.NOT_ACCEPTABLE), false);
    }
    callback(null, true);
  };
  
  export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(10)
      .fill(null)
      .map(() => Math.round(Math.random() * 20).toString(20))
      .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
  };