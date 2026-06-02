'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ListBulletIcon } from '@heroicons/react/24/outline';
import type { MarkdownTocItem } from '@/lib/markdown-headings';

export type TableOfContentsProps = {
  items: MarkdownTocItem[];
  title?: string;
  className?: string;
};

/** Align with scroll-mt-24 (~96px) and SiteHeader; top of the "reading" trigger zone */
const SCROLL_SPY_TRIGGER_PX = 100;
const ROOT_MARGIN = `-${SCROLL_SPY_TRIGGER_PX}px 0px -60% 0px`;

export default function TableOfContents({
  items,
  title = 'On this page',
  className = '',
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);
  const navRef = useRef<HTMLElement>(null);

  const visibleIdsRef = useRef<Set<string>>(new Set());
  const isClickScrollingRef = useRef(false);
  const clickScrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);

  const computeActiveId = useCallback((): string | null => {
    if (items.length === 0) return null;

    const trigger = SCROLL_SPY_TRIGGER_PX;
    const inZone: { id: string; top: number; index: number }[] = [];

    items.forEach((item, index) => {
      if (!visibleIdsRef.current.has(item.id)) return;
      const el = document.getElementById(item.id);
      if (!el) return;
      inZone.push({
        id: item.id,
        top: el.getBoundingClientRect().top,
        index,
      });
    });

    if (inZone.length > 0) {
      inZone.sort((a, b) => a.top - b.top || a.index - b.index);
      return inZone[inZone.length - 1].id;
    }

    let passed = items[0].id;
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= trigger) {
        passed = item.id;
      }
    }
    return passed;
  }, [items]);

  const scheduleActiveUpdate = useCallback(() => {
    if (isClickScrollingRef.current) return;

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const next = computeActiveId();
      setActiveId((prev) => (prev === next ? prev : next));
    });
  }, [computeActiveId]);

  const scrollToHeading = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;

      if (clickScrollTimerRef.current) {
        clearTimeout(clickScrollTimerRef.current);
      }

      isClickScrollingRef.current = true;
      setActiveId(id);

      // scrollIntoView scrolls whichever ancestor is actually scrollable (not just
      // window) and honors the heading's scroll-margin-top (scroll-mt-24).
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (typeof history !== 'undefined') {
        history.replaceState(null, '', `#${id}`);
      }

      clickScrollTimerRef.current = setTimeout(() => {
        isClickScrollingRef.current = false;
        scheduleActiveUpdate();
      }, 600);
    },
    [scheduleActiveUpdate]
  );

  useEffect(() => {
    if (items.length === 0) return;

    visibleIdsRef.current = new Set();
    setActiveId(items[0]?.id ?? null);

    const headingElements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            visibleIdsRef.current.add(id);
          } else {
            visibleIdsRef.current.delete(id);
          }
        });
        scheduleActiveUpdate();
      },
      {
        root: null,
        rootMargin: ROOT_MARGIN,
        threshold: 0,
      }
    );

    headingElements.forEach((el) => observer.observe(el));

    const onScroll = () => scheduleActiveUpdate();
    window.addEventListener('scroll', onScroll, { passive: true });
    scheduleActiveUpdate();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (clickScrollTimerRef.current) clearTimeout(clickScrollTimerRef.current);
    };
  }, [items, scheduleActiveUpdate]);

  if (items.length === 0) return null;

  return (
    <nav
      ref={navRef}
      aria-label="Table of contents"
      className={`rounded-xl border-2 border-brand-primary bg-brand-surface-alt/60 p-5 shadow-md ${className}`}
    >
      <div className="mb-4 flex items-center gap-2 border-b border-brand-border pb-3">
        <ListBulletIcon className="h-5 w-5 shrink-0 text-brand-primary" aria-hidden />
        <h2 className="font-display text-sm font-bold uppercase tracking-wide text-brand-ink">
          {title}
        </h2>
      </div>
      <ol className="space-y-1 text-sm">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                data-toc-id={item.id}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHeading(item.id);
                }}
                className={`block rounded-md px-2 py-1.5 leading-snug transition-colors ${
                  isActive
                    ? 'bg-brand-primary font-semibold text-white shadow-sm'
                    : 'text-brand-muted hover:bg-white/80 hover:text-brand-primary'
                }`}
                aria-current={isActive ? 'location' : undefined}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
