import { LinearProgress } from "@mui/joy";
import { ExtensionComponent } from "../utils/types";
import { useEntryContext } from "../view";

const Transcript: ExtensionComponent = () => {
  const entryContext = useEntryContext()

  if (entryContext.entry.processing)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}>
        <LinearProgress variant="outlined" color="neutral" />
      </div>)


  return (<div>{entryContext.entry.transcript}</div>)
}

export default Transcript;