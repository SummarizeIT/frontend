import { Button } from "@mui/joy";
import Tab from "@mui/joy/Tab";
import TabList from "@mui/joy/TabList";
import TabPanel from "@mui/joy/TabPanel";
import Tabs from "@mui/joy/Tabs";
import React from "react";
import MDEditor from "@uiw/react-md-editor";

interface RightTabProps {
  objectiveProps?: string;
  recommendationsProps?: string;
}

const RightTab: React.FC<RightTabProps> = ({
  objectiveProps,
  recommendationsProps,
}) => {
  const tabs = [];
  const tabPanels = [];

  const handleGenerateObjective = () => {
    alert("Generate Objective");
  };
  const handleGenerateRecommendations = () => {
    alert("Generate Recommendations");
  }

  if (objectiveProps) {
    tabs.push(<Tab key="Objective">Objective</Tab>);
    tabPanels.push(
      <TabPanel key="ObjectivePanel" value={tabs.length - 1}>
        <MDEditor.Markdown
          source={objectiveProps}
          style={{
            backgroundColor: "transparent",
          }}
        />
      </TabPanel>
    );
  } else {
    tabs.push(<Tab key="Objective">Objective</Tab>);
    tabPanels.push(
      <TabPanel key="Objective" value={tabs.length - 1}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Button
            variant="outlined"
            color="neutral"
            onClick={handleGenerateObjective}
          >
            Generate Objective
          </Button>
        </div>
      </TabPanel>
    );
  }

  if (recommendationsProps) {
    tabs.push(<Tab key="Recommendations">Recommendations</Tab>);
    tabPanels.push(
      <TabPanel key="RecommendationsPanel" value={tabs.length - 1}>
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
      <TabPanel key="Recommendations" value={tabs.length - 1}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Button
            variant="outlined"
            color="neutral"
            onClick={handleGenerateRecommendations}
          >
            Generate Recommendations
          </Button>
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
