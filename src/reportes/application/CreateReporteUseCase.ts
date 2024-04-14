import { Reportes } from "../domain/Reportes";
import { ReportesRepository } from "../domain/ReportesRepository";
import { SendEmailNotifaction } from "./Services/SendEmailNotifaction";
import { RealTimeNotificationUseCase } from "./Services/RealTimeSendNotification"
import { UploadImagesService } from "./Services/UploadImagesService";

export class CreateReporteUseCase {
  constructor(
    readonly reportesRepository: ReportesRepository,
    readonly sendNotification: SendEmailNotifaction,
    readonly sendRealTimeNotification: RealTimeNotificationUseCase,
    readonly uploadImageService: UploadImagesService
  ) {}

  async run(
     fecha: Date,
     hora: string,
     idKit: number,
     camara: boolean,
     movimiento: boolean,
     magnetico: boolean,
     imagen: string,
     correo: string
  ): Promise<Reportes | null> {
    const imagenURL = await this.uploadImageService.uploadIamge(imagen)
    const reporte = new Reportes(0, fecha, hora, idKit, camara, movimiento, magnetico, imagenURL);
    try {
      const report = await this.reportesRepository.createReporte(reporte);
      if (report)
        this.sendNotification.run(report, correo);
        this.sendRealTimeNotification.run(report, correo)
      return report;
    } catch (error) {
      return null;


    }
  }
}
