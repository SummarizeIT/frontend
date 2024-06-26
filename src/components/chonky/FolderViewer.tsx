import { Extension, UploadEntryRequest } from "@/client";
import { EntryService, FolderService } from "@/client/services.gen";
import { useUserContext } from "@/utils/user/user-context";
import {
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
} from "@mui/joy";
import { useColorScheme } from "@mui/joy/styles";
import {
  ChonkyActions,
  ChonkyFileActionData,
  FileArray,
  FileBrowser,
  FileContextMenu,
  FileHelper,
  FileList,
  FileNavbar,
  FileToolbar,
  setChonkyDefaults,
} from "chonky";
import { ChonkyIconFA } from "chonky-icon-fontawesome";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { RecordAudio, RenameFolder, customActions } from "./ChonkyCustomActions";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../modal/LoadingModal";
import { AudioRecorder,useAudioRecorder  } from "react-audio-voice-recorder";
import InfoModal from "../modal/InfoModal";

// @ts-expect-error
setChonkyDefaults({ iconComponent: ChonkyIconFA });

export const useFileActionHandler = (
  createFolder: (folderName: string) => void,
  deleteFolder: (folderId: string) => void,
  openFolder: (folderId: string) => void,
  renameFolder: (folderId: string, name: string) => void,
  moveFolder: (destinationId: string, sourceId: string) => void,
  openFile: (fileId: string) => void,
  fileChain: FileArray,
  renameFile: (id: string, name: string) => void,
  moveFile: (id: string, destinationId: string) => void,
  uploadFile: () => void,
  deleteFile: (id: string) => void,
  recordAudio: () => void
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
      } else if (data.id === ChonkyActions.OpenParentFolder.id) {
        if (!fileChain) return;
        const parentFolder = fileChain[fileChain.length - 2];
        if (parentFolder) openFolder(parentFolder.id);
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
          } else {
            deleteFile(file.id);
          }
        });
      } else if (data.id === RenameFolder.id) {
        const fileToOpen = data.state.selectedFilesForAction[0];
        if (fileToOpen && !fileToOpen.isDir) {
          const fileName = window.prompt("Provide the new name for the file:");
          if (fileName) {
            renameFile(data.state.selectedFilesForAction[0].id, fileName);
            return;
          }
        }
        const folderName = window.prompt(
          "Provide the new name for the folder:"
        );
        if (folderName) {
          renameFolder(data.state.selectedFilesForAction[0].id, folderName);
        }
      } else if (data.id === ChonkyActions.MoveFiles.id) {
        const sourceFiles = data.state.selectedFilesForAction;
        const destination = data.payload.destination;
        if (destination && !destination.isDir) return;
        if (sourceFiles && destination) {
          sourceFiles.forEach((file) => {
            if (file.isDir) moveFolder(file.id, destination.id);
            else moveFile(file.id, destination.id);
          });
        }
      } else if (data.id === ChonkyActions.UploadFiles.id) {
        uploadFile();
      }
      else if (data.id === RecordAudio.id) {
        recordAudio();
      }
    },
    [
      createFolder,
      deleteFolder,
      openFolder,
      renameFolder,
      moveFolder,
      openFile,
      fileChain,
      renameFile,
      moveFile,
      uploadFile,
      deleteFile,
      recordAudio
    ]
  );
};

