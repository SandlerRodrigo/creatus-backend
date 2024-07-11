import { Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../prisma/client';
import generateCSV from '../utils/csvGenerator';
import { AuthenticatedRequest } from '../types/AuthenticateRequest';

const createUser = async (req: AuthenticatedRequest, res: Response) => {
  const { name, email, password, level } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    if (user) {
      return res.status(400).json({ msg: 'Usuário já existe' });
    }

    const salt = await bcrypt.genSalt(10); // Gerando o salt
    const hashedPassword = await bcrypt.hash(password, salt); // Usando o salt para hashear a senha

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        level,
      },
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
};

const getUsers = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
};

const getUserById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id }
    });
    if (!user) return res.status(404).json({ msg: 'Usuário não encontrado' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
};

const updateUser = async (req: AuthenticatedRequest, res: Response) => {
  const { name, email, password, level } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id }
    });
    if (!user) return res.status(404).json({ msg: 'Usuário não encontrado' });

    const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;

    const updatedUser = await prisma.user.update({
      where: { id: req.params.id },
      data: {
        name,
        email,
        password: hashedPassword,
        level,
      },
    });

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
};

const deleteUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await prisma.user.delete({
      where: { id: req.params.id }
    });
    if (!user) return res.status(404).json({ msg: 'Usuário não encontrado' });

    res.send('Usuário removido com sucesso');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
};

const generateReport = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user || req.user.level < 4) {
      return res.status(403).json({ msg: 'Acesso negado' });
    }

    const users = await prisma.user.findMany();
    const csv = generateCSV(users);

    res.header('Content-Type', 'text/csv');
    res.attachment('report.csv');
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
};

export { createUser, getUsers, getUserById, updateUser, deleteUser, generateReport };