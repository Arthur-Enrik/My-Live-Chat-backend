// Services
import { User } from "../../Model/user.model.js";
import { Response } from "../../Utils/services-response.utils.js";

// Interfaces
import { IUser } from "../../Interface/IUser.interface.js";
import { Response as IResponse } from "../../Interface/IResponse.interface.js";

// Dependencies
import { hash, compare, genSalt } from "bcrypt";
import { v4 } from "uuid";
import { genToken } from "../../Utils/gen-token.utils.js";

class UserServices {
  static register = async (
    username: string,
    email: string,
    password: string
  ): Promise<IResponse> => {
    try {
      const userExist = await User.findOne({ email: email }).lean();
      if (userExist) {
        return Response.error(
          "Esté e-mail já está em uso!, Tente recuperar a senha",
          "CONFLICT"
        );
      }

      const salt: string = await genSalt(10);
      const passwordHash: string = await hash(password, salt);

      const _id: string = v4();
      await User.create({ _id, username, email, password: passwordHash });

      return Response.success("Usuário cadastrado com sucesso!");
    } catch (error) {
      console.error(error);
      return Response.error(
        "Ocorreu um erro no servidor. Tente novamente mais tarde",
        "SERVER_ERR"
      );
    }
  };

  static authorize = async (
    email: string,
    password: string
  ): Promise<IResponse> => {
    try {
      const user = (await User.findOne({ email: email })
        .select("+password")
        .lean()) as IUser;

      if (!user) {
        return Response.error("Usuário não encontrado", "NOT_FOUND");
      }

      if (!(await compare(password, user.password))) {
        return Response.error("Senha incorreta", "AUTH_ERR");
      }
      const token = genToken(user._id, user.email);
      return Response.success("Usuário autenticado", {
        token: token,
        user: { username: user.username, _id: user._id },
      });
    } catch (error) {
      console.error(error);
      return Response.error(
        "Ocorreu um erro no servidor. Tente novamente mais tarde",
        "SERVER_ERR"
      );
    }
  };

  static delete = async (_id: string): Promise<IResponse> => {
    try {
      const userDeleted = await User.findByIdAndDelete(_id);
      if (!userDeleted) {
        return Response.error("Usuário não encontrado", "NOT_FOUND");
      }
      return Response.success("Usuário deletado!");
    } catch (error) {
      return Response.error(
        "Ocorreu um erro no servidor. Tente novamente mais tarde",
        "SERVER_ERR"
      );
    }
  };

  static findByEmail = async (email: string): Promise<IResponse> => {
    try {
      const users = await User.find({ email: { $regex: email, $options: "i" } })
        .select("-_id -__v")
        .lean();

      return Response.success("Usuários encontrado", { users });
    } catch (error) {
      console.error(error);
      return Response.error(
        "Ocorreu um erro no servidor. Tente novamente mais tarde",
        "SERVER_ERR"
      );
    }
  };
  static findById = async (_id: string): Promise<IResponse> => {
    try {
      const user = await User.findById(_id).select("-password").lean();

      if (!user) return Response.error("Usuário não encontrado", "NOT_FOUND");

      return Response.success("Usuário encontrado", { user });
    } catch (error) {
      console.error(error);
      return Response.error(
        "Ocorreu um erro no servidor. Tente novamente mais tarde",
        "SERVER_ERR"
      );
    }
  };
}

export { UserServices };
