export interface UserI {
  username: string;
  profile?: string;
  id: number;
}

export interface FileI {
  id?: number;
  name?: string;
  alias?: string;
  size?: number;
  path?: string;
  arrayBuffer?: ArrayBuffer | null | string;
  data_unl?: Buffer;
  data_pdf?: Buffer;
  data_json?: Buffer;
  createdat?: Date;
  updatedat?: Date;
  owner?: string;
}
