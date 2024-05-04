import { useState, useEffect } from "react";
import {
  ChonkyActions,
  FileActionHandler,
  FileArray,
  FileBrowser,
  FileContextMenu,
  FileList,
  FileNavbar,
  FileToolbar,
  setChonkyDefaults,
} from "chonky";
import { ChonkyIconFA } from "chonky-icon-fontawesome";
import { UserData } from "@/utils/auth/AuthTypes";
import FolderService from "@/utils/folder/FolderServices";
import { FolderDetailsResponse,ErrorResponse } from "@/utils/folder/FolderTypes";



setChonkyDefaults({ iconComponent: ChonkyIconFA });

 


export const FolderViewer = () => {
  const [rootFolderId, setRootFolderId] = useState<string|null>(null);
  const [filesList, setFilesList] = useState<FileArray | []>([]);

  const handleFileAction: FileActionHandler = (action) => {
    if (action.id === ChonkyActions.OpenFiles.id) {
      const file = action.state.selectedFilesForAction[0];
      console.log("Opened file ID:", file?.id);
    }
  };
  useEffect(() => {
    const fetchUserData = () => {
      const userDataString = localStorage.getItem("user");
      if (userDataString) {
        const userData: UserData = JSON.parse(userDataString);
        setRootFolderId(userData.rootFolder);
        console.log(rootFolderId);
      } else {
        console.error("No user data found in localStorage");
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchFolderDetails = async () => {
      if (rootFolderId) {
        try{
          const response: FolderDetailsResponse | ErrorResponse = await FolderService.getFolderDetails(rootFolderId);
          console.log('response==================',response);
          if ('list' in response) { // Type guard to ensure response is FolderDetailsResponse
            setFilesList(response.list);}
  
        }catch (error) {
          console.error('get Folder details error:', error);
        }
  
  
      }
    }
    fetchFolderDetails();
  }, [rootFolderId]);

  
  const folderChain = [{ id: "root", name: "Root Folder", isDir: true }];

  return (
    <FileBrowser
      files={filesList}
      folderChain={folderChain}
      
      darkMode={true}
    >
      <FileNavbar />
      <FileToolbar />
      <FileList />
      <FileContextMenu />
    </FileBrowser>
  );
};
