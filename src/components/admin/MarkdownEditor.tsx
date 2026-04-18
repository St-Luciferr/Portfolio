'use client';

import { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import {
  Bold,
  Italic,
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Eye,
  EyeOff,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

type Wrap = { before: string; after?: string; placeholder?: string; block?: boolean };

export function MarkdownEditor({
  value,
  onChange,
  placeholder = '# Start writing…',
  rows = 18,
}: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showPreview, setShowPreview] = useState(true);

  const applyWrap = (wrap: Wrap) => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.slice(start, end) || wrap.placeholder || '';
    const before = wrap.before;
    const after = wrap.after ?? wrap.before;
    const insert = `${before}${selected}${after}`;
    const next =
      value.slice(0, start) +
      (wrap.block && start > 0 && value[start - 1] !== '\n' ? '\n' : '') +
      insert +
      value.slice(end);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      const cursor = start + before.length + selected.length;
      el.setSelectionRange(cursor, cursor);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const el = e.currentTarget;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const next = value.slice(0, start) + '  ' + value.slice(end);
      onChange(next);
      requestAnimationFrame(() => {
        el.setSelectionRange(start + 2, start + 2);
      });
    }
  };

  const toolbarButton = (
    icon: React.ReactNode,
    label: string,
    wrap: Wrap
  ) => (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={() => applyWrap(wrap)}
      title={label}
      className="h-8 w-8 p-0"
    >
      {icon}
    </Button>
  );

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      <div className="flex items-center gap-1 px-2 py-1.5 border-b bg-gray-50">
        {toolbarButton(<Heading2 className="w-4 h-4" />, 'Heading 2', {
          before: '\n## ',
          after: '',
          placeholder: 'Heading',
          block: true,
        })}
        {toolbarButton(<Heading3 className="w-4 h-4" />, 'Heading 3', {
          before: '\n### ',
          after: '',
          placeholder: 'Heading',
          block: true,
        })}
        <span className="w-px h-5 bg-gray-300 mx-1" />
        {toolbarButton(<Bold className="w-4 h-4" />, 'Bold', {
          before: '**',
          placeholder: 'bold text',
        })}
        {toolbarButton(<Italic className="w-4 h-4" />, 'Italic', {
          before: '_',
          placeholder: 'italic text',
        })}
        {toolbarButton(<Code className="w-4 h-4" />, 'Inline code', {
          before: '`',
          placeholder: 'code',
        })}
        <span className="w-px h-5 bg-gray-300 mx-1" />
        {toolbarButton(<LinkIcon className="w-4 h-4" />, 'Link', {
          before: '[',
          after: '](https://)',
          placeholder: 'link text',
        })}
        {toolbarButton(<ImageIcon className="w-4 h-4" />, 'Image', {
          before: '![',
          after: '](https://)',
          placeholder: 'alt text',
        })}
        <span className="w-px h-5 bg-gray-300 mx-1" />
        {toolbarButton(<List className="w-4 h-4" />, 'Bullet list', {
          before: '\n- ',
          after: '',
          placeholder: 'item',
          block: true,
        })}
        {toolbarButton(<ListOrdered className="w-4 h-4" />, 'Numbered list', {
          before: '\n1. ',
          after: '',
          placeholder: 'item',
          block: true,
        })}
        {toolbarButton(<Quote className="w-4 h-4" />, 'Quote', {
          before: '\n> ',
          after: '',
          placeholder: 'quote',
          block: true,
        })}
        {toolbarButton(<Code className="w-4 h-4" />, 'Code block', {
          before: '\n```ts\n',
          after: '\n```\n',
          placeholder: '// code',
          block: true,
        })}
        <div className="ml-auto">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowPreview((v) => !v)}
            className="h-8 text-xs"
          >
            {showPreview ? (
              <>
                <EyeOff className="w-4 h-4 mr-1" /> Hide preview
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-1" /> Show preview
              </>
            )}
          </Button>
        </div>
      </div>

      <div className={cn('grid', showPreview ? 'md:grid-cols-2' : 'grid-cols-1')}>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={rows}
          spellCheck
          className="w-full px-4 py-3 font-mono text-sm bg-white focus:outline-none resize-y border-r border-gray-200 leading-relaxed"
        />
        {showPreview && (
          <div className="prose prose-sm max-w-none px-4 py-3 bg-gray-50 overflow-auto">
            {value.trim() ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
            ) : (
              <p className="text-gray-400 italic">Preview will appear here…</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
