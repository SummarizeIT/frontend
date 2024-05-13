import { EntryService } from "@/client";
import { useUserContext } from "@/utils/user/user-context";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingModal from "../modal/LoadingModal";
import MDEditor from "@uiw/react-md-editor";
import {
  Box,
  Button,
  CssBaseline,
  CssVarsProvider,
  IconButton,
  Input,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from "@mui/joy";
import { formatDate } from "./parts/top";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Label } from "@radix-ui/react-dropdown-menu";

const EditView = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [body, setBody] = useState<string | undefined>(undefined);
  const [objectives, setObjective] = useState<string | undefined>(undefined);
  const [recommendations, setRecommendations] = useState<string | undefined>(
    undefined
  );
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [createdOn, setCreatedOn] = useState<string | undefined>(undefined);
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const userContext = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const setRoot = async () => {
      const user = await userContext?.getUser();
    };
    setRoot();
  }, []);

  useEffect(() => {
    const fetchMedia = async () => {
      if (!id) return;

      EntryService.getEntryById({ id: id })
        .then((response) => {
          console.log(response);
          setTitle(response.title);
          setCreatedOn(response.createdOn);
          const bodyContent =
            response.extensions.find((ext) => ext.identifier === "body")
              ?.content?.text ?? undefined;
          setBody(bodyContent as string);
          const objectiveContent =
            response.extensions.find((ext) => ext.identifier === "objectives")
              ?.content?.text ?? undefined;
          setObjective(objectiveContent as string);
          const recommendationsContent =
            response.extensions.find(
              (ext) => ext.identifier === "recommendations"
            )?.content?.text ?? undefined;
          setRecommendations(recommendationsContent as string);
          setIsPublic(response.isPublic);
        })
        .catch((error) => {})
        .finally(() => {
          setLoading(false);
        });
    };

    fetchMedia();
  }, [id]);

  const handleSaveButton = async () => {
    setLoading(true);
    if (!id) {
      setLoading(false);
      return;
    }
    if (title && body && objectives && recommendations) {
      await EntryService.updateEntry({
        id: id,
        requestBody: {
          title: title,
          isPublic: isPublic,
          extensions: [
            {
              identifier: "body",
              content: {
                text: body,
              },
            },
            {
              identifier: "objectives",
              content: {
                text: objectives,
              },
            },
            {
              identifier: "recommendations",
              content: {
                text: recommendations,
              },
            },
          ],
        },
      })
        .then(() => {
          console.log("Updated");
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
          navigate(-1);
        });
    }
  };

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", height: "100%" }}>
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: "calc(12px + var(--Header-height))",
              sm: "calc(12px + var(--Header-height))",
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            gap: 1,
            height: "100%",
          }}
        >
          <Label style={{ justifyContent: "center", display: "flex" }}>
            {formatDate(createdOn!)}
          </Label>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", gap: "8px" }}>
              <IconButton
                onClick={() => {
                  navigate(-1);
                }}
              >
                <ArrowBackRoundedIcon />
              </IconButton>
            </div>
            <div
              style={{
                flexGrow: 1,
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "stretch" 
              }}
            >
              <Label style={{fontSize:"20px", margin:"5px"}}>Title:</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ width: "50%" }}
              />
            </div>
          </div>
          <Tabs
            aria-label="Sticky tabs"
            defaultValue={0}
            sx={{ height: "100%" }}
          >
            <TabList sticky="top" variant="soft">
              <Tab>Body</Tab>
              <Tab>Objective</Tab>
              <Tab>Recommendations</Tab>
            </TabList>

            <TabPanel value={0} sx={{ height: "100%" }}>
              <MDEditor
                value={body}
                onChange={setBody}
                style={{
                  whiteSpace: "pre-wrap",
                  backgroundColor: "transparent",
                  height: "100%",
                }}
              />
            </TabPanel>
            <TabPanel value={1} sx={{ height: "100%" }}>
              <MDEditor
                value={objectives}
                onChange={setObjective}
                style={{
                  whiteSpace: "pre-wrap",
                  backgroundColor: "transparent",
                  height: "100%",
                }}
              />
            </TabPanel>
            <TabPanel value={2} sx={{ height: "100%" }}>
              <MDEditor
                value={recommendations}
                onChange={setRecommendations}
                style={{
                  whiteSpace: "pre-wrap",
                  backgroundColor: "transparent",
                  height: "100%",
                }}
              />
            </TabPanel>
          </Tabs>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Button
              variant="outlined"
              color="neutral"
              onClick={handleSaveButton}
            >
              Save
            </Button>
          </div>
          <LoadingModal open={loading} onClose={() => setLoading(false)} />
        </Box>
      </Box>
    </CssVarsProvider>
  );
};

export default EditView;
