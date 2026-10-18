import type { ReactNode } from "react";

export function PageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-[50vh] bg-surface">
      <div className="bg-forest px-4 py-10 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-4xl">{title}</h1>
          {subtitle && (
            <p className="mt-2 text-sm text-white/80 sm:text-base">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-4 py-10">{children}</div>
    </div>
  );
}
