import { Reportes } from "../../domain/Reportes";
import { RealTimeSNotification } from "../../infrastructure/servicesRealTimeNotification/RealTimeSendNotification";

export class RealTimeNotificationUseCase {
  constructor(readonly reporteNotifiacion: RealTimeSNotification) {}

  async run(reporte: Reportes) {
    await this.reporteNotifiacion.sendRealTimeNotification(reporte);
  }
}
