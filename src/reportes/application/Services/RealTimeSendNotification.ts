import { Reportes } from "../../domain/Reportes";
import { RealTimeSNotification } from "../../infrastructure/servicesRealTimeNotification/RealTimeSendNotification";

export class RealTimeNotificationUseCase {
  constructor(readonly reporteNotifiacion: RealTimeSNotification) {}

  async run(reporte: any, correo: string) {
    await this.reporteNotifiacion.sendRealTimeNotification(reporte, correo);
  }
}
