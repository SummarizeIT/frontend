import { EntryResponse, EntryService, Extension } from "@/client";
import Top from "@/components/mediaPage/utils/top";
import Box from "@mui/joy/Box";
import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MediaPlayer from "./utils/mediaPlayer";

import Pane from "./utils/pane";
import Transcript from "./extensions/transcript";
import Body from "./extensions/body";
import Objectives from "./extensions/objectives";
import Recommendations from "./extensions/recommendations";
import { ExtensionContent } from "./utils/types";

interface EntryContextType {
  entry: EntryResponse;
  editMode: boolean;
  getExtension: (identifier: string) => ExtensionContent;
  setExtension: ({ identifier, content }: Extension) => void;
  clearExtension: (identifier: string) => void;
}

const EntryContext = React.createContext<EntryContextType>(null!);

const MediaPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [entry, setEntry] = useState<EntryResponse | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);

  const toggleEditMode = () => setEditMode(!editMode);

  const getExtensionMap = useCallback(() => {
    const extensions = new Map<string, unknown>();
    entry?.extensions.forEach(extension => extensions.set(extension.identifier, extension.content))
    return extensions;
  }, [entry])

  const setExtensionMap = (extensions: Map<string, unknown>) => {
    if (!(entry && entry.extensions))
      return;

    const extArray: Extension[] = []
    extensions.forEach((content, identifier) => {
      extArray.push({ identifier, content } as Extension)
    })
    entry.extensions = extArray
    console.log(entry)
    setEntry(entry);
  }

  const getExtension = (identifier: string) => {
    return getExtensionMap().get(identifier) as ExtensionContent;
  }

  const setExtension = ({ identifier, content }: Extension) => {
    const extensions = getExtensionMap()
    extensions.set(identifier, content)
    setExtensionMap(extensions)
  }

  const clearExtension = (identifier: string) => {
    const extensions = getExtensionMap()
    extensions.delete(identifier)
    setExtensionMap(extensions)
  }

  useEffect(() => {
    (async () => {
      if (!id) {
        navigate("/404");
        return;
      }
      setEntry(await EntryService.getEntryById({ id }))
    })()
  }, [])

  return entry && (
    <EntryContext.Provider value={{ entry, editMode, getExtension, setExtension, clearExtension }}>
      <CssVarsProvider disableTransitionOnChange>
        <CssBaseline />
        <Box sx={{ display: "flex" }}>
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
            }}
          >
            <Box
              sx={{
                gridRow: "span 3",
                display: { xs: "2", md: "2" },
              }}
            >
              <Top title={entry.title} createdOn={entry.createdOn} id={id} toggleEditMode={toggleEditMode} editMode={editMode} />
            </Box>

            <Box
              component="main"
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "auto", md: "70% 30%" },
                gridTemplateRows: "auto 1fr auto",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "background.surface",
                  px: { xs: 2, md: 4 },
                  py: 2,
                  borderColor: "divider",
                  height: "100%",
                  width: "100%",
                }}
              >
                <MediaPlayer url={entry.url} />
              </Box>
              <Box sx={{ gridRow: "span 3", display: { xs: "2", md: "2" } }}>
                <Pane>
                  <Objectives name="Objectives" />
                  <Recommendations name="Recommendations" />
                </Pane>
              </Box>
            </Box>

            <Box
              sx={{
                gridRow: "span 3",
                display: { xs: "2", md: "2" },
              }}
              height={"40%"}
            >
              <Pane>
                <Body name="Body" />
                <Transcript name="Transcript" />
              </Pane>
            </Box>
          </Box>
        </Box>
      </CssVarsProvider>
    </EntryContext.Provider>
  );
};

export const useEntryContext = () => useContext(EntryContext);
export default MediaPage;
