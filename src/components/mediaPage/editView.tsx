import { EntryService } from "@/client";
import { useUserContext } from "@/utils/user/user-context";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingModal from "../modal/LoadingModal";
import MDEditor from "@uiw/react-md-editor";
import { Tab, TabList, TabPanel, Tabs } from "@mui/joy";

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

  return (
    <>
      <Tabs
        aria-label="Sticky tabs"
        defaultValue={0}
      >
        <TabList sticky={"top"} variant="soft">
          <Tab>Transcription</Tab>
          <Tab>Body</Tab>
          <Tab>Objective</Tab>
          <Tab>Recommendations</Tab>
        </TabList>

        <TabPanel value={0}>
        {/* <MDEditor
        value={transcription}
        onChange={setTranscription}
        style={{  whiteSpace: "pre-wrap",
        direction: "rtl",
        backgroundColor: "transparent",}}
      /> */}
          <MDEditor.Markdown
            source={transcription}
            style={{
              whiteSpace: "pre-wrap",
              direction: "rtl",
              backgroundColor: "transparent",
            }}
          />
        </TabPanel>
        <TabPanel value={1}>
            <MDEditor
        value={body}
        onChange={setBody}
        style={{  whiteSpace: "pre-wrap",
        backgroundColor: "transparent",}}
      />
          {/* <MDEditor.Markdown
            source={body}
            style={{
              whiteSpace: "pre-wrap",
              backgroundColor: "transparent",
            }}
          /> */}
        </TabPanel>
        <TabPanel value={2}>
          <MDEditor.Markdown
            source={objectives}
            style={{
              whiteSpace: "pre-wrap",
              direction: "rtl",
              backgroundColor: "transparent",
            }}
          />
        </TabPanel>
        <TabPanel value={3}>
        <MDEditor
        value={recommendations}
        onChange={setRecommendations}
      />
          <MDEditor.Markdown
            source={recommendations}
            style={{
              whiteSpace: "pre-wrap",
              direction: "rtl",
              backgroundColor: "transparent",
            }}
          />
        </TabPanel>
      </Tabs>
      <LoadingModal open={loading} onClose={() => setLoading(false)} />
    </>
  );
};

export default EditView;
