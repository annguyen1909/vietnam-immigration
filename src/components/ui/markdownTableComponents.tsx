import type { Components } from 'react-markdown';

/** Shared GFM table styling for blog and FAQ markdown. */
export const markdownTableComponents: Partial<Components> = {
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-lg border-2 border-gray-200 shadow-sm">
      <table className="min-w-full border-collapse text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-brand-primary text-white">{children}</thead>,
  tbody: ({ children }) => <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>,
  tr: ({ children }) => (
    <tr className="even:bg-gray-50/80 hover:bg-brand-surface/50 transition-colors">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 font-semibold text-white align-top">{children}</th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-gray-700 align-top leading-relaxed">{children}</td>
  ),
};
