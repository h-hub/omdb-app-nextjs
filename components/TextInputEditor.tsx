import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextInputEditorMenu from "./TextInputEditorMenu";
import styles from "@/css/EditorContent.module.css";
import { useEffect, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const extensions = [StarterKit];

type Props = {
  initContent?: string;
  onUpdate?: (props: { editor: Editor }) => void;
  saveJournal: (editor: Editor) => Promise<void>;
  isSaveBtn?: boolean;
};

const TextInputEditor = ({
  initContent,
  onUpdate,
  saveJournal,
  isSaveBtn,
}: Props) => {
  const [editorReady, setEditorReady] = useState(false);

  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class: `${styles.EditorContent} prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none bg-white border-t border-l border-gray-100 min-h-[200px] p-5 shadow-lg`,
      },
    },
    immediatelyRender: false,
    content: initContent,
    onCreate: ({ editor }) => {
      const html = editor.getHTML();
      if (html !== "<p></p>") {
        setEditorReady(true);
      } else {
        setEditorReady(false);
      }
    },
    onUpdate: onUpdate,
  });

  const handleOverlayClick = () => {
    setEditorReady(true);
    editor?.commands.focus("end");
  };

  // Update editor content when initContent changes
  useEffect(() => {
    if (editor && initContent && initContent !== editor.getHTML()) {
      editor.commands.setContent(initContent);
      if (initContent !== "<p></p>" && initContent.trim() !== "") {
        setEditorReady(true);
      }
    }
  }, [editor, initContent]);

  return (
    <div className="relative w-full mx-auto">
      <div className="relative rounded-md min-h-[200px]">
        {editor && <TextInputEditorMenu editor={editor}></TextInputEditorMenu>}
        <EditorContent editor={editor} />
        {!editorReady && (
          <div
            className="absolute inset-0 bg-gray-300/50 backdrop-blur-sm flex items-center justify-center text-gray-700 font-medium text-lg cursor-pointer z-10"
            onClick={handleOverlayClick}
          >
            <div className="flex flex-col items-center justify-center p-8 max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                ✨ Click here to start journaling
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                This is your cozy little corner to capture all your thoughts,
                feelings, and favorite moments from the movies you watch.
                Whether it made you laugh, cry, think deeply, or just gave you a
                good time — jot it all down here!
              </p>
            </div>
          </div>
        )}
      </div>
      {editor && isSaveBtn && (
        <div className="flex flex-wrap gap-2 justify-end">
          <button
            className="px-4 py-2 text-sm right-0 bg-gray-300 rounded-md hover:bg-gray-400 hover:cursor-pointer"
            title="Save"
            onClick={() => saveJournal(editor)}
          >
            <FaPaperPlane></FaPaperPlane>
          </button>
        </div>
      )}
    </div>
  );
};

export default TextInputEditor;
