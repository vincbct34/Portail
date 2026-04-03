import Image from "next/image";
import { profile, socialLinks } from "@/data/portal-data";

export function AboutCard() {
  return (
    <aside className="relative overflow-hidden rounded-[30px] border border-(--card-border) bg-(--card)/88 p-6 shadow-[0_24px_50px_-38px_rgba(15,23,42,0.9)]">
      <div className="pointer-events-none absolute -bottom-10 -left-8 h-28 w-28 rounded-full bg-(--accent-2)/18 blur-2xl" />

      <div className="relative">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/58">
          À propos
        </p>

        <div className="mt-4 flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-white/12 bg-white/8">
            <Image
              src={profile.photo}
              alt={`Photo de ${profile.name}`}
              fill
              sizes="64px"
              className="object-cover"
              priority
            />
          </div>

          <div>
            <p className="font-display text-2xl leading-none text-foreground">
              {profile.name}
            </p>
            <p className="mt-1 text-sm text-(--muted)">{profile.role}</p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-(--muted)">
          Développeur web full-stack, je conçois des expériences web utiles,
          lisibles et rapides à charger.
        </p>

        <div className="mt-5 flex flex-wrap gap-2.5">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-white/84 transition-[border-color,background-color,box-shadow,color] duration-300 hover:border-transparent hover:bg-(--accent) hover:text-white hover:shadow-[0_10px_20px_-14px_rgba(221,90,47,0.95)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent)/35"
            >
              {social.label}
              <span
                aria-hidden="true"
                className="text-[0.72rem] transition-transform duration-300 group-hover:translate-x-0.5"
              >
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
