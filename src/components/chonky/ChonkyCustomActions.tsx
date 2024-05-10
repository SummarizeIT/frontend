import { defineFileAction, ChonkyIconName,ChonkyActions,FileData } from "chonky";

export const RenameFolder = defineFileAction({
  id: "rename-folder",
//   fileFilter: (file: FileData | null): boolean => {
//     if (file && typeof file.isDir !== 'undefined') {
//         return file.isDir;
//     }
//     return false; 
// },
  button: {
    name: "Rename",
    contextMenu: true,
  },
});


export const customActions = [
  ChonkyActions.CreateFolder,
  ChonkyActions.DeleteFiles,
  ChonkyActions.OpenParentFolder,
  ChonkyActions.OpenFiles,
  ChonkyActions.UploadFiles,
  ChonkyActions.MoveFiles,
  RenameFolder,
];
