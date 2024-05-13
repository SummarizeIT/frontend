import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { PaneComponent } from "./types";
import { PropsWithChildren, useState } from "react";
import { Box, createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/system';

const Panel = (props: PropsWithChildren<{ value: number, index: number }>) => (<div hidden={props.value !== props.index}>{props.value === props.index && props.children}</div>)

const Pane: PaneComponent = ({ children }) => {
  const [tabNum, setTabNum] = useState<number>(0);
  const extensions = (() => !children ? [] : Array.isArray(children) ? children : [children])();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabNum(newValue);
  };

  const theme = createTheme({});

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Tabs value={tabNum} onChange={handleChange}>
          {extensions.map((extension) => (<Tab label={extension.props.name} key={extension.props.name} />))}
        </Tabs>
        {extensions.map((extension, index) => (<Panel value={index} index={tabNum} key={extension.props.name}>{extension}</Panel>))}
      </Box>
    </ThemeProvider>
  )
};

export default Pane;
