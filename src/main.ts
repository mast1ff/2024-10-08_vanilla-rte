import "./style.css";
import { setupRichTextEditor } from "./rte.ts";

setupRichTextEditor(document.querySelector(`[data-editor-root]`)!);
