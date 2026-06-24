import React, { useEffect, useState } from 'react';

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

// Reads <h2> headings straight out of the rendered content inside
// `containerRef`, so any blog page that hands in a content ref gets a
// working TOC without hardcoding headings.
const TableOfContents = ({ containerRef, watch, title = 'Table of Contents' }) => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const nodes = Array.from(container.querySelectorAll('h2'));
    const usedIds = new Set();

    const items = nodes.map((node, index) => {
      let id = node.id;
      if (!id) {
        const base = slugify(node.textContent) || `section-${index}`;
        id = base;
        let suffix = 1;
        while (usedIds.has(id)) {
          id = `${base}-${suffix++}`;
        }
        node.id = id;
      }
      usedIds.add(id);
      return { id, text: node.textContent };
    });

    setHeadings(items);
  }, [containerRef, watch]);

  useEffect(() => {
    if (headings.length === 0) return;

    const visibility = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(entry.target.id, entry.isIntersecting);
        });

        const topVisible = headings.find((heading) => visibility.get(heading.id));
        if (topVisible) {
          setActiveId(topVisible.id);
        }
      },
      { rootMargin: '-100px 0px -70% 0px', threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    const offset = 96;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({ top, behavior: 'smooth' });
    window.history.replaceState(null, '', `#${id}`);
    setActiveId(id);
  };

  if (headings.length === 0) return null;

  return (
    <aside className="hidden lg:block w-[360px] shrink-0">
      <div className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pr-1">
        <p className="text-[13px] font-semibold uppercase tracking-wide text-[#A0A0A0] mb-3">
          {title}
        </p>
        <ul className="border-l border-[#E9E9E9]">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                title={heading.text}
                className={`block -ml-px border-l-2 py-1 pl-4 text-[14px] leading-snug line-clamp-2 transition-colors duration-150 ${
                  activeId === heading.id
                    ? 'border-black font-semibold text-[#1F1F1F]'
                    : 'border-transparent text-[#696C70] hover:border-[#D2EF9A] hover:text-[#1F1F1F]'
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default TableOfContents;
