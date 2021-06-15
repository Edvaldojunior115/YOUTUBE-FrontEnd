


export interface RespuestaTopHeadlines {
  ok: boolean;
  message: string;
  result: Usuarios[];
}

export interface Usuarios {

  id: string
  legajo: string;
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  role: string;
}