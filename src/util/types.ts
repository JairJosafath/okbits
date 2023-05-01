export interface UserI {
  username: string;
  profile?: string;
  id: number;
}

export interface FileI {
  id?: number;
  name?: string;
  size?: number;
  path?: string;
  arrayBuffer?: ArrayBuffer | null | string;
  data_unl?: Blob;
  data_pdf?: Buffer;
  data_json?: Buffer;
  createdat?: Date;
  updatedat?: Date;
  owner?: string;
}
