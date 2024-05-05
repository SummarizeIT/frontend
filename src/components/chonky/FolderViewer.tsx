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
import FolderService from "@/utils/folder/FolderServices";
import { useAuth } from "@/utils/auth/auth-context";
import NotFoundPage from "@/pages/Page404";

setChonkyDefaults({ iconComponent: ChonkyIconFA });

export const FolderViewer = () => {

  const auth = useAuth();
  const [filesList, setFilesList] = useState<FileArray | []>([]);

  if (!auth) {
    return <NotFoundPage />;
  }

  const { user } = auth;

  const fetchFolderDetails = async (rootFolderId:string) => {
    const accessToken = localStorage.getItem('accessToken'); 
    if (accessToken && rootFolderId) {
      try {
        const response = await FolderService.getFolderDetails(rootFolderId, accessToken);
        if ('list' in response) {
          setFilesList(response.list);
        }
      } catch (error) {
        console.error('Error fetching folder details:', error);
      }
    }
  };

  useEffect(() => {
    if (user && user.rootFolder) {
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
