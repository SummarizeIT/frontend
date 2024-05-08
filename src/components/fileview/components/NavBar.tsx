import { MeResponse } from "@/client";
import { LogoIcon } from "@/components/Icons";
import { useUserContext } from "@/utils/user/user-context";
import { Box } from '@mui/joy';
import Avatar from '@mui/joy/Avatar';
import Typography from '@mui/joy/Typography';
import { useEffect, useState } from "react";
import ColorSchemeToggle from './ColorSchemeToggle';



export default function HeaderSection() {
  const userContext = useUserContext();
  const [user, setUser] = useState<MeResponse | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await userContext?.getUser();
      setUser(userData);
    };
    fetchUser();
  }, []);
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <LogoIcon />
        <Typography level="title-lg">Summerize IT</Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
        <Box
          sx={{
            gap: 1,
            alignItems: 'center',
            display: { xs: 'none', sm: 'flex' },
          }}
        >
          <Avatar
            variant="outlined"
            size="sm"
            src={user?.avatar}
          />
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography level="title-sm">
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography
              level="body-xs"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "100%",
              }}
            >
              {user?.email}
            </Typography>
          </Box>
        </Box>
        <ColorSchemeToggle sx={{ alignSelf: 'center' }} />
      </Box>
    </Box>
  );
}
