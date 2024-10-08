type Command =
  | "bold"
  | "italic"
  | "underline"
  | "justifyLeft"
  | "justifyCenter"
  | "justifyRight"
  | "heading1"
  | "heading2"
  | "heading3"
  | "paragraph"
  | "orderedList"
  | "unorderedList"
  | "save";

function execCommand(command: Command) {
  switch (command) {
    case "heading1":
      document.execCommand("formatBlock", false, "h1");
      break;
    case "heading2":
      document.execCommand("formatBlock", false, "h2");
      break;
    case "heading3":
      document.execCommand("formatBlock", false, "h3");
      break;
    case "paragraph":
      document.execCommand("formatBlock", false, "p");
      break;
    case "save":
      console.log("Saving content...");
      const editor = document.querySelector<HTMLElement>(
        `[data-editor-target="editor"]`
      );
      if (!editor) {
        throw new Error(`[data-editor-target="editor"] not found`);
      }
      const content = editor.innerHTML;
      window.sessionStorage.setItem("__RTE_CONTENT__", content);
      break;
    default:
      document.execCommand(command, false);
  }
}

export function setupRichTextEditor(root: HTMLElement) {
  const editor = root.querySelector<HTMLElement>(
    `[data-editor-target="editor"]`
  );
  if (!editor) {
    throw new Error(`[data-editor-target="editor"] not found`);
  }

  const content = window.sessionStorage.getItem("__RTE_CONTENT__");
  if (content) {
    editor.innerHTML = content;
  }

  const buttons = root.querySelectorAll<HTMLButtonElement>(
    `[data-editor-command]`
  );
  for (const button of buttons) {
    button.addEventListener("click", () => {
      const command = button.getAttribute("data-editor-command")!;
      execCommand(command as Command);
    });
  }

  editor.contentEditable = "true";
}
