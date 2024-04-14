import { Reportes } from "./Reportes";

export interface ReportesRepository {
  createReporte(reporte: Reportes): Promise<Reportes | null>;
}

