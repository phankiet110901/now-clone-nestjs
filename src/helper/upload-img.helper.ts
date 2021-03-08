import { BadRequestException } from '@nestjs/common';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

export const UploadImg = {
  fileFilters: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(
        new BadRequestException(
          'Only image files are allowed: jpg|jpeg|png|gif',
        ),
        false,
      );
    }
    cb(null, true);
  },
  handleUpload: (req, file, cb) => {
    const fileName: string = file.originalname.split('.')[0];
    const fileExtName: string = extname(file.originalname);
    file.originName = `${fileName}-${uuid()}${fileExtName}`;
    cb(null, file.originName);
  },
};
