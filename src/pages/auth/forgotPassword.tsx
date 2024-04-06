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


interface FormElements extends HTMLFormControlsCollection {
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

export default function ForgotPassword() {
    const [showPassword] = React.useState(false);
    const [showConfirmPassword] = React.useState(false);
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
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          minHeight: "100vh",
        }}
      >
        {/* Image Container */}
        <Box
          sx={{
            flex: 1,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url(${loginImg})`,
          }}
        />
        {/* Form Container */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: { xs: 2, md: 4 },
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
            }}
          >
            <Stack gap={2} sx={{ mb: 2 }}>
              <Typography component="h1" level="h3">
                Find your account
              </Typography>
              <Typography component="h3" level="body-md">
                Please enter your new password.
              </Typography>
            </Stack>
            <Divider></Divider>
            <form
              onSubmit={(event: React.FormEvent<SignInFormElement>) => {
                event.preventDefault();
                const formElements = event.currentTarget.elements;
                const data = {
                  password: formElements.password.value,
                  confirmPassword:formElements.confirmpassword.value,
                };
                const passwordRegex =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
              if (!passwordRegex.test(data.password)) {
                alert(
                  "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character."
                );
                return;
              }

              if (data.password !== data.confirmPassword) {
                alert("Passwords do not match.");
                return;
              }
                alert(JSON.stringify(data, null, 2));
              }}
            >
              <FormControl required>
                  <FormLabel>New Password</FormLabel>
                    <Input type={showPassword ? "text" : "password"} name="password"/>
                </FormControl>
                <FormControl required>
                  <FormLabel>Confirm your new password</FormLabel>
                  <Input type={showConfirmPassword ? "text" : "password"} name="confirmpassword" />
                </FormControl>
              <Stack gap={4} sx={{ mt: 2 }}>
                <Button type="submit" fullWidth>
                  Save
                </Button>
              </Stack>
            </form>
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
    </CssVarsProvider>
  );
}
