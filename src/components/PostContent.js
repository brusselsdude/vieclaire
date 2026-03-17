'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';

const MermaidChart = dynamic(() => import('./MermaidChart'), { ssr: false });

// Splits HTML content on __MERMAID_BLOCK_N__ placeholders
// and interleaves rendered MermaidChart components
export default function PostContent({ post }) {
  const mermaidBlocks = post.mermaidBlocks || [];
  const content = post.content || post.html || '';

  // Check if content uses mermaid placeholders
  const hasMermaid = mermaidBlocks.length > 0 && content.includes('__MERMAID_BLOCK_');

  const segments = useMemo(() => {
    if (!hasMermaid) {
      return [{ type: 'html', value: content }];
    }

    // Split on __MERMAID_BLOCK_N__ markers
    const parts = [];
    let remaining = content;
    let diagramIndex = 0;

    while (diagramIndex < mermaidBlocks.length) {
      const marker = `__MERMAID_BLOCK_${diagramIndex}__`;
      const pos = remaining.indexOf(marker);
      if (pos === -1) {
        diagramIndex++;
        continue;
      }
      // HTML before the marker
      if (pos > 0) {
        parts.push({ type: 'html', value: remaining.slice(0, pos) });
      }
      // The mermaid diagram
      parts.push({ type: 'mermaid', index: diagramIndex, code: mermaidBlocks[diagramIndex] });
      remaining = remaining.slice(pos + marker.length);
      diagramIndex++;
    }

    // Any remaining HTML after last marker
    if (remaining.trim()) {
      parts.push({ type: 'html', value: remaining });
    }

    return parts;
  }, [content, mermaidBlocks, hasMermaid]);

  // Fallback: if no placeholders, inject diagrams evenly through content
  const fallbackSegments = useMemo(() => {
    if (hasMermaid) return null;
    if (mermaidBlocks.length === 0) return null;

    const htmlParts = content.split('</h2>');
    const result = [];
    let diagramIdx = 0;
    const step = Math.max(1, Math.floor(htmlParts.length / (mermaidBlocks.length + 1)));

    htmlParts.forEach((part, i) => {
      result.push({ type: 'html', value: i < htmlParts.length - 1 ? part + '</h2>' : part });
      if ((i + 1) % step === 0 && diagramIdx < mermaidBlocks.length) {
        result.push({ type: 'mermaid', index: diagramIdx, code: mermaidBlocks[diagramIdx] });
        diagramIdx++;
      }
    });

    // Any remaining diagrams at end
    while (diagramIdx < mermaidBlocks.length) {
      result.push({ type: 'mermaid', index: diagramIdx, code: mermaidBlocks[diagramIdx] });
      diagramIdx++;
    }

    return result;
  }, [content, mermaidBlocks, hasMermaid]);

  const finalSegments = (hasMermaid ? segments : fallbackSegments) || [{ type: 'html', value: content }];

  return (
    <article className="blog-content">
      {finalSegments.map((seg, i) =>
        seg.type === 'html' ? (
          <div key={i} dangerouslySetInnerHTML={{ __html: seg.value }} />
        ) : (
          <MermaidChart key={i} code={seg.code} index={seg.index} />
        )
      )}
    </article>
  );
}
