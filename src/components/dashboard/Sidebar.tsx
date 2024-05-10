import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import FolderIcon from '@mui/icons-material/Folder';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Divider from "@mui/joy/Divider";
import GlobalStyles from "@mui/joy/GlobalStyles";
import IconButton from "@mui/joy/IconButton";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import * as React from "react";

import { MeResponse } from "@/client";
import { LogoIcon } from "@/components/Icons";
import { closeSidebar } from "@/lib/DashboardUtils";
import { useUserContext } from "@/utils/user/user-context";
import { useEffect, useState } from "react";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";
import ColorSchemeToggle from "./ColorSchemeToggle";
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "0.2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function Sidebar() {
  const navigate = useNavigate();
  const signOut = useSignOut();
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
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        height: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs:
              "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <LogoIcon />
        <Typography level="title-lg">Summerize IT</Typography>
        <ColorSchemeToggle sx={{ ml: "auto" }} />
      </Box>
      {/* call for the search */}
      {/* <Input size="sm" startDecorator={<SearchRoundedIcon />} placeholder="Search" /> */}

      <Divider />

      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem onClick={() => navigate("/Home")}>
            <ListItemButton>
              <HomeRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Home</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem onClick={() => navigate("/Media")}>
            <ListItemButton>
              <FolderIcon />
              <ListItemContent>
                <Typography level="title-sm">Media</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem onClick={() => navigate("/settings/profile")}>
            <ListItemButton>
              <ManageAccountsRoundedIcon/>
              <ListItemContent>
                <Typography level="title-sm">Profile</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem onClick={() => navigate("/settings/notifications")}>
            <ListItemButton>
              <NotificationsNoneRoundedIcon/>
              <ListItemContent>
                <Typography level="title-sm">Notifications</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>


        <Card
          invertedColors
          variant="soft"
          color="neutral"
          size="sm"
          sx={{ boxShadow: "none" }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography level="title-sm">Need Help?</Typography>
          </Stack>
          <Typography level="body-xs">
            Contact us on our support email.
          </Typography>
          <Button size="sm" variant="solid">
            <a href="mailto:support@summarization.com">Contact Support</a>
          </Button>
        </Card>
        <Divider />
        {/* call organization selection */}
      </Box>

      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar variant="outlined" size="sm" src={user?.avatar} />
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
        <IconButton
          size="sm"
          variant="plain"
          color="neutral"
          onClick={() => {
            signOut();
            navigate("/signin");
          }}
        >
          <LogoutRoundedIcon />
        </IconButton>
      </Box>
    </Sheet>
  );
}
