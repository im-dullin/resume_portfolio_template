"use client";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "outline";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const styles: Record<string, React.CSSProperties> = {
    default: {
      background: "var(--bg-glass)",
      color: "var(--text-secondary)",
      border: "1px solid var(--bg-glass-border)",
    },
    accent: {
      background: "rgba(255, 255, 255, 0.04)",
      color: "var(--text-secondary)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
    },
    outline: {
      background: "var(--moss-glow)",
      color: "var(--moss-light)",
      border: "1px solid var(--moss-border)",
    },
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${className}`}
      style={styles[variant]}
    >
      {children}
    </span>
  );
}
