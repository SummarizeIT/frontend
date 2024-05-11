import Tab from "@mui/joy/Tab";
import TabList from "@mui/joy/TabList";
import TabPanel from "@mui/joy/TabPanel";
import Tabs from "@mui/joy/Tabs";
import MDEditor from "@uiw/react-md-editor";
import React from "react";

interface bodyProps {
  transcription?: string;
  body?: string;
}

const body: React.FC<bodyProps> = ({ transcription , body }) => {
  const tabs = [];
  const tabPanels = [];
  if (transcription) {
    tabs.push(<Tab key="Transcription">Transcription</Tab>);
    tabPanels.push(
      <TabPanel key="Transcription" value={tabs.length - 1}>
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
  }
  if (body) {
    tabs.push(<Tab key="Summarization">Summarization</Tab>);
    tabPanels.push(
      <TabPanel key="Summarization" value={tabs.length - 1}>
        <MDEditor.Markdown
          source={body}
          style={{
            backgroundColor: "transparent",
          }}
        />
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
