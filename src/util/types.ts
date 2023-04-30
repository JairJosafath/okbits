export interface UserI {
  username: string;
  profile?: string;
  id: number;
}

export interface FileI {
  id?: number;
  name?: string;
  size?: string;
  path?: string;
  data_unl?: File;
  data_pdf?: File;
  data_json?: File;
  createdat?: Date;
  updatedat?: Date;
  owner?: string;
}
