import prismaClient from "../../prisma";
import { compare } from "bcryptjs";

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
    if (!user) throw new Error("user/password incorrect");
    // Verificar se a senha está correta
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new Error("user/password incorrect");

    //devolver token com jwt, id, email

    return { ok: true };
  }
}
export { AuthUserService };
