import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client';

const generateToken = async (payload: object): Promise<string> => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT secret não foi definido');
  }
  return jwt.sign(payload, secret, { expiresIn: '1h' });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    if (!user) {
      return res.status(400).json({ msg: 'Usuário não encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Senha incorreta' });
    }

    const payload = {
      user: {
        id: user.id,
        level: user.level,
      },
    };

    try {
      const token = await generateToken(payload);
      res.json({ token });
    } catch (err) {
      console.error('Erro ao gerar o token JWT:', err);
      res.status(500).send('Erro no servidor');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
};

export { login };