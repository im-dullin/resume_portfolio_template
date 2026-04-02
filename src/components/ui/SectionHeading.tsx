"use client";

import TextReveal from "./TextReveal";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
}

export default function SectionHeading({
  label,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mb-16 text-center">
      <span
        className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.3em]"
        style={{ color: "var(--moss-light)" }}
      >
        {label}
      </span>
      <h2 className="mb-4 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
        <TextReveal text={title} />
      </h2>
      {description && (
        <p
          className="mx-auto max-w-2xl text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
