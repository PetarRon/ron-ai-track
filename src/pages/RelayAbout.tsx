import { motion } from "framer-motion";
import { RelayShell } from "@/components/relay/RelayShell";
import { RelayNav } from "@/components/relay/RelayHero";
import { RelayFooter } from "@/components/relay/RelayFooter";
import { Card, Em, Eyebrow, RELAY_SHELL, settle } from "@/components/relay/shared";

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3 w-3 fill-current">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);

const founders = [
  { name: "Ron Lev Tabuchov", href: "https://www.linkedin.com/in/ron-lev-t-a3820528a/" },
  { name: "Petar Paskalev", href: "https://www.linkedin.com/in/petar-paskalev/" },
];

const sections = [
  {
    meta: "origin",
    title: "Where we come from",
    body: "Based in the Netherlands, Petaron is built by a small team whose backgrounds span freight forwarding, enterprise software and machine learning. We have sat in the dispatcher's chair, and we have built the systems that make that chair harder than it should be.",
  },
  {
    meta: "why",
    title: "What drives us",
    body: "Technology should remove friction, not add complexity. The logistics industry moves the world, yet too many teams still spend hours retyping orders. Our agents read, understand and prepare each order so your operators approve in seconds instead of typing for minutes.",
  },
  {
    meta: "team",
    title: "The team",
    body: "A small, fast-moving team based in the Netherlands with roots across Europe and beyond. We speak several languages, know several markets, and share one job: making logistics operations smarter and faster.",
  },
  {
    meta: "name",
    title: "Where the name comes from",
    body: "Petaron is the two of us in one word: Petar and Ron. And by happy coincidence, petaron (פתרון) is the Hebrew word for solution. A name that says exactly what we set out to build.",
  },
];

const values = [
  { title: "Reliability first.", body: "Logistics runs on trust. Built for accuracy and uptime." },
  { title: "Human in the loop.", body: "AI handles the heavy lifting; people make the final call." },
  { title: "Privacy by design.", body: "EU-hosted, GDPR-compliant, security at the core." },
];

const RelayAbout = () => (
  <RelayShell title="About · Relay direction preview">
    <RelayNav />
    <article className={`relative pb-10 pt-16 md:pt-24 ${RELAY_SHELL}`}>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
        <div>
          <motion.div {...settle()}>
            <Eyebrow>about us</Eyebrow>
          </motion.div>
          <motion.h1
            {...settle(0.1)}
            className="mt-6 font-body text-[40px] font-semibold leading-[1.04] tracking-[-0.03em] text-th-heading sm:text-[56px]"
          >
            Two people who were tired of <Em>retyping</Em> orders.
          </motion.h1>
          <motion.p {...settle(0.2)} className="mt-7 max-w-lg font-body text-[17px] leading-relaxed text-th-body">
            Petaron is building the future of order intake for logistics. We combine deep domain knowledge with modern AI
            to eliminate manual data entry, so teams can focus on what matters: their customers.
          </motion.p>
        </div>
        <motion.figure {...settle(0.25)}>
          <Card className="overflow-hidden p-2">
            <picture>
              <source srcSet="/founders.avif" type="image/avif" />
              <source srcSet="/founders.webp" type="image/webp" />
              <img
                src="/founders.png"
                alt="The Petaron.ai founders, Ron Lev Tabuchov and Petar Paskalev"
                width={811}
                height={648}
                decoding="async"
                {...{ fetchpriority: "high" }}
                className="h-auto w-full rounded-xl object-cover"
              />
            </picture>
          </Card>
          <figcaption className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 px-1 font-mono text-[12px] text-th-muted">
            <span>the founders</span>
            {founders.map((f) => (
              <a
                key={f.name}
                href={f.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-th-heading transition hover:text-ac-1"
              >
                <LinkedInIcon />
                {f.name}
              </a>
            ))}
          </figcaption>
        </motion.figure>
      </div>

      <div className="mt-24 grid gap-5 md:grid-cols-2">
        {sections.map((s, i) => (
          <motion.div key={s.title} {...settle(0.05 * i)}>
            <Card className="h-full p-7 md:p-8">
              <span className="font-mono text-[12px] text-th-muted">{s.meta}</span>
              <h2 className="mt-3 font-body text-[22px] font-medium tracking-[-0.02em] text-th-heading">{s.title}</h2>
              <p className="mt-3 font-body text-[15px] leading-relaxed text-th-body">{s.body}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div {...settle(0.1)} className="mt-5 rounded-2xl bg-ac-1 p-7 md:p-9">
        <span className="font-mono text-[12px] text-th-page/60">our values</span>
        <div className="mt-5 grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title}>
              <h3 className="font-body text-[20px] font-semibold tracking-[-0.02em] text-th-page">{v.title}</h3>
              <p className="mt-2 font-body text-[14px] leading-relaxed text-th-page/75">{v.body}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </article>
    <RelayFooter />
  </RelayShell>
);

export default RelayAbout;
