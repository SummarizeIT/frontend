import { useEffect, useState, useMemo, useCallback } from "react";
import {
  FileBrowser,
  ChonkyActions,
  FileList,
  FileNavbar,
  FileToolbar,
  FileContextMenu,
  FileArray,
  FileHelper,
  ChonkyFileActionData,
  setChonkyDefaults
} from "chonky";
import { ChonkyIconFA } from "chonky-icon-fontawesome";
import { FolderService } from "@/client/services.gen";
import { useUserContext } from "@/utils/user/user-context"; 

// @ts-expect-error
setChonkyDefaults({ iconComponent: ChonkyIconFA });

export const useFileActionHandler = (
  createFolder: (folderName: string) => void,
  deleteFolder: (folderId: string) => void,
  openFolder: (folderId: string) => void,
) => {
  return useCallback(
    (data: ChonkyFileActionData) => {
      if (data.id === ChonkyActions.OpenFiles.id) {
        const { targetFile, files } = data.payload;
        const fileToOpen = targetFile ?? files[0];
        if (fileToOpen && FileHelper.isDirectory(fileToOpen)) {
            openFolder(fileToOpen.id);
            return;
        }
    }
      else if (data.id === ChonkyActions.CreateFolder.id) {
        const folderName = window.prompt(
          "Provide the name for your new folder:"
        );
        if (folderName) {
          createFolder(folderName);
        }
      } else if (
        data.id === ChonkyActions.DeleteFiles.id &&
        data.state.selectedFilesForAction
      ) {
        data.state.selectedFilesForAction.forEach((file) => {
          if (file.isDir) {
            deleteFolder(file.id);
          }
        });
      }
    },
    [createFolder, deleteFolder,openFolder]
  );
};

export const FolderViewer = () => {
  const [filesList, setFilesList] = useState<FileArray | []>([]);
  const [selectedFiles, setSelectedFiles] = useState<FileArray | []>([]);
  const [rootFolderID, setRootFolderID] = useState<string | null>(null);
  const [currentFolderID, setCurrentFolderID] = useState<string | null>(null);
  const [currentPathFromRoot, setCurrentPathFromRoot] = useState<FileArray | []>([]);
  const userContext = useUserContext();

  useEffect(() => {
    console.log("In folder Viewer ",userContext);
    const setRoot = async () => {
      const user = await userContext?.getUser();
      if(user){
        setRootFolderID(user.rootFolder);
        setCurrentFolderID(user.rootFolder);
        fetchFolderDetails(user.rootFolder);
      }
    }
    setRoot();
  }, []) 

/*
  useEffect(() => {
    AccountService.me().then((response) => {
      console.log("Account: ", response.rootFolder);
      setRootFolderID(response.rootFolder);
      setCurrentFolderID(response.rootFolder);
    }).catch((error) => {
      console.error("Error fetching user account:", error);
    });
  }, [rootFolderID]);
  */

  const fetchFolderDetails = useCallback(async (rootFolderID:string) => {
    if (!rootFolderID) return;
    console.log('Fetching details for folder ID:', rootFolderID);
    FolderService.getFolderById({ id: rootFolderID })
      .then((response) => {
        setFilesList(response.list);
        setSelectedFiles(response.pathFromRoot);
        setCurrentPathFromRoot(response.pathFromRoot);
      })
      .catch((error) => console.error("Error fetching folder details:", error));
  }, []);

  const createFolder = useCallback(async (folderName:string) => {
    if (!rootFolderID) {
      console.error("No root folder available.");
      return;
    }
    console.log("Creating folder...");
    FolderService.createFolder({
      requestBody: { name: folderName, parentId: currentFolderID! },
    })
    .then((response) => {
      console.log("Folder created: ", response);
      fetchFolderDetails(currentFolderID!);
    })
    .catch((error) => console.error("Error creating folder:", error));
  }, [rootFolderID, fetchFolderDetails,currentFolderID]);

  const deleteFolder = useCallback(async (folderId:string) => {
    if (!rootFolderID) {
      console.error("No root folder available.");
      return;
    }
    console.log("Deleting folder...");
    FolderService.deleteFolder({ id: folderId })
    .then((response) => {
      console.log("Folder deleted: ", response);
      fetchFolderDetails(currentFolderID!);
    })
    .catch((error) => console.error("Error deleting folder:", error));
  }, [rootFolderID, fetchFolderDetails, currentFolderID]);

  const openFolder = useCallback((folderId:string) => {
    console.log("Opening folder...");
    setCurrentFolderID(folderId);
    fetchFolderDetails(folderId);
  }, [fetchFolderDetails]);


  // const useFolderChain = (currentFolderId: string): FileArray => {
  //   return useMemo(() => {
  //     const currentFolder = currentPathFromRoot[currentFolderId];
  //     const folderChain = [currentFolder];
  
  //     let parentId = currentFolder.parentId;
  //     while (parentId) {
  //       const parentFile = currentPathFromRoot[parentId];
  //       if (parentFile) {
  //         folderChain.unshift(parentFile);
  //         parentId = parentFile.parentId;
  //       } else {
  //         break;
  //       }
  //     }
  //     return folderChain;
  //   }, [currentFolderId]);
  // };

  const handleFileAction = useFileActionHandler(createFolder, deleteFolder, openFolder);

  const fileActions = useMemo(() => [
    ChonkyActions.CreateFolder, 
    ChonkyActions.DeleteFiles, 
    ChonkyActions.OpenFiles, 
    ChonkyActions.OpenParentFolder
  ], []);

  useEffect(() => {
    if (rootFolderID) {
      console.log("Fetching folder details...");
      fetchFolderDetails(rootFolderID);
    }
  }, [rootFolderID, fetchFolderDetails]);

  return (
    // @ts-expect-error
    <FileBrowser
      files={filesList}
      folderChain={selectedFiles}
      fileActions={fileActions}
      onFileAction={handleFileAction}
      darkMode={true}
    >
      <FileNavbar />
      <FileToolbar />
      <FileList />
      <FileContextMenu />
    </FileBrowser>
  );
};
