import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";
import { BadRequestError } from "../../helpers/api-errors";
import { Multer } from "multer";

interface File extends Multer {}
class CreateProductController {
  async handle(req: Request & File, res: Response) {
    const { name, price, description, category_id } = req.body;
    const createProductService = new CreateProductService();
    if (!req.file) {
      throw new BadRequestError("Erro ao fazer upload do arquivo.");
    } else {
      const { filename: banner } = req.file;

      const product = await createProductService.execute({
        name,
        price,
        description,
        banner,
        category_id,
      });
      return res.json(product);
    }
  }
}
export { CreateProductController };
