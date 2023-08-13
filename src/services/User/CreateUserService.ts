import { BadRequestError, ConflictError } from "../../helpers/api-errors";
import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
import { passwordIsValid } from "../../helpers/functions";

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    const isValidEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

    //Verificar se enviou o email válido
    if (!isValidEmail.test(email))
      throw new BadRequestError("email/password invalid");

    //Verificar se o email já está cadastrado
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    if (userAlreadyExists) throw new ConflictError("user already exists");

    //Validar senha
    if (!password) {
      throw new BadRequestError("email/password invalid");
    }
    const { isValid, message } = passwordIsValid(password);
    if (!isValid) {
      throw new BadRequestError(message);
    }

    // Cadastrar user
    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  }
}
export { CreateUserService };
