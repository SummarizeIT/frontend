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

const recommendedReadings = [
    "React Official Documentation",
    "Thinking in React",
    "React Patterns"
  ];

  const readingURLs = [
    "https://reactjs.org/docs/getting-started.html",
    "https://reactjs.org/docs/thinking-in-react.html",
    "https://reactpatterns.com/"
  ];

  const questions = [
  "What is the capital of France?",
  "Who wrote 'To Kill a Mockingbird'?",
  "What is the chemical symbol for gold?"
];

const answers = [
  ["Paris", "Lyon", "Marseille", "Bordeaux"],
  ["Harper Lee", "Ernest Hemingway", "J.K. Rowling", "Mark Twain"],
  ["Au", "Ag", "Fe", "Cu"]
];

const correctAnswers = [
  "Paris",
  "Harper Lee",
  "Au"
];
  const testBankProps: TestBankProps = {questionList: questions, answerList: answers, correctAnswers: correctAnswers};
  const recommendationsProps: RecommendationsProps = {recommendationsList: recommendedReadings, recommendationsURL: readingURLs};

  const objectiveProps: ObjectiveProps = {objectiveList: ["Objective 1", "Objective 2", "Objective 3"]};

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
    <Tabs aria-label="Basic tabs" defaultValue={0} sx={{ height: '100%' ,border:'1px bold black'}}>
      <TabList sx={{
        width: "100%",
        }} >{tabs}</TabList>
      {tabPanels}
    </Tabs>
    
  );
};

export default RightTab;