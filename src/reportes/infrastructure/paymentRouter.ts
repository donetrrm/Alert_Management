import express from "express";

import {
  createPaymentController,
} from "./dependencies";

export const reportesRouter = express.Router();

reportesRouter.post(
  "/",
  createPaymentController.run.bind(createPaymentController)
);
