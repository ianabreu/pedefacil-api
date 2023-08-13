import { BadRequestError } from "../../helpers/api-errors";
import prismaClient from "../../prisma";

interface CategoryRequest {
  id: string;
  name: string;
  status: boolean;
}
class UpdateCategoryService {
  async execute({ id, name, status }: CategoryRequest) {
    if (name.length < 2) {
      throw new BadRequestError(
        "Invalid name. Minimum length is 2 characters."
      );
    }

    const category = await prismaClient.category.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        status: status,
      },
      select: {
        id: true,
        name: true,
        status: true,
      },
    });

    return category;
  }
}
export { UpdateCategoryService };
