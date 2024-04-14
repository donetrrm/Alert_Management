import { Reportes } from "../../domain/Reportes";
import { SendEmailNotification } from "../../domain/services/SendEmailNotification";
import nodemailer from 'nodemailer';

export class SendEmail implements SendEmailNotification {
  async sendEmailNotification(reporte: Reportes, correo: string): Promise<boolean> {
    try {
      const transporter = nodemailer.createTransport({
        service: process.env.NODE_SERVICE,
        host: process.env.NODE_HOST,
        port: parseInt(process.env.NODE_PORT || '465'),
        auth: {
          user: process.env.NODE_USER,
          pass: process.env.NODE_PASS
        }
      });

      const mailOptions = {
        from: 'pruebas.donet@gmail.com',
        to: correo,
        subject: 'Reporte de actividad',
        html: `
          <h1>Reporte de Actividad</h1>
          <p>Fecha: ${reporte.fecha}</p>
          <p>Hora: ${reporte.hora}</p>
          <p>ID del Kit: ${reporte.idKit}</p>
          <p>Movimiento: ${reporte.movimiento ? 'Sí' : 'No'}</p>
          <p>Magnético: ${reporte.magnetico ? 'Sí' : 'No'}</p>
          <img src="${reporte.imagen}" alt="Imagen del reporte">
        `
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Correo electrónico enviado:", info.response);
      return true;
    } catch (error) {
      console.error("Error al enviar el correo electrónico:", error);
      return false;

    }
  }
}
