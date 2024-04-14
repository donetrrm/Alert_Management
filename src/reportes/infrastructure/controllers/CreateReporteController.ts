import { Request, Response } from "express";
import { CreateReporteUseCase } from "../../application/CreateReporteUseCase";

export class CreateReporteController {
  constructor(readonly createReporteUseCase: CreateReporteUseCase) {}

  async run(req: Request, res: Response) {
    console.log(req.body)
    const { imagen, idKit, camara, movimiento, magnetico, correo } = req.body.reporte;
    try {
      const fecha = new Date();
      const hora = fecha.toLocaleTimeString('es-MX', { hour12: false });
      const kit = await this.createReporteUseCase.run(fecha, hora, idKit, camara, movimiento, magnetico, imagen, correo);
      if (kit) {
        res.status(201).json({
          status: "success",
          data: kit,
        });
      } else {
        res.status(400).json({
          status: "error",
          message: "No se pudo crear el kit.",
        });
      }
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: "Ocurrió un error al procesar la solicitud.",
        error: error.message,
      });
    }
  }
}
