import { Button } from "@mui/joy";
import { ExtensionComponent } from "../utils/types";

const objectives: ExtensionComponent = () => {
    const handleGenerateObjective = () => {
        alert("Generate Objectives");
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
            }}
        >
            <Button
                variant="outlined"
                color="neutral"
                onClick={handleGenerateObjective}
            >
                Generate Objective
            </Button>
        </div>)
}

export default objectives;