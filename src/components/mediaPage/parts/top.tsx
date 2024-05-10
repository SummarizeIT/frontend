import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import IconButton from "@mui/joy/IconButton";
import Tabs from "@mui/joy/Tabs";

const Top = () => {
  return (
    <Tabs>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <IconButton>
            <ArrowBackRoundedIcon />
          </IconButton>
        </div>
        <div style={{ flexGrow: 1, textAlign: 'center' }}>
          Folder Name
        </div>
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
