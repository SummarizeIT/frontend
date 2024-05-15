import { Button, LinearProgress } from "@mui/joy";
import Tab from "@mui/joy/Tab";
import TabList from "@mui/joy/TabList";
import TabPanel from "@mui/joy/TabPanel";
import Tabs from "@mui/joy/Tabs";
import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { EntryService } from "@/client";

interface RightTabProps {
  objectiveProps?: string;
  recommendationsProps?: string;
  id?: string;
  loading: boolean;
}

const RightTab: React.FC<RightTabProps> = ({
  objectiveProps,
  recommendationsProps,
  id,
  loading
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const tabs = [];
  const tabPanels = [];

  const handleGenerateObjective = () => {
    if (loading) {
      alert("You can't generate objectives until transcription ends.");
      return;
    }
    if (!id) return;
    setIsGenerating(true);
    EntryService.extensionPayload({
      id: id,
      requestBody: { identifier: "objectives", command: "generate" },
    })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        setIsGenerating(false);
      });
  };
  const handleGenerateRecommendations = () => {
    if (loading) {
      alert("You can't generate recommendations until transcription ends.");
      return;
    }
    if (!id) return;
    setIsGenerating(true);
    EntryService.extensionPayload({
      id: id,
      requestBody: { identifier: "recommendations", command: "generate" },
    })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        setIsGenerating(false);
      });
  };

  if (objectiveProps) {
    tabs.push(<Tab key="objectives">objectives</Tab>);
    tabPanels.push(
      <TabPanel key="Objectives" value={0}>
        <MDEditor.Markdown
          source={objectiveProps}
          style={{
            backgroundColor: "transparent",
          }}
        />
      </TabPanel>
    );
  } else {
    tabs.push(<Tab key="Objectives">Objectives</Tab>);
    tabPanels.push(
      <TabPanel key="Objectives" value={0}>
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
              onClick={handleGenerateObjective}
            >
              Generate Objectives
            </Button>
          )}
        </div>
      </TabPanel>
    );
  }

  if (recommendationsProps) {
    tabs.push(<Tab key="recommendations">recommendations</Tab>);
    tabPanels.push(
      <TabPanel key="Recommendations" value={1}>
        <MDEditor.Markdown
          source={recommendationsProps}
          style={{
            backgroundColor: "transparent",
          }}
        />
      </TabPanel>
    );
  } else {
    tabs.push(<Tab key="Recommendations">Recommendations</Tab>);
    tabPanels.push(
      <TabPanel key="Recommendations" value={1}>
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
              onClick={handleGenerateRecommendations}
            >
              Generate Recommendations
            </Button>
          )}
        </div>
      </TabPanel>
    );
  }


  return (
    <Tabs aria-label="Basic tabs" defaultValue={0} sx={{ height: "100%" }}>
      <TabList
        sx={{
          width: "100%",
        }}
      >
        {tabs}
      </TabList>
      {tabPanels}
    </Tabs>
  );
};

export default RightTab;
