import type { RequestHandler } from "express";
import * as authService from "./auth.service";

type ValidatedCredentials = {
  body: {
    email: string;
    password: string;
  };
};

export const register: RequestHandler = (req, res) => {
  const { body } = req.validated as ValidatedCredentials;
  res.status(201).json(authService.register(body));
};

export const login: RequestHandler = (req, res) => {
  const { body } = req.validated as ValidatedCredentials;
  res.json(authService.login(body));
};
