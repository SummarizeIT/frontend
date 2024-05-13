import * as React from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton, { IconButtonProps } from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import { LogoIcon } from "../../components/Icons";
import loginImg from "../../assets/loginimg.png";
import { Link as RouterLink } from "react-router-dom";
import Checkbox from "@mui/joy/Checkbox";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import { AuthService, OpenAPI } from "@/client";
import { useEffect } from "react";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  rememberMe: HTMLInputElement;
}

interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

function ColorSchemeToggle(props: IconButtonProps) {
  const { onClick, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return (
    <IconButton
      aria-label="toggle light/dark mode"
      size="sm"
      variant="outlined"
      disabled={!mounted}
      onClick={(event) => {
        setMode(mode === "light" ? "dark" : "light");
        onClick?.(event);
      }}
      {...other}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

export default function SignInPage() {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  const handleSubmit = async (event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault();
    const { email, password, rememberMe } = event.currentTarget
      .elements as FormElements;
    AuthService.login({
      requestBody: {
        email: email.value,
        password: password.value,
        rememberMe: rememberMe.checked,
      },
    })
      .then((response) => {
        signIn({
          auth: {
            token: response.token,
            type: "Bearer",
          },
          refresh: response.refreshToken,
        });
        OpenAPI.TOKEN = response.token;
        navigate("/dashboard");
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  });

  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.4s",
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width: { xs: "100%", md: "50vw" },
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255 255 255 / 0.2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            width: "100%",
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
              <LogoIcon />
              <Typography level="h4">SummarizeIT</Typography>
            </Box>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: "hidden",
              },
            }}
          >
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography component="h1" level="h3">
                  Sign in
                </Typography>
                <Typography level="body-sm">
                  You don't have an account?{" "}
                  <RouterLink
                    to="/signUp"
                    style={{
                      textDecoration: "underline",
                      color: "#1976d2",
                      cursor: "pointer",
                    }}
                  >
                    Sign up!
                  </RouterLink>
                </Typography>
              </Stack>
            </Stack>
            <Divider
              sx={(theme) => ({
                [theme.getColorSchemeSelector("light")]: {
                  color: { xs: "#FFF", md: "text.tertiary" },
                },
              })}
            ></Divider>
            <Stack gap={4} sx={{ mt: 2 }}>
              <form onSubmit={handleSubmit}>
                <FormControl required>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" name="email" required={true} />
                </FormControl>
                <FormControl required>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" name="password" required={true} />
                </FormControl>
                <FormControl>
                  <Checkbox
                    size="sm"
                    label="Remember me"
                    name="rememberMe"
                    defaultChecked={true}
                  />
                </FormControl>
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <RouterLink
                      to="/sendEmail"
                      style={{ color: "#1976d2", cursor: "pointer" }}
                    >
                      Forgot Password
                    </RouterLink>
                  </Box>
                  <Button type="submit" fullWidth>
                    Sign in
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              &copy; 2024 by{" "}
              <Link href="https://github.com/SummarizeIT">
                SummarizeIT Team
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: "100%", md: "50vw" },
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${loginImg})`,
        }}
      />
    </CssVarsProvider>
  );
}
