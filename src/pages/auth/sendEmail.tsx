import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import {
    Box,
    Button,
    CssBaseline,
    Divider,
    FormControl,
    FormLabel,
    GlobalStyles,
    IconButton,
    Input,
    Link,
    Stack,
    Typography
} from "@mui/joy";
import {
    CssVarsProvider,
    useColorScheme
} from "@mui/joy/styles";
import React, { useEffect, useState } from "react";
import loginImg from "../../assets/loginimg.png";
import { LogoIcon } from "../../components/Icons";
import { AuthService } from "@/client";
import { IconButtonProps } from "@mui/joy/IconButton";
import { useNavigate } from "react-router-dom";

interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
}

interface SendEmailFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

function ColorSchemeToggle(props: IconButtonProps) {
    const { onClick, ...other } = props;
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setMode(mode === "light" ? "dark" : "light");
        onClick?.(event);
    };

    return (
        <IconButton
            aria-label="toggle light/dark mode"
            size="sm"
            variant="outlined"
            disabled={!mounted}
            onClick={handleClick}
            {...other}
        >
            {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
        </IconButton>
    );
}

export default function SendEmail() {
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<SendEmailFormElement>) => {
        event.preventDefault();
        const { email } = event.currentTarget.elements;
        if (email.value === "") {
            alert("Please enter a valid email address");
        } else {
            try {
                const response = await AuthService.resetPassword({
                    requestBody: {
                        email: email.value,
                    }
                });
                alert(response.message);
                navigate("/signin");

            } catch (error) {
                alert(error);
            }
        }
    };

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
                                Please enter your email to search for your account.
                            </Typography>
                        </Stack>
                        <Divider />
                        <form
                            noValidate
                            autoComplete="off"
                            onSubmit={(event) => handleSubmit(event as any)}
                        >
                            <FormControl required>
                                <FormLabel>Email</FormLabel>
                                <Input type="email" name="email" />
                            </FormControl>
                            <Stack gap={4} sx={{ mt: 2 }}>
                                <Button type="submit" fullWidth>
                                    Send
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                    <Box component="footer" sx={{ py: 3 }}>
                        <Typography level="body-xs" textAlign="center">
                            &copy; 2024 by{" "}
                            <Link href="https://github.com/SummarizeIT">SummarizeIT Team</Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </CssVarsProvider>
    );
}
