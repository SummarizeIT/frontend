import { LogoIcon } from "@/components/Icons";
import { Box } from '@mui/joy';
import { NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import ColorSchemeToggle from './ColorSchemeToggle';

export default function HeaderSection() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        top: 0,
        px: 1.5,
        py: 1,
        zIndex: 10000,
        backgroundColor: 'background.body',
        borderBottom: '1px solid',
        borderColor: 'divider',
        position: 'sticky',
      }}
    >
      <NavigationMenuItem className="font-bold flex">
        <a href="/" className="ml-2 font-bold text-xl flex items-center">
          {" "}
          <LogoIcon />
          <span className="ml-2">SummerizeIT</span>{" "}
        </a>
      </NavigationMenuItem>

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
        <Box
          sx={{
            gap: 1,
            alignItems: 'center',
            display: { xs: 'none', sm: 'flex' },
          }}
        >
        </Box>
        <ColorSchemeToggle sx={{ alignSelf: 'center' }} />
      </Box>
    </Box>
  );
}
