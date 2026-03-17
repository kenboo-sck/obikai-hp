"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { useEffect } from 'react';

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  onImageUpload?: () => void;
}

export default function TiptapEditor({ content, onChange, onImageUpload }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: content,
    immediatelyRender: false, 
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[400px] p-4',
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return <div className="h-[400px] bg-gray-50 animate-pulse rounded-xl" />;
  }

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      {/* ツールバー */}
      <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b border-gray-200">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded text-sm font-bold ${editor.isActive('bold') ? 'bg-emerald-600 text-white' : 'bg-white hover:bg-gray-100'}`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded text-sm italic ${editor.isActive('italic') ? 'bg-emerald-600 text-white' : 'bg-white hover:bg-gray-100'}`}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-3 py-1 rounded text-sm line-through ${editor.isActive('strike') ? 'bg-emerald-600 text-white' : 'bg-white hover:bg-gray-100'}`}
        >
          S
        </button>
        <div className="w-px bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1 rounded text-sm font-bold ${editor.isActive('heading', { level: 2 }) ? 'bg-emerald-600 text-white' : 'bg-white hover:bg-gray-100'}`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-1 rounded text-sm font-bold ${editor.isActive('heading', { level: 3 }) ? 'bg-emerald-600 text-white' : 'bg-white hover:bg-gray-100'}`}
        >
          H3
        </button>
        <div className="w-px bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 rounded text-sm ${editor.isActive('bulletList') ? 'bg-emerald-600 text-white' : 'bg-white hover:bg-gray-100'}`}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 rounded text-sm ${editor.isActive('orderedList') ? 'bg-emerald-600 text-white' : 'bg-white hover:bg-gray-100'}`}
        >
          1. List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-1 rounded text-sm ${editor.isActive('blockquote') ? 'bg-emerald-600 text-white' : 'bg-white hover:bg-gray-100'}`}
        >
          " Quote
        </button>
        <div className="w-px bg-gray-300 mx-1" />
        {onImageUpload && (
          <button
            type="button"
            onClick={onImageUpload}
            className="px-3 py-1 rounded text-sm bg-white hover:bg-gray-100"
          >
            🖼️ Image
          </button>
        )}
      </div>

      {/* エディタ本体 */}
      <EditorContent editor={editor} />
    </div>
  );
}