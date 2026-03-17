'use client';

import { useEffect, useRef, useState } from 'react';

// ─── Mermaid loader ────────────────────────────────────────────────────────────
let mermaidLoaded = false;
let mermaidLoading = null;

function loadMermaid() {
  if (mermaidLoaded) return Promise.resolve(window.mermaid);
  if (mermaidLoading) return mermaidLoading;

  mermaidLoading = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
    script.onload = () => {
      window.mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        themeVariables: {
          primaryColor: '#dcfce7',
          primaryTextColor: '#0a1929',
          primaryBorderColor: '#22c55e',
          lineColor: '#486581',
          secondaryColor: '#f0f4f8',
          tertiaryColor: '#fff8f0',
          background: '#ffffff',
          mainBkg: '#f0fdf4',
          nodeBorder: '#16a34a',
          clusterBkg: '#f0f4f8',
          titleColor: '#0a1929',
          edgeLabelBackground: '#ffffff',
          fontFamily: '"Source Sans 3", system-ui, sans-serif',
          fontSize: '14px',
        },
        flowchart: { curve: 'basis', padding: 16 },
        sequence: { diagramMarginX: 20, diagramMarginY: 10 },
      });
      mermaidLoaded = true;
      resolve(window.mermaid);
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });

  return mermaidLoading;
}

let chartId = 0;

// ─── Caption extractor ─────────────────────────────────────────────────────────
// Priority: 1) explicit `title "..."` in code  2) first-node label  3) type-based fallback
function extractCaption(code) {
  if (!code) return null;
  const lines = code.trim().split('\n');
  const firstLine = lines[0].trim().toLowerCase();

  // 1. Explicit title in the diagram code
  //    Patterns: `title "Some Title"`, `title Some Title`, or `pie title ...` on same line
  for (const line of lines.slice(0, 6)) {
    // Inline: "pie title Budget" or "xychart-beta title ..."  
    const inlineM = line.match(/^(?:pie|xychart[\w-]*)\s+title\s+"?([^"]+)"?\s*$/i);
    if (inlineM) return inlineM[1].trim();
    // Standalone title line
    const standaloneM = line.match(/^\s*title\s+"?([^"\n]+)"?\s*$/i);
    if (standaloneM) return standaloneM[1].trim();
  }

  // 2. sequenceDiagram: look for first participant description
  if (firstLine === 'sequencediagram') {
    const actors = lines
      .slice(1, 8)
      .map((l) => { const m = l.match(/participant\s+\w+\s+as\s+(.+)/i); return m ? m[1].trim() : null; })
      .filter(Boolean);
    // Use context from node interactions instead
    const noteMatch = lines.slice(1, 12).find((l) => l.match(/Note|alt|loop/i));
    if (actors.length >= 2) return `${actors[0]} ↔ ${actors[1]} Flow`;
  }

  // 3. flowchart / graph: extract label from first meaningful node
  if (firstLine.startsWith('flowchart') || firstLine.startsWith('graph')) {
    for (const line of lines.slice(1, 8)) {
      // Match A["text"] A[text] A("text") A{text}
      const m = line.match(/^\s*\w+[\[({]+"?([^"}\]){]+)"?[\])}]/);
      if (m) {
        const label = m[1].trim().replace(/<br\/?>/gi, ' — ');
        if (label.length > 6 && label.length < 80) return label;
      }
    }
  }

  // 4. Type-based fallback with diagram index handled by caller
  if (firstLine.startsWith('xychart')) return 'Chart';
  if (firstLine.startsWith('timeline')) return 'Timeline';
  if (firstLine.startsWith('pie')) return 'Pie Chart';
  if (firstLine.startsWith('quadrant')) return 'Quadrant Chart';
  if (firstLine === 'sequencediagram') return 'Process Flow';
  if (firstLine.startsWith('flowchart') || firstLine.startsWith('graph')) return 'Diagram';
  if (firstLine === 'mindmap') {
    // Extract root label from mindmap: root((Label)) or root[Label]
    for (const line of lines.slice(1, 5)) {
      const mm = line.match(/root[({[]+(.+?)[)}\]]+/);
      if (mm) return mm[1].trim();
    }
    return 'Concept Map';
  }
  return 'Diagram';
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function MermaidChart({ code, index = 0 }) {
  const containerRef = useRef(null);
  const [status, setStatus] = useState('loading');
  const idRef = useRef(`mermaid-chart-${++chartId}`);

  useEffect(() => {
    if (!code || !containerRef.current) return;
    let cancelled = false;
    setStatus('loading');

    loadMermaid()
      .then(async (mermaid) => {
        if (cancelled) return;
        try {
          const { svg } = await mermaid.render(idRef.current, code);
          if (cancelled) return;
          if (containerRef.current) {
            containerRef.current.innerHTML = svg;
            const svgEl = containerRef.current.querySelector('svg');
            if (svgEl) {
              svgEl.style.maxWidth = '100%';
              svgEl.style.height = 'auto';
              svgEl.removeAttribute('width');
            }
            setStatus('success');
          }
        } catch {
          if (!cancelled) setStatus('error');
        }
      })
      .catch(() => { if (!cancelled) setStatus('error'); });

    return () => { cancelled = true; };
  }, [code]);

  const caption = extractCaption(code);

  return (
    <figure className="my-10 not-prose">
      {status === 'loading' && (
        <div className="flex items-center justify-center h-32 bg-green-50 border border-green-100 rounded-2xl">
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Rendering diagram…
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="bg-gold-50 border border-gold-200 rounded-2xl p-4 text-sm text-navy-500 italic">
          📊 Diagram could not render — please view with an internet connection.
        </div>
      )}

      <div
        ref={containerRef}
        className={`flex justify-center overflow-x-auto ${status !== 'success' ? 'hidden' : ''}`}
      />

      {status === 'success' && caption && (
        <figcaption className="text-center text-xs text-navy-400 mt-3 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
