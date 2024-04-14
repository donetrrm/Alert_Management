import { CreateReporteUseCase } from "../application/CreateReporteUseCase";
import { SendEmailNotifaction } from "../application/Services/SendEmailNotifaction";
import { RealTimeNotificationUseCase } from '../application/Services/RealTimeSendNotification'

import { CreateReporteController } from "./controllers/CreateReporteController";
import { UploadImagenS } from "./helpers/UploadImagenS";

import { MysqlReportesRepository } from "./MysqlReportesRepository";

import { SendEmail } from "./servicesGmail/SendEmail";
import { RealTimeSNotification } from "./servicesRealTimeNotification/RealTimeSendNotification"

export const mysqlReportesRepository = new MysqlReportesRepository();
export const reportesNotification = new SendEmail();
export const realTimeNotification = new RealTimeSNotification();
export const uploadImagen = new UploadImagenS();
export const reportesNotificationUseCase = new SendEmailNotifaction(
  reportesNotification
);
export const realTimeNotificationUseCase = new RealTimeNotificationUseCase(
  realTimeNotification
)
export const createReporteUseCase = new CreateReporteUseCase(
  mysqlReportesRepository,
  reportesNotificationUseCase,
  realTimeNotificationUseCase,
  uploadImagen
);

export const createPaymentController = new CreateReporteController(
  createReporteUseCase
);
