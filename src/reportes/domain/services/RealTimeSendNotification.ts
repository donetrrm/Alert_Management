import { Reportes } from "../Reportes";

export interface RealTimeSendNotification {
    sendRealTimeNotification(reporte: any, correo: string): Promise<boolean>;
}
