import { AboutCard } from "@/components/about-card";
import { FadeIn } from "@/components/fade-in";
import { PortalLogo } from "@/components/portal-logo";
import { SectionBlock } from "@/components/section-block";
import { SiteCard } from "@/components/site-card";
import { StructuredData } from "@/components/structured-data";
import {
  primarySites,
  professionalProjects,
  sideProjects,
  profile,
  socialLinks,
} from "@/data/portal-data";
import { siteConfig } from "@/data/site-config";

export default function Home() {
  const allSites = [...primarySites, ...professionalProjects, ...sideProjects];
  const sections = [
    {
      title: "Sites principaux",
      subtitle: "Entreprise, portfolio et recueil d'avis",
      count: primarySites.length,
      sites: primarySites,
      delay: 0.1,
    },
    {
      title: "Projets professionnels",
      subtitle: "Sites réalisés dans le cadre du travail",
      count: professionalProjects.length,
      sites: professionalProjects,
      delay: 0.18,
    },
    {
      title: "Side-projects",
      subtitle: "Projets personnels en cours",
      count: sideProjects.length,
      sites: sideProjects,
      delay: 0.26,
    },
  ] as const;

  const liveCount = allSites.filter(
    (site) => (site.status ?? "live") === "live",
  ).length;
  const inProgressCount = allSites.length - liveCount;

  const metrics = [
    { label: "sites", value: allSites.length },
    { label: "en ligne", value: liveCount },
    { label: "en cours", value: inProgressCount },
  ];

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    url: siteConfig.url,
    image: `${siteConfig.url}${profile.photo}`,
    sameAs: socialLinks.map((link) => link.href),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.siteTitle,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "fr-FR",
    author: {
      "@type": "Person",
      name: profile.name,
    },
  };

  return (
    <div className="relative isolate">
      <StructuredData data={personSchema} />
      <StructuredData data={websiteSchema} />

      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-105 bg-[radial-gradient(circle_at_8%_0%,rgba(221,90,47,0.35),transparent_45%),radial-gradient(circle_at_88%_2%,rgba(15,143,146,0.28),transparent_45%)]" />

      <div className="mx-auto w-full max-w-7xl px-4 pb-14 pt-8 sm:px-8 sm:pt-10 lg:px-10 lg:pt-12">
        <main className="grid gap-8 lg:grid-cols-[340px_minmax(0,1fr)] xl:gap-10">
          <FadeIn className="space-y-6 lg:sticky lg:top-8 lg:h-fit" delay={0.05}>
            <section className="relative overflow-hidden rounded-[30px] border border-(--card-border) bg-(--card)/90 p-6 shadow-[0_24px_50px_-36px_rgba(15,23,42,0.95)] sm:p-7">
              <div className="pointer-events-none absolute -right-16 -top-14 h-40 w-40 rounded-full bg-(--accent)/18 blur-2xl" />

              <PortalLogo />

              <h1 className="font-display mt-4 text-4xl leading-[0.94] text-foreground sm:text-5xl">
                Vincent Bichat
                <span className="block text-(--accent)">.bichat.fr</span>
              </h1>

              <p className="mt-4 max-w-[30ch] text-sm leading-relaxed text-(--muted)">
                Développeur web full-stack, je centralise ici mes sites,
                projets clients et side-projects.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-2">
                {metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-xl border border-white/12 bg-white/7 px-3 py-2"
                  >
                    <p className="font-mono text-sm font-semibold text-foreground">
                      {metric.value.toString().padStart(2, "0")}
                    </p>
                    <p className="mt-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white/62">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <AboutCard />
          </FadeIn>

          <div className="space-y-8 sm:space-y-9">
            {sections.map((section) => (
              <FadeIn key={section.title} delay={section.delay}>
                <SectionBlock
                  title={section.title}
                  subtitle={section.subtitle}
                  count={section.count}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    {section.sites.map((site) => (
                      <SiteCard key={site.title} site={site} />
                    ))}
                  </div>
                </SectionBlock>
              </FadeIn>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
