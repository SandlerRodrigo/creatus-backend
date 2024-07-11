import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../types/AuthenticateRequest';

interface UserPayload {
  user: {
    id: string;
    level: number;
  };
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'Nenhum token, autorização negada' });
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT secret is not defined');
    }
    const decoded = jwt.verify(token, secret) as UserPayload;
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log('Erro ao decodificar o token:', err);
    res.status(401).json({ msg: 'Token inválido' });
  }
};

export default authMiddleware;