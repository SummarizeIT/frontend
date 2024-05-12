import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Tabs from "@mui/joy/Tabs";
import React from "react";
import { useNavigate } from "react-router-dom";

import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import { EntryService } from "@/client";

interface TopProps {
  title: string | null;
  createdOn: string | null;
  id?: string;
  toggleEditMode: () => void;
  editMode: boolean;
}

const formatDate = (dateString: string | null): string | null => {
  if (!dateString) return null;
  const date = new Date(dateString);
  // Format the date and time as "DD-MM-YY at HH:MM"
  return `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date
      .getFullYear()
      .toString()
      .slice(-2)} at ${date
        .getHours()
        .toString()
        .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
};

const Top: React.FC<TopProps> = ({ title, createdOn, id, toggleEditMode, editMode }) => {
  const navigate = useNavigate();

  const handleCopyLink = () => {
    if (!id) return;
    const currentUrl = new URL(window.location.href);
    const baseUrlWithPublicView = `${currentUrl.protocol}//${currentUrl.host}/publicview/${id}`;
    navigator.clipboard.writeText(baseUrlWithPublicView);
    EntryService.updateEntry
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
          {title} {formatDate(createdOn)}
        </div>
        <div>
          <IconButton onClick={() => toggleEditMode()} color={editMode ? 'primary' : 'neutral'}>
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
      </div>
    </Tabs>
  );
};

export default Top;
