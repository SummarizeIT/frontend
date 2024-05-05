import { FileArray } from "chonky";

export interface CreateFolderRequest {
  name: string;
  parentId: string;
}

export interface UpdateFolderRequest {
  name: string;
}

export interface MoveFolderRequest {
  destinationFolderId: string;
}

export interface UpdateFolderPermissionsRequest {
  groups: string[];
  public: boolean;
}

export interface ErrorResponse {
  message: string;
  items?: Record<string, any>;
}

export interface FolderDetailsResponse {
  pathFromRoot: FileArray;
  list: FileArray;
  groups: string[];
}
