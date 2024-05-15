import { EntryService } from "@/client";
import { useUserContext } from "@/utils/user/user-context";
import { Button, LinearProgress } from "@mui/joy";
import Tab from "@mui/joy/Tab";
import TabList from "@mui/joy/TabList";
import TabPanel from "@mui/joy/TabPanel";
import Tabs from "@mui/joy/Tabs";
import MDEditor from "@uiw/react-md-editor";
import React, { useEffect, useState } from "react";

interface bodyProps {
  transcription?: string;
  body?: string;
  id?: string;
  loading: boolean;
}

const body: React.FC<bodyProps> = ({ body, transcription, id, loading }) => {
  const userContext = useUserContext();
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const setRoot = async () => {
      const user = await userContext?.getUser();
    };
    setRoot();
  }, []);

  const handleGenerateSummarization = () => {
    if (loading) {
      alert("You can't generate summary until transcription ends.");
      return;
    }
    if (!id) return;
    setIsGenerating(true);
    EntryService.extensionPayload({
      id: id,
      requestBody: { identifier: "body", command: "generate" },
    })
      .then(() => {
        console.log("Summarization generated");})
      .catch((error) => {
        console.error(error);
        setIsGenerating(false);
      });
  };

  const tabs = [];
  const tabPanels = [];

  if (transcription) {
    tabs.push(<Tab key="Transcription">Transcription</Tab>);
    tabPanels.push(
      <TabPanel key="Transcription" value={0}>
        <MDEditor.Markdown
          source={transcription}
          style={{
            whiteSpace: "pre-wrap",
            direction: "rtl",
            backgroundColor: "transparent",
          }}
        />
      </TabPanel>
    );
  } else {
    tabs.push(<Tab key="Transcription">Transcription</Tab>);
    tabPanels.push(
      <TabPanel key="Transcription" value={0}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <LinearProgress variant="outlined" color="neutral" />
        </div>
      </TabPanel>
    );
  }
  if (body) {
    tabs.push(<Tab key="Summarization">Summarization</Tab>);
    tabPanels.push(
      <TabPanel key="Summarization" value={1}>
        <MDEditor.Markdown
          source={body}
          style={{
            backgroundColor: "transparent",
          }}
        />
      </TabPanel>
    );
  } else {
    tabs.push(<Tab key="Summarization">Summarization</Tab>);
    tabPanels.push(
      <TabPanel key="Summarization" value={1}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          {isGenerating ? (
            <LinearProgress variant="outlined" color="neutral" />
          ) : (
            <Button
              variant="outlined"
              color="neutral"
              onClick={handleGenerateSummarization}
            >
              Generate Summarization
            </Button>
          )}
        </div>
      </TabPanel>
    );
  }

  return (
    <Tabs
      aria-label="Sticky tabs"
      defaultValue={0}
      sx={{
        p: 1,
        height: 270,
        overflowY: "auto",
        width: "100%",
      }}
    >
      <TabList sticky={"top"} variant="soft">
        {tabs}
      </TabList>
      {tabPanels}
    </Tabs>
  );
};

export default body;