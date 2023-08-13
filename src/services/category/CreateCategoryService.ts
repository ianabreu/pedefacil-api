import { BadRequestError } from "../../helpers/api-errors";
import prismaClient from "../../prisma";

interface CategoryRequest {
  name: string;
  status: boolean;
}
class CreateCategoryService {
  async execute({ name, status }: CategoryRequest) {
    if (name === "") {
      throw new BadRequestError("invalid name");
    }

    const category = await prismaClient.category.create({
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
export { CreateCategoryService };
