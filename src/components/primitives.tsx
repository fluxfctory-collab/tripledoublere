import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

/** Small right-pointing arrow used across buttons and text links. */
export function Arrow({ size = 13 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M1 7h11.5M8 2.5 12.5 7 8 11.5" />
    </svg>
  );
}

/**
 * Responsive <picture> for the pre-processed assets in /img.
 * Each asset is emitted as `${name}-${width}.{webp,jpg}` by build-images.py.
 */
export function Img({
  name,
  widths,
  sizes,
  alt,
  className,
  loading = "lazy",
  fetchPriority,
}: {
  name: string;
  widths: number[];
  sizes: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
}) {
  const srcset = (ext: string) =>
    widths.map((w) => `/img/${name}-${w}.${ext} ${w}w`).join(", ");

  return (
    <picture>
      <source type="image/webp" srcSet={srcset("webp")} sizes={sizes} />
      <img
        src={`/img/${name}-${widths[0]}.jpg`}
        srcSet={srcset("jpg")}
        sizes={sizes}
        alt={alt}
        className={className}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
      />
    </picture>
  );
}

/**
 * Fades content up once as it enters the viewport. Reduced-motion users get the
 * finished state immediately (the CSS neutralises the transform and transition).
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
  ...rest
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLElement>(null);
  // Users who ask for reduced motion (or lack IntersectionObserver) start shown.
  const [shown, setShown] = useState(
    () =>
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "is-in" : ""} ${className}`.trim()}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}
