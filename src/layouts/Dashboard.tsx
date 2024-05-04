import Box from '@mui/joy/Box';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import { CssVarsProvider } from '@mui/joy/styles';


import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';
import { FolderViewer } from '@/components/chonky/FolderViewer';

export default function JoyOrderDashboardTemplate() {
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Header />
        <Sidebar />
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: 'calc(12px + var(--Header-height))',
              sm: 'calc(12px + var(--Header-height))',
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Here we should call the path of the the current page... */}
          </Box>
          {/** here the title of the page will be called */}
          <Box
            sx={{
              display: 'flex',
              mb: 1,
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'start', sm: 'center' },
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ width: '100%' }}>
            <FolderViewer/>
            </div>
              
            
          </Box>

          {/* components for getting the tables and data...etc */}
        </Box>
      </Box>
    </CssVarsProvider>
  );
}