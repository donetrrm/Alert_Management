import { query } from "../../database/mysql";
import { Reportes } from "../domain/Reportes";
import { ReportesRepository } from "../domain/ReportesRepository";

export class MysqlReportesRepository implements ReportesRepository {

  async createReporte(report: Reportes): Promise<Reportes | null> {
    let reporte = null;
    const sql =
      "INSERT INTO reportes (fecha, hora, idKit, camara, movimiento, magnetico, imagen) VALUES (?,?,?,?,?,?,?)";
    const params: any[] = [report.fecha, report.hora, report.idKit, report.camara, report.movimiento, report.magnetico, report.imagen];
    try {
      const [result]: any = await query(sql, params);
      reporte = new Reportes
      (
        result.insertId,
        report.fecha,
        report.hora,
        report.idKit,
        report.camara,
        report.movimiento,
        report.magnetico,
        report.imagen,
      );
    } catch (error) {
      reporte = null;
    } finally {
      return reporte;
    }
  }
}
