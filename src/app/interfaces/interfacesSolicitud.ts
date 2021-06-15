
export interface RespuestaTopHeadlinesSolicitud {
  ok: boolean;
  message: string;
  result: Solicitud[];
}

export interface Solicitud {
  nombre: string;
  id: number;
  url: string;
  titulo: string;
  minutos: string;
  idusuario: number;
  path: string;
  descargado: number;
}