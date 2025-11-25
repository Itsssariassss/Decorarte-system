import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
  const data = await prisma.user.findMany();
  res.json(data);
};

export const getUser = async (req, res) => {
  const data = await prisma.user.findUnique({
    where: { id: Number(req.params.id) }
  });
  res.json(data);
};

export const updateUser = async (req, res) => {
  const data = await prisma.user.update({
    where: { id: Number(req.params.id) },
    data: req.body
  });
  res.json(data);
};

export const deleteUser = async (req, res) => {
  await prisma.user.delete({
    where: { id: Number(req.params.id) }
  });
  res.json({ message: "User deleted" });
};
