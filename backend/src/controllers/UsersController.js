import { validationResult } from "express-validator";
import prisma from "../../prisma/client/index.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import Logger from "../utils/logger/Logger.js";

const findUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    res.status(200).json({
      status: true,
      message: "Get All Users Successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Internal server error",
    });
  }
};

const createUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Validation Error",
      errors: errors.array(),
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      status: true,
      message: "Created User is Successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server error",
    });
  }
};

// mencari user berdasarkan ID
const findUserByID = async (req, res) => {
  const { id } = req.params;
  try {
    const userByID = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!userByID) {
      Logger.error("User not found");
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }
    Logger.info("User Found ", { userByID });
    return res.status(200).json({
      status: true,
      message: `GET user BY ID :${id}`,
      data: userByID,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server error",
      error: error,
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: "Validation Error",
      error: errors.array(),
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      },
    });

    res.status(200).json({
      status: true,
      message: "Update user successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Interval server error",
      error,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  console.log(id);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: "Validate Eror",
      error: errors.array(),
    });
  }

  try {
    await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      status: true,
      message: "User has deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export { findUsers, createUser, findUserByID, updateUser, deleteUser };
