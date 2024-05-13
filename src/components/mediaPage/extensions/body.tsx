import MDEditor from "@uiw/react-md-editor";
import { ExtensionComponent, OnChange } from "../utils/types";
import { useEntryContext } from "../view";
import { useCallback, useEffect, useState } from "react";

interface BodyContent {
    text: string;
}

const Body: ExtensionComponent = () => {
    const identifier = "body"
    const entryContext = useEntryContext();
    const [content, setContent] = useState<BodyContent>(() => entryContext.getExtension(identifier) as BodyContent ?? { text: "" })

    const onChange = useCallback<OnChange>((val) => {
        setContent({ text: val ?? "" });
    }, [content]);

    useEffect(() => {
        if (content.text === "")
            entryContext.clearExtension(identifier);
        else
            entryContext.setExtension({ identifier, content })
    }, [content])

    return entryContext.editMode ? (
        <MDEditor value={content.text} onChange={onChange}>
            <MDEditor.Markdown
                source={content.text}
                style={{
                    backgroundColor: "transparent",
                }}
            />
        </MDEditor>) : <MDEditor.Markdown
        source={content.text}
        style={{
            backgroundColor: "transparent",
        }}
    />
}

export default Body;