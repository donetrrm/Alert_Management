import { Reportes } from "../../domain/Reportes";
import { SendEmail } from "../../infrastructure/servicesGmail/SendEmail";

export class SendEmailNotifaction {
  constructor(readonly reporteEmailNotifiacion: SendEmail) {}

  async run(reporte: Reportes, correo: string) {
    await this.reporteEmailNotifiacion.sendEmailNotification(reporte, correo);
  }
}
