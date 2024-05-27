import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import CssBaseline from "@mui/joy/CssBaseline";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import GlobalStyles from "@mui/joy/GlobalStyles";
import IconButton, { IconButtonProps } from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Link from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import React, { useEffect, useState } from "react";
import loginImg from "../../assets/loginimg.png";
import { LogoIcon } from "../../components/Icons";
import { useNavigate, useParams } from "react-router-dom";
import { AuthService } from "@/client";
import NotFoundPage from "@/pages/Page404";
import InfoModal from "@/components/modal/InfoModal";

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
    const { token } = useParams<{ token: string }>(); 
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [validToken, setValidToken] = useState(false);
    const [loading, setLoading] = useState(true);
    const [infoMessage, setInfoMessage] = React.useState<string|null>(null);
    const [infoTitle, setInfoTitle] = React.useState<string|null>(null);
    const [open, setOpen] = React.useState<boolean>(false);


    useEffect(() => {
        if (token) {
            AuthService.resetPassword2({ token })
                .then(response => {
                    if (response.id) {
                        setValidToken(true);
                    }
                })
                .catch(error => {
                    console.error("Token validation failed", error);
                }).finally(() => {
                    setLoading(false); 
                });
        } else {
            console.error("Token not found in URL");
        }
    }, [token, navigate]);

    const handlePasswordReset = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== passwordConfirm) {
            setOpen(true);
            setInfoTitle("Error");
            setInfoMessage("Passwords do not match!");
            return;
        }
        if (token) {
            AuthService.resetPassword1({
                token,
                requestBody: {
                    password: password,
                    passwordConfirm: passwordConfirm
                }
            }).then(response => {
                setOpen(true);
                setInfoTitle("Success");
                setInfoMessage("Password reset successfully.");
                navigate('/signin'); 
            }).catch(error => {
                setOpen(true);
                setInfoTitle("Error");
                setInfoMessage("Failed to reset password. Please try again.");
                console.log(error);
            });
        }
    };
    if (loading) {
        return <div>Loading...</div>;
    }
    if (!validToken)
        return <NotFoundPage />;

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
                                Update Password
                            </Typography>
                            <Typography component="h3" level="body-md">
                                Please enter your new password.
                            </Typography>
                        </Stack>
                        <Divider />
                        <form onSubmit={handlePasswordReset}>
                            <FormControl>
                                <FormLabel htmlFor="password">New Password</FormLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="passwordConfirm">Confirm Password</FormLabel>
                                <Input
                                    id="passwordConfirm"
                                    type="password"
                                    value={passwordConfirm}
                                    onChange={(event) => setPasswordConfirm(event.target.value)}
                                    required
                                />
                            </FormControl>

                            <Stack gap={4} sx={{ mt: 2 }}>
                                <Button type="submit" fullWidth>
                                    Reset Password
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
            <InfoModal open={open} infoMessage={infoMessage!} infoTitle={infoTitle!} onClose={()=>setOpen(false)}/>
        </CssVarsProvider>
    );
}
