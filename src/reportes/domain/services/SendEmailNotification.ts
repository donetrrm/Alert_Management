import { Reportes } from "../Reportes";

export interface SendEmailNotification {
    sendEmailNotification(reporte: Reportes, correo: string): Promise<boolean>;
}