export const FolderViewer = () => {
  const [filesList, setFilesList] = useState<FileArray | []>([]);
  const [fileChain, setFileChain] = useState<FileArray | null>(null);
  const [rootFolderID, setRootFolderID] = useState<string | null>(null);
  const [currentFolderID, setCurrentFolderID] = useState<string | null>(null);
  const userContext = useUserContext();
  const { mode } = useColorScheme();
  const [darkMode, setDarkMode] = useState<boolean>(mode === "dark");
  const [open, setOpen] = useState<boolean>(false);
  const [recording, setRecording] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [infoMessage, setInfoMessage] = React.useState<string|null>(null);
  const [infoTitle, setInfoTitle] = React.useState<string|null>(null);
  const [openInfo, setOpenInfo] = React.useState<boolean>(false);
  const recorderControls = useAudioRecorder();
  // const [flagRecording, setFlagRecoding] = useState<boolean>(false);
  const flagRecordingRef = useRef<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === "dark") setDarkMode(true);
    else setDarkMode(false);
    const setRoot = async () => {
      const user = await userContext?.getUser();
      if (user) {
        setRootFolderID(user.rootFolder);
        setCurrentFolderID(user.rootFolder);
        fetchFolderDetails(user.rootFolder);
      }
    };
    setRoot();
  }, [mode]);

  const uploadFile = useCallback(async () => {
    setOpen(true);
  }, []);

  const recordAudio = useCallback(async () => {
    console.log("Recording audio Opened")
    setRecording(true);
  }, []);

  const handleFileSelection = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) {
        console.error("No file selected");
        return;
      }

      const formData = {
        mediaFile: file,
      };

      const uploadRequest: UploadEntryRequest = {
        title: file.name,
        parentFolderId: currentFolderID!,
      };

      const data = {
        uploadRequest: uploadRequest,
        formData: formData,
      };
      setLoading(true);
      try {
        await EntryService.uploadEntry(data);
        setOpen(false);
        fetchFolderDetails(currentFolderID!);
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setLoading(false);
      }
    },
    [currentFolderID]
  );

  const fetchFolderDetails = useCallback(async (rootFolderID: string) => {
    if (!rootFolderID) return;
    FolderService.getFolderById({ id: rootFolderID })
      .then((response) => {
        setFilesList(response.list);
        setFileChain(response.pathFromRoot);
      })
      .catch((error) => console.error("Error fetching folder details:", error));
  }, []);

  const createFolder = useCallback(
    async (folderName: string) => {
      if (!rootFolderID) {
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
      navigate(`/View/${fileId}`);
    },
    [rootFolderID, fetchFolderDetails, currentFolderID]
  );

  const renameFolder = useCallback(
    async (folderId: string, name: string) => {
      FolderService.updateFolder({ id: folderId, requestBody: { name: name } })
        .then((response) => {
          fetchFolderDetails(currentFolderID!);
        })
        .catch((error) => console.error("Error renaming folder:", error));
    },
    [rootFolderID, fetchFolderDetails, currentFolderID]
  );

  const renameFile = useCallback(
    async (fileId: string, name: string) => {
      EntryService.getEntryById({ id: fileId }).then((response) => {
        const title: string = name;
        const extensions: Array<Extension> = response.extensions;
        const isPublic: boolean = response.isPublic;
        EntryService.updateEntry({
          id: fileId,
          requestBody: { title, extensions, isPublic },
        }).then((response) => {
          fetchFolderDetails(currentFolderID!);
        });
      });
      fetchFolderDetails(currentFolderID!);
    },
    [rootFolderID, fetchFolderDetails, currentFolderID]
  );

  const moveFolder = useCallback(
    async (sourceId: string, destinationId: string) => {
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

  const deleteFile = useCallback(
    async (fileId: string) => {
      EntryService.deleteEntry({ id: fileId })
        .then((response) => {
          fetchFolderDetails(currentFolderID!);
        })
        .catch((error) => console.error("Error deleting file:", error));
    },
    [rootFolderID, fetchFolderDetails, currentFolderID]
  );

  const moveFiles = useCallback(
    async (sourceId: string, destinationId: string) => {
      EntryService.moveEntry({
        requestBody: { destinationFolderId: destinationId },
        id: sourceId,
      })
        .then((response) => {
          fetchFolderDetails(currentFolderID!);
        })
        .catch((error) => console.error("Error moving file:", error));
    },
    [rootFolderID, fetchFolderDetails, currentFolderID]
  );

  const uploadRecording = useCallback(
    async (blob: Blob) => {
      if (flagRecordingRef.current === false) return;
      flagRecordingRef.current = false;
      const audio = new Blob([blob], { type: "audio/mpeg" });
      const title=window.prompt("Enter the title of the recording");
      if (!title){
        setOpenInfo(true);
        setInfoMessage("Title not provided. Recording not uploaded.");
        setInfoTitle("Error");
        return;
      } 
      const formData = {
        mediaFile: audio,
      };

      const uploadRequest: UploadEntryRequest = {
        title: title,
        parentFolderId: currentFolderID!,
      };

      const data = {
        uploadRequest: uploadRequest,
        formData: formData,
      };
      setLoading(true);
      try {
        await EntryService.uploadEntry(data);
        setRecording(false);
        flagRecordingRef.current = false;
        fetchFolderDetails(currentFolderID!);
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setLoading(false);
        flagRecordingRef.current = false;
        window.location.reload();
      }
    },
    [currentFolderID]
  );

  const handleFileAction = useFileActionHandler(
    createFolder,
    deleteFolder,
    openFolder,
    renameFolder,
    moveFolder,
    openFile,
    fileChain!,
    renameFile,
    moveFiles,
    uploadFile,
    deleteFile,
    recordAudio,
  );

  useEffect(() => {
    if (rootFolderID) {
      fetchFolderDetails(rootFolderID);
    }
  }, [rootFolderID, fetchFolderDetails]);
  
  const addAudioElement = (blob: Blob) => {
    flagRecordingRef.current = true;
    uploadRecording(blob);
    // setRecording(false);
  };

  const handleStopRecording = () => {
    setRecording(false);
    recorderControls.stopRecording();
    window.location.reload();
    flagRecordingRef.current = false;
  };
  
  return (
    <>
      {/*@ts-expect-error */}
      <FileBrowser
        files={filesList}
        folderChain={fileChain}
        fileActions={customActions}
        onFileAction={handleFileAction}
        darkMode={darkMode}
      >
        <FileNavbar />
        <FileToolbar />
        <FileList />
        <FileContextMenu />
      </FileBrowser>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <ModalClose />
          <DialogTitle>Upload MP3 or MP4</DialogTitle>
          <DialogContent>
            <input
              type="file"
              onChange={handleFileSelection}
              accept="video/mp4,audio/mp3"
            />
          </DialogContent>
        </ModalDialog>
      </Modal>

      <Modal open={recording} onClose={handleStopRecording}>
        <ModalDialog>
          <ModalClose/>
          <DialogTitle>Record Audio</DialogTitle>
          <DialogContent>
            <AudioRecorder
              onRecordingComplete={addAudioElement}
              audioTrackConstraints={{
                noiseSuppression: true,
                echoCancellation: true,
              }}
              recorderControls={recorderControls}
              onNotAllowedOrFound={(err) => console.table(err)}
              mediaRecorderOptions={{
                audioBitsPerSecond: 128000,
              }}
              showVisualizer={true}
            />
          </DialogContent>
        </ModalDialog>
      </Modal>
      <LoadingModal open={loading} onClose={() => setLoading(false)} />
      <InfoModal open={openInfo} infoMessage={infoMessage!} infoTitle={infoTitle!} onClose={()=>setOpenInfo(false)}/>

    </>
  );
};
