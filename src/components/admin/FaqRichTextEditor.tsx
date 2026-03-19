'use client';

import { useEffect, useRef } from 'react';

import { sanitizeRichTextHtml } from '@/lib/faq/html';

interface FaqRichTextEditorProps {
  onChange: (nextValue: string) => void;
  onImageUpload: (file: File | null) => Promise<string | null> | string | null;
  uploadLabel: string;
  value: string;
}

function ToolbarButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className="rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-400"
    >
      {children}
    </button>
  );
}

export default function FaqRichTextEditor({
  onChange,
  onImageUpload,
  uploadLabel,
  value,
}: FaqRichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const savedRangeRef = useRef<Range | null>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  function saveSelection() {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return;
    }

    savedRangeRef.current = selection.getRangeAt(0).cloneRange();
  }

  function restoreSelection() {
    const selection = window.getSelection();
    if (!selection || !savedRangeRef.current) {
      return;
    }

    selection.removeAllRanges();
    selection.addRange(savedRangeRef.current);
  }

  function emitChange() {
    if (!editorRef.current) {
      return;
    }

    onChange(sanitizeRichTextHtml(editorRef.current.innerHTML));
  }

  function runCommand(command: string, valueArg?: string) {
    restoreSelection();
    document.execCommand(command, false, valueArg);
    emitChange();
    saveSelection();
    editorRef.current?.focus();
  }

  function setBlock(tagName: 'P' | 'H1' | 'H2' | 'H3' | 'BLOCKQUOTE') {
    runCommand('formatBlock', tagName);
  }

  async function handleFileSelection(file: File | null) {
    restoreSelection();
    const imageUrl = await onImageUpload(file);
    if (imageUrl) {
      document.execCommand(
        'insertHTML',
        false,
        `<figure><img src="${imageUrl}" alt="" /></figure><p><br /></p>`,
      );
      emitChange();
    }
    saveSelection();
    editorRef.current?.focus();
  }

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap gap-2 border-b border-slate-200 p-4">
        <ToolbarButton onClick={() => setBlock('P')}>Paragraph</ToolbarButton>
        <ToolbarButton onClick={() => setBlock('H1')}>H1</ToolbarButton>
        <ToolbarButton onClick={() => setBlock('H2')}>H2</ToolbarButton>
        <ToolbarButton onClick={() => setBlock('H3')}>H3</ToolbarButton>
        <ToolbarButton onClick={() => runCommand('bold')}>Bold</ToolbarButton>
        <ToolbarButton onClick={() => runCommand('italic')}>Italic</ToolbarButton>
        <ToolbarButton onClick={() => runCommand('insertUnorderedList')}>Bullets</ToolbarButton>
        <ToolbarButton onClick={() => runCommand('insertOrderedList')}>Numbers</ToolbarButton>
        <ToolbarButton onClick={() => setBlock('BLOCKQUOTE')}>Quote</ToolbarButton>
        <ToolbarButton onClick={() => runCommand('removeFormat')}>Clear</ToolbarButton>
        <button
          type="button"
          onMouseDown={(event) => {
            event.preventDefault();
            saveSelection();
          }}
          onClick={() => fileInputRef.current?.click()}
          className="rounded-full border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-400"
        >
          {uploadLabel}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          className="hidden"
          onChange={(event) => {
            void handleFileSelection(event.target.files?.[0] ?? null);
            event.target.value = '';
          }}
        />
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={emitChange}
        onBlur={() => {
          saveSelection();
          emitChange();
        }}
        onKeyUp={saveSelection}
        onMouseUp={saveSelection}
        className="faq-editor min-h-[780px] px-6 py-5 outline-none"
      />
    </div>
  );
}
