import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import IconButton from "@mui/joy/IconButton";
import Tabs from "@mui/joy/Tabs";
import { useNavigate } from "react-router-dom";
interface TopProps {
  title: string | null;
  createdOn: string | null;
}
const Top: React.FC<TopProps> = ({ title,createdOn }) => {
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
        <div style={{ flexGrow: 1, textAlign: "center" }}>{title} {createdOn}</div>
        <div>
          <IconButton>
            <ShareRoundedIcon />
          </IconButton>
        </div>
      </div>
    </Tabs>
  );
};
export default Top;
