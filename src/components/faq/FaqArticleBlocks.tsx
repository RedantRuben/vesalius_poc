import { sanitizeRichTextHtml } from '@/lib/faq/html';

interface FaqArticleBlocksProps {
  body: string;
}

export default function FaqArticleBlocks({ body }: FaqArticleBlocksProps) {
  return (
    <div
      className={[
        'faq-article-content text-slate-700',
        '[&_blockquote]:border-l-4 [&_blockquote]:border-[#06ACC1] [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-slate-600',
        '[&_figcaption]:mt-3 [&_figcaption]:text-sm [&_figcaption]:text-slate-500',
        '[&_figure]:my-8 [&_figure]:overflow-hidden [&_figure]:rounded-[28px] [&_figure]:border [&_figure]:border-slate-200 [&_figure]:bg-white',
        '[&_h1]:mt-10 [&_h1]:text-4xl [&_h1]:font-semibold [&_h1]:tracking-tight [&_h1]:text-[#0B1B3D]',
        '[&_h2]:mt-10 [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-[#0B1B3D]',
        '[&_h3]:mt-8 [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:text-[#0B1B3D]',
        '[&_img]:h-auto [&_img]:w-full [&_img]:object-cover',
        '[&_li]:leading-8',
        '[&_ol]:my-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6',
        '[&_p]:my-5 [&_p]:text-lg [&_p]:leading-8',
        '[&_strong]:font-semibold [&_strong]:text-[#0B1B3D]',
        '[&_ul]:my-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6',
      ].join(' ')}
      dangerouslySetInnerHTML={{ __html: sanitizeRichTextHtml(body) }}
    />
  );
}
