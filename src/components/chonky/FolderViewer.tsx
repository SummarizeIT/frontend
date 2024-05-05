import React, { useEffect, useState } from "react";

import {
  FileBrowser,
  FileList,
  FileNavbar,
  FileToolbar,
  FileContextMenu,
  FileArray,
} from "chonky";
import { ChonkyIconFA } from "chonky-icon-fontawesome";
import { setChonkyDefaults } from "chonky";
// import FolderService from "@/utils/folder/FolderServices";
import { useAuth } from "@/utils/auth/auth-context";
import NotFoundPage from "@/pages/Page404";
import { FolderService } from "@/client/services.gen";

setChonkyDefaults({ iconComponent: ChonkyIconFA });

export const FolderViewer = () => {

  const auth = useAuth();
  const [filesList, setFilesList] = useState<FileArray | []>([]);

  if (!auth) {
    return <NotFoundPage />;
  }

  const { user } = auth;

  const fetchFolderDetails = async (rootFolderId: string) => {
    console.log("Fetching");
    FolderService.getFolderById({ id: rootFolderId }).then(
      (response) => {
        setFilesList(response.list);
      }
    ).catch((error) => console.error('Error fetching folder details:', error
    ))
  };

  useEffect(() => {
    console.log("User: ", user);
    if (user && user.rootFolder) {
      console.log("Fetching folder details...");
      fetchFolderDetails(user.rootFolder);
    }
  }, [user]); // Re-run when user data changes

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
