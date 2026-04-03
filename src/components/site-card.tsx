"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { PortalSite } from "@/data/portal-data";

type SiteCardProps = {
  site: PortalSite;
};

const categoryLabelMap: Record<PortalSite["category"], string> = {
  principal: "Principal",
  client: "Client",
  "side-project": "Lab",
};

const statusClassMap: Record<NonNullable<PortalSite["status"]>, string> = {
  live: "border-emerald-300/35 bg-emerald-400/14 text-emerald-100",
  construction: "border-amber-300/35 bg-amber-300/16 text-amber-100",
};

const statusLabelMap: Record<NonNullable<PortalSite["status"]>, string> = {
  live: "En ligne",
  construction: "En construction",
};

export function SiteCard({ site }: SiteCardProps) {
  const status = site.status ?? "live";
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(site.image ?? null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);

  const canPreview = Boolean(site.image || site.href);

  const loadPreviewFromOg = async () => {
    if (!site.href || previewUrl || isLoadingPreview) {
      return;
    }

    setIsLoadingPreview(true);
    setPreviewError(null);

    try {
      const response = await fetch(
        `/api/preview-image?url=${encodeURIComponent(site.href)}`,
      );

      if (!response.ok) {
        throw new Error("network-error");
      }

      const data = (await response.json()) as { imageUrl?: string | null };

      if (data.imageUrl) {
        setPreviewUrl(data.imageUrl);
      } else {
        setPreviewError("Aperçu non disponible");
      }
    } catch {
      setPreviewError("Impossible de charger l'aperçu");
    } finally {
      setIsLoadingPreview(false);
    }
  };

  const handlePreviewToggle = async () => {
    if (!canPreview) {
      return;
    }

    if (!isPreviewOpen) {
      setIsPreviewOpen(true);
      void loadPreviewFromOg();
      return;
    }

    setIsPreviewOpen(false);
  };

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-(--card-border) bg-white/6 p-5 shadow-[0_18px_30px_-28px_rgba(0,0,0,0.8)] transition duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/10">
      <div className="pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full bg-(--accent-2)/20 blur-2xl transition duration-300 group-hover:bg-(--accent)/25" />

      <div className="relative flex h-full flex-col gap-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h3 className="font-display text-2xl leading-tight text-foreground">
            {site.title}
          </h3>

          <span
            className={`rounded-full border px-2.5 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.08em] ${statusClassMap[status]}`}
          >
            {statusLabelMap[status]}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-(--muted)">{site.description}</p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <span className="inline-flex rounded-full border border-white/12 bg-white/7 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white/65">
            {categoryLabelMap[site.category]}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePreviewToggle}
              disabled={!canPreview || isLoadingPreview}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/14 bg-white/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-white/84 transition enabled:hover:border-transparent enabled:hover:bg-(--accent-2) enabled:hover:text-white enabled:hover:shadow-[0_10px_20px_-14px_rgba(15,143,146,0.95)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoadingPreview
                ? "Chargement"
                : isPreviewOpen
                  ? "Masquer l'image"
                  : "Voir l'image"}
            </button>

            {site.href ? (
              <a
                href={site.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-white/84 transition hover:border-transparent hover:bg-(--accent) hover:text-white"
              >
                Ouvrir
                <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/16 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-amber-100">
                Publication prochaine
              </span>
            )}
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isPreviewOpen ? (
            <motion.div
              initial={{ height: 0, opacity: 0, y: 8 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: 8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-2 rounded-xl border border-white/12 bg-black/20 p-2">
                {isLoadingPreview && !previewUrl ? (
                  <div className="space-y-3 rounded-lg border border-white/10 bg-white/4 p-3">
                    <div className="h-36 w-full animate-pulse rounded-md bg-white/10" />
                    <div className="h-3 w-40 animate-pulse rounded bg-white/12" />
                  </div>
                ) : previewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewUrl}
                    alt={`Aperçu du site ${site.title}`}
                    className="h-auto w-full rounded-lg object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-white/14 bg-white/4 text-sm text-white/68">
                    {previewError ?? "Aucune image trouvée pour ce site"}
                  </div>
                )}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </article>
  );
}
