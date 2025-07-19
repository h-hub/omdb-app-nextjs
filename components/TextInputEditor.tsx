import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextInputEditorMenu from "./TextInputEditorMenu";
import styles from "@/css/EditorContent.module.css";

const extensions = [StarterKit];

type Props = {
  initContent: string;
};

const TextInputEditor = ({ initContent }: Props) => {
  const content = initContent;
  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class: `${styles.EditorContent} prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none bg-white border-t border-l border-gray-100 min-h-[200px] p-5 shadow-lg`,
      },
    },
    immediatelyRender: false,
  });

  return (
    <>
      {editor && <TextInputEditorMenu editor={editor}></TextInputEditorMenu>}
      <EditorContent editor={editor} />
    </>
  );
};

export default TextInputEditor;
