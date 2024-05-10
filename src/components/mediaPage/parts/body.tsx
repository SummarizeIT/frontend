import React from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel"; // Import TabPanel
import Objective, { ObjectiveProps } from "../extensions/objective";
import Recommendations, {
  RecommendationsProps,
} from "../extensions/recommendations";
import { IconButton } from "@mui/joy";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

interface bodyProps {
  objectiveProps: ObjectiveProps;
  recommendationsProps: RecommendationsProps;
}

const body: React.FC<bodyProps> = ({
  objectiveProps,
  recommendationsProps,
}) => {
  const tabs = [];
  const tabPanels = [];

  if (objectiveProps) {
    tabs.push(<Tab key="Objective">Objective</Tab>);
    tabPanels.push(
      <TabPanel key="ObjectivePanel" value={tabs.length - 1}></TabPanel>
    );
  }

  if (recommendationsProps) {
    tabs.push(<Tab key="Recommendations">Recommendations</Tab>);
    tabPanels.push(
      <TabPanel key="RecommendationsPanel" value={tabs.length - 1}></TabPanel>
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
        <IconButton
          sx={{
            position: "absolute",
            right: "0",
            top: "0",
          }}
        >
          <EditRoundedIcon />
        </IconButton>
      </TabList>

      {tabPanels}
    </Tabs>
  );
};

export default body;
