import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UnauthorizedError } from "../../helpers/api-errors";

interface AuthRequest {
  email: string;
  password: string;
}
class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    // Verificar se usuario não está cadastrado
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) throw new UnauthorizedError("user/password incorrect");
    // Verificar se a senha está correta
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new UnauthorizedError("user/password incorrect");

    //Se deu tudo certo vamor gerar o token pro usuário.
    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "30d",
      }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    };
  }
}
export { AuthUserService };
