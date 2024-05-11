import { EntryService } from "@/client";
import { useUserContext } from "@/utils/user/user-context";
import { Button, LinearProgress } from "@mui/joy";
import Tab from "@mui/joy/Tab";
import TabList from "@mui/joy/TabList";
import TabPanel from "@mui/joy/TabPanel";
import Tabs from "@mui/joy/Tabs";
import MDEditor from "@uiw/react-md-editor";
import React, { useEffect } from "react";

interface bodyProps {
  transcription?: string;
  body?: string;
  id?: string;
}

const body: React.FC<bodyProps> = ({ body, transcription,id }) => {
  const userContext = useUserContext();
  

  useEffect(() => {
    const setRoot = async () => {
      const user = await userContext?.getUser();
    };
    setRoot();
  }, []);

  const handleGenerateSummarization = () => {
    if (!id) return;
    // Generate Summarization
    EntryService.extensionPayload({id:id, requestBody:{identifier:"body",  command: "generate"}}).then((response) => {
      console.log("handleGenerateSummarization");
    }
    ).catch((error) => {
      console.error(error);
    });


  }


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
  }else{
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
          <LinearProgress variant="outlined" color="neutral"/>
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
          <Button variant="outlined" color="neutral" onClick={handleGenerateSummarization} id="generatesummarization">
            Generate Summarization
          </Button>
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
