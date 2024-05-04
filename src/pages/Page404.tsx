import { Box, Button, CssBaseline, GlobalStyles, Typography } from "@mui/joy";
import { CssVarsProvider } from "@mui/joy/styles";
import { useNavigate } from "react-router-dom";
import NotFoundSVG from "../assets/loginimg.png"; // Import the SVG file

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles styles={{ ":root": { "--Form-maxWidth": "800px" } }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          textAlign: "center",
          p: 2
        }}
      >
        <Box
          component="img"
          src={NotFoundSVG} 
          alt="404 Not Found"
          sx={{ width: "100%", maxWidth: "560px", height: "auto", pb: 4 }}
        />
        <Typography level="h4" sx={{ mb: 2 }}>
          Oops! The page you're looking for can't be found.
        </Typography>
        <Typography sx={{ mb: 4 }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Typography>
        <Button onClick={() => navigate("/")} >
          Home Page
        </Button>
        
      </Box>
    </CssVarsProvider>
  );
}
