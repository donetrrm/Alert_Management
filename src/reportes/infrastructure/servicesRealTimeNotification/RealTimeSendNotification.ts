import { Socket } from "socket.io-client";
import io from "socket.io-client";

import { Reportes } from "../../domain/Reportes";
import { RealTimeSendNotification } from "../../domain/services/RealTimeSendNotification";

export class RealTimeSNotification implements RealTimeSendNotification {
  private url: any;

  constructor() {
    this.url = process.env.SOCKET_URL;
  }

  async sendRealTimeNotification(reporte: Reportes, correo: string): Promise<boolean> {
    const socket: Socket = io(this.url);
    let conn = false;
    socket.on("connect", () => {
        conn = true;
        console.log("Conectado al servidor WebSocket");
        socket.emit("apiNewReporte", { 
          id: reporte.id,
          fecha: reporte.fecha,
          hora: reporte.hora,
          imagen: reporte.imagen,
          idKit: reporte.idKit,
          camara: reporte.camara,
          movimiento: reporte.movimiento,
          magnetico: reporte.magnetico,
          correo: correo
        });
      });
      
      socket.on("disconnect", () => {
        console.log("Desconectado del servidor WebSocket");
      });
      
      socket.on("error", (error: Error) => {
        console.error("Error en la conexión WebSocket:", error.message);
      });
    return conn;
  }
}
