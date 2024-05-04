// import { useAuth } from "@/utils/auth/auth-context"; // Ensure this path is correct
// import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
// import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
// import Box from "@mui/joy/Box";
// import Button from "@mui/joy/Button";
// import CssBaseline from "@mui/joy/CssBaseline";
// import Divider from "@mui/joy/Divider";
// import FormControl from "@mui/joy/FormControl";
// import FormLabel from "@mui/joy/FormLabel";
// import GlobalStyles from "@mui/joy/GlobalStyles";
// import IconButton, { IconButtonProps } from "@mui/joy/IconButton";
// import Input from "@mui/joy/Input";
// import Link from "@mui/joy/Link";
// import Stack from "@mui/joy/Stack";
// import Typography from "@mui/joy/Typography";
// import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
// import React, { useState } from "react";
// import { useParams } from 'react-router-dom';
// import loginImg from "../../assets/loginimg.png";
// import { LogoIcon } from "../../components/Icons";

// function ColorSchemeToggle(props: IconButtonProps) {
//   const { onClick, ...other } = props;
//   const { mode, setMode } = useColorScheme();
//   const [mounted, setMounted] = React.useState(false);
//   React.useEffect(() => setMounted(true), []);
//   return (
//     <IconButton
//       aria-label="toggle light/dark mode"
//       size="sm"
//       variant="outlined"
//       disabled={!mounted}
//       onClick={(event) => {
//         setMode(mode === "light" ? "dark" : "light");
//         onClick?.(event);
//       }}
//       {...other}
//     >
//       {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
//     </IconButton>
//   );
// }

// export default function ForgotPassword() {
//   const auth = useAuth();
//   const [password, setPassword] = useState('');
//   const [passwordConfirm, setPasswordConfirm] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const { token } = useParams<{ token?: string }>();
//   if (!auth) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }

//   const { validateResetToken, changePasswordWithToken } = auth;

//   const handlePasswordReset = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (!token) {
//       alert("Invalid or expired reset token.");
//       return;
//     }
//     if (password !== passwordConfirm) {
//       alert("Passwords do not match.");
//       return;
//     }

//     try {
//       await validateResetToken(token); 
//       await changePasswordWithToken({ password, passwordConfirm, token });
//       alert('Password successfully reset!');
//     } catch (error) {
//       alert('Failed to reset password. Please try again.');
//     }
//   };

//   return (
//     <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
//       <CssBaseline />
//       <GlobalStyles
//         styles={{
//           ":root": {
//             "--Form-maxWidth": "800px",
//             "--Transition-duration": "0.4s",
//           },
//         }}
//       />
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", md: "row" },
//           minHeight: "100vh",
//         }}
//       >
//         {/* Image Container */}
//         <Box
//           sx={{
//             flex: 1,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             backgroundImage: `url(${loginImg})`,
//           }}
//         />
//         {/* Form Container */}
//         <Box
//           sx={{
//             flex: 1,
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             p: { xs: 2, md: 4 },
//           }}
//         >
//           <Box
//             component="header"
//             sx={{
//               py: 3,
//               display: "flex",
//               justifyContent: "space-between",
//             }}
//           >
//             <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
//               <LogoIcon />
//               <Typography level="h4">SummarizeIT</Typography>
//             </Box>
//             <ColorSchemeToggle />
//           </Box>
//           <Box
//             component="main"
//             sx={{
//               my: "auto",
//               py: 2,
//               pb: 5,
//               display: "flex",
//               flexDirection: "column",
//               gap: 2,
//               width: 400,
//               maxWidth: "100%",
//               mx: "auto",
//               borderRadius: "sm",
//               "& form": {
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 2,
//               },
//             }}
//           >
//             <Stack gap={2} sx={{ mb: 2 }}>
//               <Typography component="h1" level="h3">
//                 Find your account
//               </Typography>
//               <Typography component="h3" level="body-md">
//                 Please enter your new password.
//               ///</Typography>
//             </Stack>
//             <Divider />
//             <form onSubmit={handlePasswordReset}>
//               <FormControl required>
//                 <FormLabel>New Password</FormLabel>
//                 <Input type={showPassword ? "text" : "password"} name="password" onChange={e => setPassword(e.target.value)} />
//               </FormControl>
//               <FormControl required>
//                 <FormLabel>Confirm New Password</FormLabel>
//                 <Input type={showPassword ? "text" : "password"} name="confirmpassword" onChange={e => setPasswordConfirm(e.target.value)} />
//               </FormControl>
//               <Button type="button" onClick={() => setShowPassword(!showPassword)}>
//                 {showPassword ? "Hide" : "Show"} Password
//               </Button>
//               <Stack gap={4} sx={{ mt: 2 }}>
//                 <Button type="submit" fullWidth>
//                   Reset Password
//                 </Button>
//               </Stack>
//             </form>
//           </Box>
//           <Box component="footer" sx={{ py: 3 }}>
//             <Typography level="body-xs" textAlign="center">
//               &copy; 2024 by{" "}
//               <Link href="https://github.com/SummarizeIT">
//                 SummarizeIT Team
//               </Link>
//             </Typography>
//           </Box>
//         </Box>
//       </Box>
//     </CssVarsProvider>
//   );
// }
