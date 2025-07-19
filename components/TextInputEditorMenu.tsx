import { Editor, useEditorState } from "@tiptap/react";

function TextInputEditorMenu({ editor }: { editor: Editor }) {
  // Read the current editor's state, and re-render the component when it changes
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold"),
        canBold: ctx.editor.can().chain().focus().toggleBold().run(),
        isItalic: ctx.editor.isActive("italic"),
        canItalic: ctx.editor.can().chain().focus().toggleItalic().run(),
        isStrike: ctx.editor.isActive("strike"),
        canStrike: ctx.editor.can().chain().focus().toggleStrike().run(),
        isCode: ctx.editor.isActive("code"),
        canCode: ctx.editor.can().chain().focus().toggleCode().run(),
        canClearMarks: ctx.editor.can().chain().focus().unsetAllMarks().run(),
        isParagraph: ctx.editor.isActive("paragraph"),
        isHeading1: ctx.editor.isActive("heading", { level: 1 }),
        isHeading2: ctx.editor.isActive("heading", { level: 2 }),
        isHeading3: ctx.editor.isActive("heading", { level: 3 }),
        isHeading4: ctx.editor.isActive("heading", { level: 4 }),
        isHeading5: ctx.editor.isActive("heading", { level: 5 }),
        isHeading6: ctx.editor.isActive("heading", { level: 6 }),
        isBulletList: ctx.editor.isActive("bulletList"),
        isOrderedList: ctx.editor.isActive("orderedList"),
        isCodeBlock: ctx.editor.isActive("codeBlock"),
        isBlockquote: ctx.editor.isActive("blockquote"),
        canUndo: ctx.editor.can().chain().focus().undo().run(),
        canRedo: ctx.editor.can().chain().focus().redo().run(),
      };
    },
  });

  return (
    <div className="p-4 space-y-2">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className={`px-3 py-1 rounded border text-sm ${
            editorState.isBold
              ? "bg-blue-800 text-white"
              : "bg-white text-gray-800"
          }`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className={`px-3 py-1 rounded border text-sm ${
            editorState.isItalic
              ? "bg-blue-800 text-white"
              : "bg-white text-gray-800"
          }`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          className={`px-3 py-1 rounded border text-sm ${
            editorState.isStrike
              ? "bg-blue-800 text-white"
              : "bg-white text-gray-800"
          }`}
        >
          Strike
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`px-3 py-1 rounded border text-sm ${
            editorState.isParagraph
              ? "bg-blue-800 text-white"
              : "bg-white text-gray-800"
          }`}
        >
          Paragraph
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`px-3 py-1 rounded border text-sm ${
            editorState.isHeading1
              ? "bg-blue-800 text-white"
              : "bg-white text-gray-800"
          }`}
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`px-3 py-1 rounded border text-sm ${
            editorState.isHeading2
              ? "bg-blue-800 text-white"
              : "bg-white text-gray-800"
          }`}
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`px-3 py-1 rounded border text-sm ${
            editorState.isHeading3
              ? "bg-blue-800 text-white"
              : "bg-white text-gray-800"
          }`}
        >
          H3
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={`px-3 py-1 rounded border text-sm ${
            editorState.isHeading4
              ? "bg-blue-800 text-white"
              : "bg-white text-gray-800"
          }`}
        >
          H4
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={`px-3 py-1 rounded border text-sm ${
            editorState.isHeading5
              ? "bg-blue-800 text-white"
              : "bg-white text-gray-800"
          }`}
        >
          H5
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={`px-3 py-1 rounded border text-sm ${
            editorState.isHeading6
              ? "bg-blue-800 text-white"
              : "bg-white text-gray-800"
          }`}
        >
          H6
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 rounded border text-sm ${
            editorState.isBulletList
              ? "bg-blue-800 text-white"
              : "bg-white text-gray-800"
          }`}
        >
          Bullet list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 rounded border text-sm ${
            editorState.isOrderedList
              ? "bg-blue-800 text-white"
              : "bg-white text-gray-800"
          }`}
        >
          Ordered list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-1 rounded border text-sm ${
            editorState.isBlockquote
              ? "bg-blue-800 text-white"
              : "bg-white text-gray-800"
          }`}
        >
          Blockquote
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="px-3 py-1 rounded border text-sm"
        >
          Horizontal rule
        </button>
        <button
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className="px-3 py-1 rounded border text-sm"
        >
          Hard break
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
          className={`px-3 py-1 rounded border text-sm ${
            !editorState.canUndo
              ? "bg-gray-200 text-gray-400"
              : "bg-white text-gray-800"
          }`}
        >
          Undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
          className={`px-3 py-1 rounded border text-sm ${
            !editorState.canRedo
              ? "bg-gray-200 text-gray-400"
              : "bg-white text-gray-800"
          }`}
        >
          Redo
        </button>
      </div>
    </div>
  );
}
export default TextInputEditorMenu;
