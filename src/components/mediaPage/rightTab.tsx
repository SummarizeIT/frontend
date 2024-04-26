import React from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel"; // Import TabPanel
import Objective, { ObjectiveProps } from "./objective";
import Recommendations, { RecommendationsProps } from "./recommendations";
import TestBank, { TestBankProps } from "./testBank";

interface RightTabProps {
  objectiveProps?: ObjectiveProps;
  testBankProps?: TestBankProps;
  recommendationsProps?: RecommendationsProps;
}

const RightTab: React.FC<RightTabProps> = ({
  objectiveProps,
  testBankProps,
  recommendationsProps,
}) => {
  const tabs = [];
  const tabPanels = [];

  if (objectiveProps) {
    tabs.push(<Tab key="Objective" >Objective</Tab>);
    tabPanels.push(
      <TabPanel key="ObjectivePanel" value={tabs.length - 1}>
        <Objective {...objectiveProps} />
      </TabPanel>
    );
  }

  if (testBankProps) {
    tabs.push(<Tab key="TestBank">Test Bank</Tab>);
    tabPanels.push(
      <TabPanel key="TestBankPanel" value={tabs.length - 1}>
        <TestBank {...testBankProps} />
      </TabPanel>
    );
  }

  if (recommendationsProps) {
    tabs.push(<Tab key="Recommendations">Recommendations</Tab>);
    tabPanels.push(
      <TabPanel key="RecommendationsPanel" value={tabs.length - 1}>
        <Recommendations {...recommendationsProps} />
      </TabPanel>
    );
  }

  return (
    <Tabs aria-label="Basic tabs" defaultValue={0} >
      <TabList sx={{
          position: 'sticky',
          top: 0, 
          zIndex: 1100, 
          backgroundColor: 'background.default', 
        }} >{tabs}</TabList>
      {tabPanels}
    </Tabs>
  );
};

export default RightTab;