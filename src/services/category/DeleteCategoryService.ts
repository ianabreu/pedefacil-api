import prismaClient from "../../prisma";
import { ConflictError } from "../../helpers/api-errors";

interface CategoryRequest {
  id: string;
}
class DeleteCategoryService {
  async execute({ id }: CategoryRequest) {
    const hasProduct = await prismaClient.product.findFirst({
      where: {
        category_id: id,
      },
    });
    if (hasProduct) {
      throw new ConflictError(
        "Não é possível excluir a categoria, há produtos vinculados."
      );
    }

    const category = await prismaClient.category.delete({
      where: {
        id: id,
      },
    });
    return category;
  }
}
export { DeleteCategoryService };
