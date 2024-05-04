import axios from "axios";
import {
  CreateFolderRequest,
  ErrorResponse,
  FolderDetailsResponse,
  UpdateFolderRequest,
  MoveFolderRequest,
  UpdateFolderPermissionsRequest,
} from "./FolderTypes";

export class FolderService {
  private static baseUrl: string = 'http://104.248.45.73:8080';
  private constructor() {}

  static async createFolder(data: CreateFolderRequest): Promise<void | ErrorResponse> {
    const url = `${this.baseUrl}/folder`;
    try {
      await axios.post(url, data);
    } catch (error) {
      console.error('Create Folder error:', error);
      return this.handleError(error);
    }
  }

  static async getFolderDetails(id: string): Promise<FolderDetailsResponse | ErrorResponse> {
    const accessToken = localStorage.getItem('accessToken');
    const url = `${this.baseUrl}/folder/${id}`;
    try {
      const response = await axios.get(url,{
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      return response.data;
    } catch (error) {
      console.error('Get Folder Details error:', error);
      return this.handleError(error);
    }
  }

  static async updateFolder(id: string, data: UpdateFolderRequest): Promise<void | ErrorResponse> {
    const url = `${this.baseUrl}/folder/${id}`;
    try {
      await axios.put(url, data);
    } catch (error) {
      console.error('Update Folder error:', error);
      return this.handleError(error);
    }
  }

  static async deleteFolder(id: string): Promise<void | ErrorResponse> {
    const url = `${this.baseUrl}/folder/${id}`;
    try {
      await axios.delete(url);
    } catch (error) {
      console.error('Delete Folder error:', error);
      return this.handleError(error);
    }
  }

  static async moveFolder(id: string, data: MoveFolderRequest): Promise<void | ErrorResponse> {
    const url = `${this.baseUrl}/folder/${id}/move`;
    try {
      await axios.put(url, data);
    } catch (error) {
      console.error('Move Folder error:', error);
      return this.handleError(error);
    }
  }

  static async updatePermissions(id: string, data: UpdateFolderPermissionsRequest): Promise<void | ErrorResponse> {
    const url = `${this.baseUrl}/folder/${id}/permissions`;
    try {
      await axios.put(url, data);
    } catch (error) {
      console.error('Update Permissions error:', error);
      return this.handleError(error);
    }
  }

  private static handleError(error: any): ErrorResponse {
    if (error.response) {
      console.error('HTTP error:', error.response.data);
      return error.response.data;
    } else {
      console.error('Unknown error:', error);
      return { message: "An unknown error occurred" };
    }
  }
}

export default FolderService;
