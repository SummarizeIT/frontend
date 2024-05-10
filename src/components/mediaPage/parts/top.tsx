import { EntryService } from "@/client";
import { useUserContext } from "@/utils/user/user-context";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import IconButton from "@mui/joy/IconButton";
import Tabs from "@mui/joy/Tabs";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Top = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const userContext = useUserContext();
  const [details, setDetails] = useState<null | string>(null);

  useEffect(() => {
    console.log("In folder Viewer ", userContext);
    const setRoot = async () => {
      const user = await userContext?.getUser();
    };
    setRoot();
  }, []);
  
  const getEntryDetails = useCallback(() => {
    if (!id) return;
    EntryService.getEntryById({ id: id })
      .then((response) => {
        setDetails(response.title);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);
  useEffect(() => {
    if (id) {
      getEntryDetails();
    }
  }, [getEntryDetails, id]);


  return (
    <Tabs>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <IconButton
          onClick={() => { 
            navigate(-1);
           }}
          >
            <ArrowBackRoundedIcon />
          </IconButton>
        </div>
        <div style={{ flexGrow: 1, textAlign: 'center' }}>
           {details}
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
