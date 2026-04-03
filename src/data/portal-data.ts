export type PortalSite = {
  title: string;
  description: string;
  href?: string;
  image?: string;
  status?: "live" | "construction";
  category: "principal" | "client" | "side-project";
};

export type SocialLink = {
  label: string;
  href: string;
};

export const profile = {
  name: "Vincent Bichat",
  role: "Développeur web full-stack",
  photo: "/profile.png",
};

export const primarySites: PortalSite[] = [
  {
    title: "404 Factory",
    description: "Site de mon entreprise",
    href: "https://404factory.vincent-bichat.fr",
    status: "live",
    category: "principal",
    image: "/preview/404factory.png",
  },
  {
    title: "Portfolio",
    description: "Mon site portfolio",
    href: "https://portfolio.vincent-bichat.fr",
    status: "live",
    category: "principal",
    image: "/preview/portfolio.png",
  },
  {
    title: "QReview",
    description: "Site de recueil d'avis",
    href: "https://qreview.vincent-bichat.fr",
    status: "live",
    category: "principal",
    image: "/preview/qreview.png",
  },
];

export const professionalProjects: PortalSite[] = [
  {
    title: "Développement culturel - Opéra de Montpellier",
    description: "Plateforme d'inscriptions pour l'Opéra Orchestre Montpellier",
    href: "https://inscriptions.opera-orchestre-montpellier.fr",
    status: "live",
    category: "client",
    image: "/preview/opera.png",
  },
  {
    title: "UAR ICS - Université de Montpellier",
    description: "Unité d'appui à la recherche - Ingénierie, caractérisations et services",
    status: "construction",
    category: "client",
  },
];

export const sideProjects: PortalSite[] = [
  {
    title: "Astrolens",
    description: "Simulation spatiale (système solaire + planète Terre)",
    href: "https://astrolens.vincent-bichat.fr",
    status: "live",
    category: "side-project",
    image: "/preview/astrolens.png",
  },
];

export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: "https://fr.linkedin.com/in/vincent-bichat" },
  { label: "GitHub", href: "https://github.com/vincbct34" },
];
