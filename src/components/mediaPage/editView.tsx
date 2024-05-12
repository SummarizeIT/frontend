import { EntryService } from "@/client";
import { useUserContext } from "@/utils/user/user-context";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingModal from "../modal/LoadingModal";
import MDEditor from "@uiw/react-md-editor";
import { Box, Button, CssBaseline, CssVarsProvider, Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import { formatDate } from "./parts/top";

const EditView = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [body, setBody] = useState<string | undefined>(undefined);
  const [objectives, setObjective] = useState<string | undefined>(undefined);
  const [recommendations, setRecommendations] = useState<string | undefined>(
    undefined
  );
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [createdOn, setCreatedOn] = useState<string | undefined>(undefined);
  const [transcription, setTranscription] = useState<string | undefined>(
    undefined
  );
  const userContext = useUserContext();

  useEffect(() => {
    const setRoot = async () => {
      const user = await userContext?.getUser();
    };
    setRoot();
  }, []);

  useEffect(() => {
    const fetchMedia = async () => {
      if (!id) return;

      EntryService.getEntryById({ id: id })
        .then((response) => {
          console.log(response);
          setTitle(response.title);
          setCreatedOn(response.createdOn);
          setTranscription(response.transcript);
          const bodyContent =
            response.extensions.find((ext) => ext.identifier === "body")
              ?.content?.text ?? undefined;
          setBody(bodyContent as string);
          const objectiveContent =
            response.extensions.find((ext) => ext.identifier === "objective")
              ?.content?.text ?? undefined;
          setObjective(objectiveContent as string);
          const recommendationsContent =
            response.extensions.find(
              (ext) => ext.identifier === "recommendations"
            )?.content?.text ?? undefined;
          setRecommendations(recommendationsContent as string);
        })
        .catch((error) => {})
        .finally(() => {
          setLoading(false);
        });
    };

    fetchMedia();
  }, [id]);

  const handleSaveButton = async () => {
    setLoading(true);
    if (!id) {
      setLoading(false);
      return;
    }
    // await EntryService.updateEntry({
    //   id: id,
    //   requestBody:
    //   title: title,
    //   transcript: transcription,
    //   extensions: [
    //     { identifier: "body", content: { text: body } },
    //     { identifier: "objective", content: { text: objectives } },
    //     { identifier: "recommendations", content: { text: recommendations } },
    //   ],
    // })
    //   .then(() => {
    //     console.log("Updated");
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  };

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex"    ,  height:"100%" }}>
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
            height:"100%",
          }}
        >
          <div style={{ textAlign: "center" }}>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {formatDate(createdOn!)}
      </div>

      <Tabs aria-label="Sticky tabs" defaultValue={0}>
        <TabList sticky={"top"} variant="soft">
          <Tab>Transcription</Tab>
          <Tab>Body</Tab>
          <Tab>Objective</Tab>
          <Tab>Recommendations</Tab>
        </TabList>

        <TabPanel value={0}>
          <MDEditor
            value={transcription}
            onChange={setTranscription}
            style={{ whiteSpace: "pre-wrap", backgroundColor: "transparent" }}
          />
        </TabPanel>
        <TabPanel value={1}>
          <MDEditor
            value={body}
            onChange={setBody}
            style={{ whiteSpace: "pre-wrap", backgroundColor: "transparent" }}
          />
        </TabPanel>
        <TabPanel value={2}>
          <MDEditor
            value={objectives}
            onChange={setObjective}
            style={{ whiteSpace: "pre-wrap", backgroundColor: "transparent" }}
          />
        </TabPanel>
        <TabPanel value={3}>
          <MDEditor
            value={recommendations}
            onChange={setRecommendations}
            style={{ whiteSpace: "pre-wrap", backgroundColor: "transparent" }}
          />
        </TabPanel>
      </Tabs>
      <div
        style={{
          height: "100%",
        }}
      >
        <Button variant="outlined" color="neutral" onClick={handleSaveButton}>
          Save
        </Button>
      </div>

      <LoadingModal open={loading} onClose={() => setLoading(false)} />
        </Box>
      </Box>
    </CssVarsProvider>
      
  );
};

export default EditView;
