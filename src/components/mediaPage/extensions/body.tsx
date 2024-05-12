import MDEditor from "@uiw/react-md-editor";
import { ExtensionComponent, OnChange } from "../utils/types";
import { useEntryContext } from "../view";
import { useCallback, useEffect, useState } from "react";


const Body: ExtensionComponent = () => {
    const identifier = "body"
    const entryContext = useEntryContext();
    const [text, setText] = useState<string>(() => entryContext.getExtension(identifier) ? entryContext.getExtension(identifier).text as string : "")

    const onChange = useCallback<OnChange>((val) => {
        setText(val ?? "");
    }, [text]);

    useEffect(() => {
        if (text === "")
            entryContext.clearExtension(identifier);
        else
            entryContext.setExtension({ identifier, content: { text } })
    }, [text])

    return entryContext.editMode ? (
        <MDEditor value={text} onChange={onChange}>
            <MDEditor.Markdown
                source={text}
                style={{
                    backgroundColor: "transparent",
                }}
            />
        </MDEditor>) : <MDEditor.Markdown
        source={text}
        style={{
            backgroundColor: "transparent",
        }}
    />
}

export default Body;