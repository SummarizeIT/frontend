import React from 'react';
import { ObjectiveProps } from './objective';
import { RecommendationsProps } from './recommendations';
import { TestBankProps } from './testBank';
import Box from '@mui/joy/Box';
import CssBaseline from '@mui/joy/CssBaseline';
import Stack from '@mui/joy/Stack';
import { CssVarsProvider } from '@mui/joy/styles';
import NavBar from '@/components/fileview/components/NavBar';

interface MediaPageProps {
  mediaUrl?: string;
  objectiveProps?: ObjectiveProps;
  testBankProps?: TestBankProps;
  recommendationsProps?: RecommendationsProps;
  transcription?: string;
  description?: string;
}

const MediaPage: React.FC<MediaPageProps> = ({

}) => {
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <NavBar />
      <Box component="main" sx={{ height: 'calc(100vh - 55px)', display: 'grid', gridTemplateColumns: { xs: 'auto', md: '60% 40%' }, gridTemplateRows: 'auto 1fr auto', }}>
        <Stack sx={{ backgroundColor: 'background.surface', px: { xs: 2, md: 4 }, py: 2, borderBottom: '1px solid', borderColor: 'divider', }}>video</Stack>
        <Box sx={{ gridRow: 'span 3', display: { xs: 'none', md: 'flex' }, }}>right</Box>
        <Stack spacing={2} sx={{ px: { xs: 2, md: 4 }, pt: 2, minHeight: 0 }}>bootom</Stack>
      </Box>
    </CssVarsProvider>
  );
};

export default MediaPage;
