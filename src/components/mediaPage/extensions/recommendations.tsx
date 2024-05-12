import { Button } from "@mui/joy";
import { ExtensionComponent } from "../utils/types";

const recommendations: ExtensionComponent = () => {
    const handleGenerateRecommendations = () => {
        alert("Generate Recommendations");
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
                onClick={handleGenerateRecommendations}
            >
                Generate Recommendations
            </Button>
        </div>)
}

export default recommendations;