import crypto from "crypto";
import multer from "multer";
import { extname, resolve } from "path";
import { formatText } from "../helpers/functions";

export default {
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", folder),
        filename: (request, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString("hex");
          const extensaoArquivo = extname(file.originalname);
          const nomeArquivo = file.originalname.replace(extensaoArquivo, "");
          const fileName = `${fileHash}-${formatText(
            nomeArquivo
          )}${extensaoArquivo}`;
          return callback(null, fileName);
        },
      }),
    };
  },
};
