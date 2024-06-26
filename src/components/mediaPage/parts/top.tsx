
import { EntryResponse, EntryService } from "@/client";
import InfoModal from "@/components/modal/InfoModal";
import { useUserContext } from "@/utils/user/user-context";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Tabs from "@mui/joy/Tabs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


interface TopProps {
  response?:EntryResponse;
  id:string | undefined;
}

export const formatDate = (dateString: string | null): string | null => {
  if (!dateString) return null;
  const date = new Date(dateString);
  // Format the date and time as "DD-MM-YY at HH:MM"
  return "Created on " + `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date
    .getFullYear()
    .toString()
    .slice(-2)} at ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
};


const Top: React.FC<TopProps> = ({response, id}) => {
  const navigate = useNavigate();
  const userContext = useUserContext();
  const [titleMessage, setTitleMessage] = useState<string|null>(null);
  const [infoMessage, setInfoMessage] = useState<string|null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleEdit = () => {
    if (!id){
      setTitleMessage("Error");
      setInfoMessage("No ID found");
      return;
    }
    navigate(`/edit/${id}`);
  };


  useEffect(() => {
    const setRoot = async () => {
      const user = await userContext?.getUser();
    };
    setRoot();
  }, []);

  const handleCopyLink = () => {
    if (!id) return;
    const currentUrl = new URL(window.location.href);
    const baseUrlWithPublicView = `${currentUrl.protocol}//${currentUrl.host}/publicview/${id}`;
    navigator.clipboard.writeText(baseUrlWithPublicView);
    if (response) {
      EntryService.updateEntry({ id: id, requestBody:{isPublic:true,extensions:response.extensions, title:response.title}})
    }
  };
  
  return (
    <Tabs>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          <IconButton
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowBackRoundedIcon />
          </IconButton>
        </div>
        <div style={{ flexGrow: 1, textAlign: "center" }}>
          {response?.title} {formatDate(response?.createdOn || null)}
        </div>
        <div>
          <IconButton onClick={handleEdit}>
            <EditRoundedIcon />
          </IconButton>
          <Dropdown>
            <MenuButton
              sx={{
                border: 'none' 
              }}
            >
              <ShareRoundedIcon />
            </MenuButton>
            <Menu
              placement="bottom-end"
              size="sm"
              sx={{
                zIndex: "99999",
                p: 1,
                gap: 1,
                "--ListItem-radius": "var(--joy-radius-sm)",
              }}
            >
            
              <MenuItem
              onClick={handleCopyLink}
              >
                Copy Link
                <ContentCopyRoundedIcon />
              </MenuItem>
            </Menu>
          </Dropdown>
        </div>
        <InfoModal infoTitle={titleMessage!} infoMessage={infoMessage!} open={open} onClose={()=>setOpen(false)} />
      </div>
    </Tabs>
  );
};

export default Top;
