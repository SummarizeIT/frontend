import Box from '@mui/joy/Box';
import CssBaseline from '@mui/joy/CssBaseline';
import Stack from '@mui/joy/Stack';
import { CssVarsProvider } from '@mui/joy/styles';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { EntryService } from '@/client';
import NavBar from '@/components/fileview/components/NavBar';
import { Tab, TabList, TabPanel, Tabs } from '@mui/joy';
import MDEditor from '@uiw/react-md-editor';
import ReactPlayer from 'react-player';
interface MediaPageProps {
  mediaUrl?: string;
  transcription?: string;
  description?: string;
}

const PublicView: React.FC<MediaPageProps> = ({}) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [url, setUrl] = useState<string | null>(null);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [summarization, setSummarization] = useState<string | null>(null);

  const getEntryDetails = useCallback(() => {
    if (!id) return;
    EntryService.getEntryById({ id: id })
      .then((response) => {
        setUrl(response.url);
        setTranscription(response.transcript);
        const bodyContent = response.extensions.find(ext => ext.identifier === "body")?.content?.text ?? undefined;
        setSummarization(bodyContent as string);
      })
      .catch((error) => {
        console.error(error);
        navigate("/404");
      });
  }, [id]);

  useEffect(() => {
    if (id) {
      getEntryDetails();
    }
  }, [getEntryDetails, id]);

  const tabs = [];
  const tabPanels = [];

  tabs.push(<Tab key="Transcription">Transcription</Tab>);
  tabPanels.push(
    <TabPanel key="Transcription" value={0}>
      <MDEditor.Markdown
        source={transcription || ""}
        style={{
          whiteSpace: "pre-wrap",
          direction: "rtl",
          backgroundColor: "transparent",
        }}
      />
    </TabPanel>
  );

  tabs.push(<Tab key="Summarization">Summarization</Tab>);
  tabPanels.push(
    <TabPanel key="Summarization" value={1}>
      <MDEditor.Markdown
        source={summarization || ""}
        style={{
          backgroundColor: "transparent",
        }}
      />
    </TabPanel>
  );


 
  return (

    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <NavBar />
      <Box
        component="main"
        sx={{ height: "calc(100vh - 49px)", display: "grid" }}
      >
        <Stack
          sx={{
            backgroundColor: "background.surface",
            px: { xs: 2, md: 4 },
            py: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <ReactPlayer width="100%" height="60%" url={url!} controls />
          <Tabs
            aria-label="Sticky tabs"
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
        </Stack>
      </Box>
    </CssVarsProvider>

  );

};

export default PublicView;
