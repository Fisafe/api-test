import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export default function authMiddlewares(
  req: Request, res: Response, next: NextFunction
) {
  const { authorization } = req.headers;

  if(!authorization) {
    return res.sendStatus(401);
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = verify(token, 'secret');
    const { id } = data as TokenPayload;

    req.userId = id;

    return next();
  } catch {
    return res.sendStatus(401);
  }
}