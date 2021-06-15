export interface RespuestaTopHeadlinesVideo {
  ok: boolean;
  message: string;
  result: Video[];
}

export interface Video {
  id: number;
  titulo: string;
  path: string;
}