export interface UserI {
  username: string;
  profile?: string;
  id: number;
}

export interface FileI {
  id?: number;
  name: string;
  size?: string;
  path?: string;
  data_unl?: Buffer;
  data_pdf?: Buffer;
  data_json?: Buffer;
  createdat?: Date;
  updatedat?: Date;
  owner?: string;
}
