import { EntryService } from "@/client";
import { useUserContext } from "@/utils/user/user-context";
import Box from "@mui/joy/Box";
import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MediaPlayer from "./parts/mediaPlayer";
import { ObjectiveProps } from "./extensions/objective";
import { RecommendationsProps } from "./extensions/recommendations";
import RightTab from "./parts/rightTab";
import Body from "@/components/mediaPage/parts/body";
import Top from "@/components/mediaPage/parts/top.tsx";
interface MediaPageProps {
  mediaUrl?: string;
  objectiveProps?: ObjectiveProps;
  recommendationsProps?: RecommendationsProps;
  transcription?: string;
  description?: string;
}

const MediaPage: React.FC<MediaPageProps> = ({}) => {
  const { id } = useParams<{ id: string }>();
  const [url, setUrl] = useState<string | null>(null);
  const userContext = useUserContext();

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
        console.log(response);
        setUrl(response.url);
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

  const recommendedReadings = [
    "React Official Documentation",
    "Thinking in React",
    "React Patterns",
  ];

  const readingURLs = [
    "https://reactjs.org/docs/getting-started.html",
    "https://reactjs.org/docs/thinking-in-react.html",
    "https://reactpatterns.com/",
  ];

  const recommendationsProps: RecommendationsProps = {
    recommendationsList: recommendedReadings,
    recommendationsURL: readingURLs,
  };

  const objectiveProps: ObjectiveProps = {
    objectiveList: ["Objective 1", "Objective 2", "Objective 3"],
  };

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
            <Top />
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
                recommendationsProps={recommendationsProps}
                objectiveProps={objectiveProps}
              />
            </Box>
          </Box>
          {/* Bottom */}
          <Box
            sx={{
              gridRow: "span 3",
              display: { xs: "2", md: "2" },
              minHeight: "25%",
            }}
          >
            <Body
              recommendationsProps={recommendationsProps}
              objectiveProps={objectiveProps}
            />
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
};

export default MediaPage;
