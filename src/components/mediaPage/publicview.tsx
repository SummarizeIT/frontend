import Box from '@mui/joy/Box';
import CssBaseline from '@mui/joy/CssBaseline';
import Stack from '@mui/joy/Stack';
import { CssVarsProvider } from '@mui/joy/styles';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MediaPlayer from './utils/mediaPlayer';

import { EntryService } from '@/client';
import NavBar from '@/components/fileview/components/NavBar';
interface MediaPageProps {
  mediaUrl?: string;
  transcription?: string;
  description?: string;
}

const PublicView: React.FC<MediaPageProps> = ({
}) => {
  const { id } = useParams<{ id: string }>();
  const [url, setUrl] = useState<string | null>(null);


  const getEntryDetails = useCallback(
    () => {
      if (!id) return;
      EntryService.getEntryById({ id: id }).then((response) => {
        console.log(response);
        setUrl(response.url);
      }).catch((error) => {
        console.error(error);
      });
    },
    [id]
  );

  useEffect(() => {
    if (id) {
      getEntryDetails();
    }
  }, [getEntryDetails, id]);

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <NavBar />
      <Box component="main" sx={{ height: 'calc(100vh - 55px)', display: 'grid', gridTemplateColumns: { xs: 'auto', md: '60% 40%' }, gridTemplateRows: 'auto 1fr auto', }}>
      </Box>
    </CssVarsProvider>
  );
};

export default PublicView;
