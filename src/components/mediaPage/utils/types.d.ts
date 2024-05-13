import { FC, ReactElement } from "react"

type ExtensionComponentProps = { name: string }
type ExtensionComponent = FC<ExtensionComponentProps>
type ExtensionElement = ReactElement<ExtensionComponentProps>

type PaneElementProps = { children?: ExtensionElement[] | ExtensionElement }
type PaneComponent = FC<PaneElementProps>

type OnChange = (value?: string, event?: React.ChangeEvent<HTMLTextAreaElement>, state?: ContextStore) => void;