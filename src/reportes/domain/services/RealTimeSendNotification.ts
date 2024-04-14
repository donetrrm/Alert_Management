import { Reportes } from "../Reportes";

export interface RealTimeSendNotification {
    sendRealTimeNotification(reporte: Reportes): Promise<boolean>;
}
