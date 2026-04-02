import Image from "next/image";

function Callout({
  children,
  type = "info",
}: {
  children: React.ReactNode;
  type?: "info" | "warning" | "tip";
}) {
  const colors = {
    info: { bg: "rgba(99, 102, 241, 0.1)", border: "var(--accent)" },
    warning: { bg: "rgba(245, 158, 11, 0.1)", border: "#f59e0b" },
    tip: { bg: "rgba(34, 197, 94, 0.1)", border: "#22c55e" },
  };

  return (
    <div
      className="my-6 rounded-lg border-l-4 p-4"
      style={{
        background: colors[type].bg,
        borderColor: colors[type].border,
      }}
    >
      {children}
    </div>
  );
}

function LivePreview({ url, title }: { url: string; title?: string }) {
  return (
    <figure className="my-8">
      <div
        className="relative overflow-hidden rounded-xl"
        style={{ border: "1px solid var(--overlay-8)" }}
      >
        <div
          className="flex items-center gap-2 px-4 py-2.5"
          style={{ background: "var(--overlay-4)", borderBottom: "1px solid var(--overlay-8)" }}
        >
          <div className="flex gap-1.5">
            <span className="block h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
            <span className="block h-3 w-3 rounded-full" style={{ background: "#febc2e" }} />
            <span className="block h-3 w-3 rounded-full" style={{ background: "#28c840" }} />
          </div>
          <span
            className="ml-2 flex-1 truncate text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            {url}
          </span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs transition-colors hover:underline"
            style={{ color: "var(--accent)" }}
          >
            새 탭에서 열기 ↗
          </a>
        </div>
        <iframe
          src={url}
          title={title || url}
          className="w-full"
          style={{ height: 600, border: "none", background: "#fff" }}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
      {title && (
        <figcaption
          className="mt-2 text-center text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          {title}
        </figcaption>
      )}
    </figure>
  );
}

function ImageZoom({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="my-8">
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={src}
          alt={alt || ""}
          width={800}
          height={450}
          className="w-full"
        />
      </div>
      {alt && (
        <figcaption
          className="mt-2 text-center text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          {alt}
        </figcaption>
      )}
    </figure>
  );
}

export const mdxComponents = {
  Callout,
  ImageZoom,
  LivePreview,
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="mb-6 mt-10 text-3xl font-bold" style={{ color: "var(--text-primary)" }} {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mb-4 mt-10 pt-6 text-2xl font-semibold" style={{ color: "var(--text-primary)", borderTop: "1px solid var(--overlay-6)" }} {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mb-3 mt-8 text-xl font-semibold" style={{ color: "var(--text-primary)" }} {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 leading-[1.8]" style={{ color: "var(--text-secondary)" }} {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-4 ml-6 list-disc space-y-2" style={{ color: "var(--text-secondary)" }} {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2" style={{ color: "var(--text-secondary)" }} {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 rounded-r-lg border-l-[3px] py-4 pr-5 pl-5 italic"
      style={{ borderColor: "var(--overlay-20)", background: "var(--overlay-2)", color: "var(--text-secondary)" }}
      {...props}
    />
  ),
  hr: () => (
    <hr
      className="my-10"
      style={{ border: "none", height: 1, background: "var(--overlay-8)" }}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold" style={{ color: "var(--text-primary)" }} {...props} />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto rounded-lg" style={{ border: "1px solid var(--overlay-8)" }}>
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-primary)", borderBottom: "2px solid var(--overlay-12)", background: "var(--overlay-2)" }} {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-3" style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--overlay-6)" }} {...props} />
  ),
};
