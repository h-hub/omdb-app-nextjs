import { useEditor, EditorContent, createNodeFromContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextInputEditorMenu from "./TextInputEditorMenu";
import styles from "@/css/EditorContent.module.css";
import { useRef, useState } from "react";

const extensions = [StarterKit];

type Props = {
  initContent: string;
  onUpdate? : () => {};
  autoSave?: boolean;
  identifier: string;
};

function tryParseToTiptapJSON(content: string, editor: Editor) {

  try {
    const nodeOrFragment = createNodeFromContent(content, editor.schema, {
      parseOptions: {
        preserveWhitespace: false,
      },
    })

    return nodeOrFragment.toJSON()
  } catch (e) {
    return null
  }
}

const TextInputEditor = ({ initContent, onUpdate, autoSave, identifier }: Props) => {
  const content = initContent;
  const hasStartedSaving = useRef(false)
  const [editorReady, setEditorReady] = useState(false)
  const initialHtmlRef = useRef<string | null>(null)
  
  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class: `${styles.EditorContent} prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none bg-white border-t border-l border-gray-100 min-h-[200px] p-5 shadow-lg`,
      },
    },
    immediatelyRender: false,
    content:
      typeof window !== 'undefined'
        ? localStorage.getItem(identifier) || initContent
        : initContent,
    // onCreate: ({ editor }) => {
    //   initialHtmlRef.current = editor.getHTML()
    //   setEditorReady(true)
    // },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      const editorJson = editor.getJSON()
      const originaljson = tryParseToTiptapJSON(content,editor)
      if (
        editorJson==originaljson
      ) {
        hasStartedSaving.current = true
      }
      if (hasStartedSaving.current) {
        localStorage.setItem(identifier, html)
      }
    },
  });

  return (
    <>
      {editor && <TextInputEditorMenu editor={editor}></TextInputEditorMenu>}
      <EditorContent editor={editor} />
    </>
  );
};

export default TextInputEditor;
