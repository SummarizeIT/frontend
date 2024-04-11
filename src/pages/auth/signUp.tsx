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
import { useNavigate } from "react-router-dom";
import AuthManager, { RegisterData } from "@/utils/auth";

interface FormElements extends HTMLFormControlsCollection {
  firstName: HTMLInputElement;
  lastName: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
  confirmpassword: HTMLInputElement;
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

export default function SignUpPage() {
  const [showPassword] = React.useState(false);
  const [showConfirmPassword] = React.useState(false);
  const navigate = useNavigate();

  return (
    <CssVarsProvider defaultMode="system" disableTransitionOnChange>
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
            minHeight: "100dvh",
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
                  Register
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
              <form
                onSubmit={async (event: React.FormEvent<SignInFormElement>) => {
                  event.preventDefault();
                  const formElements = event.currentTarget.elements;
                  const registerData: RegisterData = {
                    name: formElements.firstName.value,
                    lastName: formElements.lastName.value,
                    email: formElements.email.value,
                    password: formElements.password.value,
                    passwordConfirm: formElements.confirmpassword.value,
                  };
                  // This regular expression checks for:
                  // At least one lowercase letter ((?=.*[a-z]))
                  // At least one uppercase letter ((?=.*[A-Z]))
                  // At least one digit ((?=.*\d))
                  // At least one special character ((?=.*[@$!%*?&]))
                  // A minimum length of 8 characters ([A-Za-z\d@$!%*?&]{8,})
                  const passwordRegex =
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                  if (!passwordRegex.test(registerData.password)) {
                    alert(
                      "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character."
                    );
                    return;
                  }

                  if (registerData.password !== registerData.passwordConfirm) {
                    alert("Passwords do not match.");
                    return;
                  }

                  alert(JSON.stringify(registerData, null, 2));
                  try {
                    const response = await AuthManager.register(registerData);
                    // Handle response or navigate to different page on success
                    alert(JSON.stringify(response.data, null, 2));
                    navigate("/signin");
                  } catch (error) {
                    // Handle error, e.g., display an error message
                    console.error("Registration error:", error);
                  }
                }}
              >
                <FormControl required>
                  <FormLabel>First name</FormLabel>
                  <Input type="text" name="firstName" />
                </FormControl>
                <FormControl required>
                  <FormLabel>Last name</FormLabel>
                  <Input type="text" name="lastName" />
                </FormControl>
                <FormControl required>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" name="email" />
                </FormControl>
                <FormControl required>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                  />
                </FormControl>
                <FormControl required>
                  <FormLabel>Confirm your password</FormLabel>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmpassword"
                  />
                </FormControl>
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  ></Box>
                  <Button type="submit" sx={{ width: "50%", ml: "25%" }}>
                    Register
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
        sx={(theme) => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: "100%", md: "50vw" }, // Hide the image box on mobile by moving it off-screen
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${loginImg})`,
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage: `url(${loginImg})`,
          },
        })}
      />
    </CssVarsProvider>
  );
}
