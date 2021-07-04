import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

interface ITokenPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing!", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(
      token,
      "88faa79357f4c8e308162b2aece7259c"
    ) as ITokenPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(sub);

    if (!user) {
      throw new AppError("User does not exists!", 401);
    }

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
