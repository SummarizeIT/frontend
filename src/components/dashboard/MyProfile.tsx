import { AccountService, MeResponse } from "@/client";
import { useUserContext } from "@/utils/user/user-context";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import {
  AspectRatio,
  Box,
  Button,
  Card,
  CardActions,
  CardOverflow,
  Divider,
  FormLabel,
  IconButton,
  Input,
  Stack,
  Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";
import InfoModal from "../modal/InfoModal";

export default function MyProfile() {
  const userContext = useUserContext();
  const [user, setUser] = useState<MeResponse | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [infoMessage, setInfoMessage] = React.useState<string|null>(null);
  const [infoTitle, setInfoTitle] = React.useState<string|null>(null);
  const [open, setOpen] = React.useState<boolean>(false);
  

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await userContext?.getUser();
      setUser(userData);
      if (userData) {
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
      }
    };
    fetchUser();
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleSubmit = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("avatar", selectedImage);

      try {
        await AccountService.updateMyAvatar({
          formData: {
            avatar: formData.get("avatar") as Blob,
          },
        });
      } catch (error) {
        console.error("Failed to update avatar:", error);
      }
    }
    const updateData = {
      firstName: firstName,
      lastName: lastName,
    };

    try {
      await AccountService.updateMe({
        requestBody: updateData,
      });
    } catch (error) {
      console.error("Failed to update profile:", error);
      setOpen(true);
      setInfoMessage("Failed to update profile");
      setInfoTitle("Error");
    }

    window.location.reload();
  };

  const RemoveImage = async () => {
    try {
      await AccountService.clearMyAvatar();
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
  };

  return (
    <Box sx={{ flex: 1, width: "100%" }}>
      <InfoModal open={open} infoMessage={infoMessage!} infoTitle={infoTitle!} onClose={()=>setOpen(false)}/>
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          maxWidth: "800px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Personal info</Typography>
            <Typography level="body-sm">
              Customize how your profile information will appear to the
              networks.
            </Typography>
          </Box>
          <Divider />
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
          >
            <Stack direction="column" spacing={1}>
              <AspectRatio
                ratio="1"
                maxHeight={200}
                sx={{ minWidth: 120, borderRadius: "100%" }}
              >
                <img
                  src={
                    selectedImage
                      ? URL.createObjectURL(selectedImage)
                      : user?.avatar
                  }
                  alt="Profile"
                  loading="lazy"
                />
              </AspectRatio>
              <label
                htmlFor="image-upload"
                style={{ position: "absolute", left: 100, top: 170 }}
              >
                <IconButton
                  aria-label="upload new picture"
                  component="span"
                  size="sm"
                  variant="outlined"
                  color="neutral"
                  sx={{
                    bgcolor: "background.body",
                    borderRadius: "50%",
                    boxShadow: "sm",
                  }}
                >
                  <EditRoundedIcon />
                </IconButton>
              </label>
              <input
                type="file"
                id="image-upload"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageChange}
              />
              <Button
                component="label"
                role={undefined}
                tabIndex={-1}
                variant="outlined"
                color="neutral"
                onClick={RemoveImage}
              >
                Remove Avatar
              </Button>
            </Stack>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormLabel>Name</FormLabel>
                <Stack
                  direction={{ sm: "column", md: "row" }}
                  spacing={2}
                  sx={{ flexGrow: 1 }}
                >
                  <Input
                    size="sm"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    sx={{ flexGrow: 1 }}
                  />
                  <Input
                    size="sm"
                    value={lastName}
                    onChange={handleLastNameChange}
                    sx={{ flexGrow: 1 }}
                  />
                </Stack>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Input
                  size="sm"
                  type="email"
                  startDecorator={<EmailRoundedIcon />}
                  value={user?.email || "Email"}
                  sx={{ flexGrow: 1 }}
                  disabled
                />
              </Stack>
            </Stack>
          </Stack>
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              <Button
                component="label"
                role={undefined}
                tabIndex={-1}
                variant="outlined"
                color="neutral"
                onClick={handleSubmit}
              >
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
  );
}
