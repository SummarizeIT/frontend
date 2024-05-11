import React from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import IconButton from "@mui/joy/IconButton";
import Tabs from "@mui/joy/Tabs";
import { useNavigate } from "react-router-dom";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

interface TopProps {
  title: string | null;
  createdOn: string | null;
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

const Top: React.FC<TopProps> = ({ title, createdOn }) => {
  const navigate = useNavigate();

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
          <IconButton>
            <EditRoundedIcon />
          </IconButton>
          <IconButton>
            <ShareRoundedIcon />
          </IconButton>
        </div>
      </div>
    </Tabs>
  );
};

export default Top;
