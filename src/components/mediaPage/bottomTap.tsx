// import Tab from "@mui/joy/Tab";
// import TabList from "@mui/joy/TabList";
// import TabPanel from "@mui/joy/TabPanel";
// import Tabs from "@mui/joy/Tabs";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export interface BottomTapProps {
  transcription: string;
  description: string;
}
const BottomTap: React.FC<BottomTapProps> = ({
  transcription,
  description,
}) => {
  const [value, setValue] = React.useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Transcription" value="1" />
            <Tab label="Description/Summary" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">{transcription}</TabPanel>
        <TabPanel value="2">{description}</TabPanel>
      </TabContext>
    </Box>
  );
  //   return (
  //     <Tabs aria-label="Basic tabs" defaultValue={0}>
  //       <TabList
  //         sx={{
  //           position: "sticky",
  //           top: 0,
  //           zIndex: 1100,
  //           backgroundColor: "background.default",
  //         }}
  //       >
  //         <Tab>Transcription</Tab>
  //         <Tab>Description/Summary</Tab>
  //       </TabList>
  //       <TabPanel value={0}>{transcription}</TabPanel>
  //       <TabPanel value={1}>{description}</TabPanel>
  //     </Tabs>
  //   );
};

export default BottomTap;
