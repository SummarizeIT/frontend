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
  setChonkyDefaults,
} from "chonky";
import { ChonkyIconFA } from "chonky-icon-fontawesome";
import { EntryService, FolderService } from "@/client/services.gen";
import { useUserContext } from "@/utils/user/user-context";
import { RenameFolder, customActions } from "./ChonkyCustomActions";
import { useNavigate } from "react-router-dom";
import { EntryResponse } from "@/client";

// @ts-expect-error
setChonkyDefaults({ iconComponent: ChonkyIconFA });

export const useFileActionHandler = (
  createFolder: (folderName: string) => void,
  deleteFolder: (folderId: string) => void,
  openFolder: (folderId: string) => void,
  renameFolder: (folderId: string, name: string) => void,
  moveFiles: (destinationId: string, sourceId: string) => void,
  openFile: (fileId: string) => void
) => {
  return useCallback(
    (data: ChonkyFileActionData) => {
      if (data.id === ChonkyActions.OpenFiles.id) {
        const { targetFile, files } = data.payload;
        const fileToOpen = targetFile ?? files[0];
        if (fileToOpen && FileHelper.isDirectory(fileToOpen)) {
          openFolder(fileToOpen.id);
          return;
        } else {
          openFile(fileToOpen.id);
        }
      } else if (data.id === ChonkyActions.CreateFolder.id) {
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
      } else if (data.id === RenameFolder.id) {
        const folderName = window.prompt(
          "Provide the new name for the folder:"
        );
        if (folderName) {
          renameFolder(data.state.selectedFilesForAction[0].id, folderName);
        }
      } else if (data.id === ChonkyActions.MoveFiles.id) {
        const sourceFiles = data.state.selectedFilesForAction;
        const destination = data.payload.destination;
        console.log("Source Files: ", sourceFiles);
        console.log("Destination: ", destination);
        if (sourceFiles && destination) {
          sourceFiles.forEach((file) => {
            moveFiles(file.id, destination.id);
          });
        }
      }
    },
    [createFolder, deleteFolder, openFolder, renameFolder, moveFiles, openFile]
  );
};

export const FolderViewer = () => {
  const [filesList, setFilesList] = useState<FileArray | []>([]);
  const [selectedFiles, setSelectedFiles] = useState<FileArray | []>([]);
  const [rootFolderID, setRootFolderID] = useState<string | null>(null);
  const [currentFolderID, setCurrentFolderID] = useState<string | null>(null);
  const userContext = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("In folder Viewer ", userContext);
    const setRoot = async () => {
      const user = await userContext?.getUser();
      if (user) {
        setRootFolderID(user.rootFolder);
        setCurrentFolderID(user.rootFolder);
        fetchFolderDetails(user.rootFolder);
      }
    };
    setRoot();
  }, []);

  const fetchFolderDetails = useCallback(async (rootFolderID: string) => {
    if (!rootFolderID) return;
    console.log("Fetching details for folder ID:", rootFolderID);
    FolderService.getFolderById({ id: rootFolderID })
      .then((response) => {
        setFilesList(response.list);
        setSelectedFiles(response.pathFromRoot);
      })
      .catch((error) => console.error("Error fetching folder details:", error));
  }, []);

  const createFolder = useCallback(
    async (folderName: string) => {
      if (!rootFolderID) {
        console.error("No root folder available.");
        return;
      }
      FolderService.createFolder({
        requestBody: { name: folderName, parentId: currentFolderID! },
      })
        .then((response) => {
          fetchFolderDetails(currentFolderID!);
        })
        .catch((error) => console.error("Error creating folder:", error));
    },
    [rootFolderID, fetchFolderDetails, currentFolderID]
  );

  const deleteFolder = useCallback(
    async (folderId: string) => {
      if (!rootFolderID) {
        return;
      }
      FolderService.deleteFolder({ id: folderId })
        .then((response) => {
          fetchFolderDetails(currentFolderID!);
        })
        .catch((error) => console.error("Error deleting folder:", error));
    },
    [rootFolderID, fetchFolderDetails, currentFolderID]
  );

  const openFolder = useCallback(
    (folderId: string) => {
      setCurrentFolderID(folderId);
      fetchFolderDetails(folderId);
    },
    [fetchFolderDetails]
  );

  const openFile = useCallback(
    (fileId: string) => {
      window.open(`/View/${fileId}`, '_blank');
    },
    [rootFolderID, fetchFolderDetails, currentFolderID]
  );

  const renameFolder = useCallback(
    async (folderId: string, name: string) => {
      FolderService.updateFolder({ id: folderId, requestBody: { name: name } })
        .then((response) => {
          console.log("Renamed folder:", response);
          console.log("Current Folder ID:", currentFolderID);
          fetchFolderDetails(currentFolderID!);
        })
        .catch((error) => console.error("Error renaming folder:", error));
    },
    [rootFolderID, fetchFolderDetails, currentFolderID]
  );

  const moveFiles = useCallback(
    async (sourceId: string, destinationId: string) => {
      console.log("Moving files...");
      console.log("Destination ID:", destinationId);
      console.log("Source ID:", sourceId);
      FolderService.moveFolder({
        requestBody: { destinationFolderId: destinationId },
        id: sourceId,
      })
        .then((response) => {
          fetchFolderDetails(currentFolderID!);
        })
        .catch((error) => console.error("Error moving folder:", error));
    },
    [rootFolderID, fetchFolderDetails, currentFolderID]
  );

  const handleFileAction = useFileActionHandler(
    createFolder,
    deleteFolder,
    openFolder,
    renameFolder,
    moveFiles,
    openFile
  );

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
      fileActions={customActions}
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
