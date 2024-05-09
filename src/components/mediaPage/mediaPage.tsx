import { EntryService } from "@/client";
import { useUserContext } from "@/utils/user/user-context";
import Box from "@mui/joy/Box";
import CssBaseline from "@mui/joy/CssBaseline";
import Stack from "@mui/joy/Stack";
import { CssVarsProvider } from "@mui/joy/styles";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../dashboard/Header";
import Sidebar from "../dashboard/Sidebar";
import MediaPlayer from "./mediaPlayer";
import { ObjectiveProps } from "./objective";
import { RecommendationsProps } from "./recommendations";
import RightTab from "./rightTab";
import { TestBankProps } from "./testBank";

interface MediaPageProps {
  mediaUrl?: string;
  objectiveProps?: ObjectiveProps;
  testBankProps?: TestBankProps;
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

  const questions = [
    "What is the capital of France?",
    "Who wrote 'To Kill a Mockingbird'?",
    "What is the chemical symbol for gold?",
  ];

  const answers = [
    ["Paris", "Lyon", "Marseille", "Bordeaux"],
    ["Harper Lee", "Ernest Hemingway", "J.K. Rowling", "Mark Twain"],
    ["Au", "Ag", "Fe", "Cu"],
  ];

  const correctAnswers = ["Paris", "Harper Lee", "Au"];
  const testBankProps: TestBankProps = {
    questionList: questions,
    answerList: answers,
    correctAnswers: correctAnswers,
  };
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
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
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
            component="main"
            sx={{
              height: "calc(100vh - 55px)",
              display: "grid",
              gridTemplateColumns: { xs: "auto", md: "60% 40%" },
              gridTemplateRows: "auto 1fr auto",
            }}
          >
            <Box
              sx={{
                backgroundColor: "background.surface",
                px: { xs: 2, md: 4 },
                py: 2,
                borderBottom: "1px solid",
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
            <Box sx={{ gridRow: "span 3", display: { xs: "2", md: "6" } }}>
              <RightTab
                recommendationsProps={recommendationsProps}
                objectiveProps={objectiveProps}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
};

export default MediaPage;
