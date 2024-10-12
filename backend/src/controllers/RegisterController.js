import express from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import prisma from "../../prisma/client/index.js";
import Logger from "../utils/logger/Logger.js";
const registerController = async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    // jika ada erorr, kembalikan error ke pengguna
    Logger.error("Validation Error");
    return res.status(422).json({
      success: false,
      message: "Validation Error",
      errors: error.array(),
    });
  }

  //   hash password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    // insert data
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      },
    });
    Logger.info("Users Created");
    res.status(201).send({
      success: true,
      message: "Register Successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export { registerController };
