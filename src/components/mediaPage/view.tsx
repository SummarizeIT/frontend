import { EntryService } from "@/client";
import Body from "@/components/mediaPage/parts/body";
import Top from "@/components/mediaPage/parts/top.tsx";
import { useUserContext } from "@/utils/user/user-context";
import Box from "@mui/joy/Box";
import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MediaPlayer from "./parts/mediaPlayer";
import RightTab from "./parts/rightTab";
interface MediaPageProps {
  mediaUrl?: string;
  objectiveProps?: string;
  recommendationsProps?: string;
  body?: string;
}

const MediaPage: React.FC<MediaPageProps> = ({}) => {
  const { id } = useParams<{ id: string }>();
  const [url, setUrl] = useState<string | null>(null);
  const [entrytitle, setTitle] = useState<string | null>(null);
  const [createdOn, setCreatedOn] = useState<string | null>(null);
  const [transcriptionvalue, settranscriptionvalue] = useState<string | undefined>(undefined);
  const [body, setBody] = useState<string | undefined>(undefined);
  const [objectives, setObjective] = useState<string | undefined>(undefined);
  const [recommendations, setRecommendations] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  
  const userContext = useUserContext();
  

  useEffect(() => {
    const setRoot = async () => {
      const user = await userContext?.getUser();
    };
    setRoot();
  }, []);

  const getEntryDetails = useCallback(() => {
    if (!id) return;
    EntryService.getEntryById({ id: id })
      .then((response) => {
        setUrl(response.url);
        setTitle(response.title);
        setCreatedOn(response.createdOn);
        settranscriptionvalue(response.transcript);
        const bodyContent = response.extensions.find(ext => ext.identifier === "body")?.content?.text ?? undefined;
        setBody(bodyContent as string);
        const objectiveContent = response.extensions.find(ext => ext.identifier === "objective")?.content?.text ?? undefined;
        setObjective(objectiveContent as string);
        const recommendationsContent = response.extensions.find(ext => ext.identifier === "recommendations")?.content?.text ?? undefined;
        setRecommendations(recommendationsContent as string);
        setLoading(response.processing);
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
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: "calc(12px + var(--Header-height))",
              sm: "calc(12px + var(--Header-height))",
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            gap: 1,
          }}
        >
          <Box
            sx={{
              gridRow: "span 3",
              display: { xs: "2", md: "2" },
            }}
          >
            <Top title={entrytitle} createdOn={createdOn} id={id} />
          </Box>
          {/* player */}
          <Box
            component="main"
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "auto", md: "70% 30%" },
              gridTemplateRows: "auto 1fr auto",
            }}
          >
            <Box
              sx={{
                backgroundColor: "background.surface",
                px: { xs: 2, md: 4 },
                py: 2,
                borderColor: "divider",
                height: "100%",
                width: "100%",
              }}
            >
              <MediaPlayer url={url!} />
            </Box>
            <Box sx={{ gridRow: "span 3", display: { xs: "2", md: "2" } }}>
              <RightTab
                recommendationsProps={recommendations}
                objectiveProps={objectives}
              />
            </Box>
          </Box>
          {/* Bottom */}
          <Box
            sx={{
              gridRow: "span 3",
              display: { xs: "2", md: "2" },
            }}
            height={"40%"}
          >
            <Body transcription={transcriptionvalue} body={body} id={id} loading={loading} />
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
};

export default MediaPage;
