import { SectionDivider, SectionShell } from "./Section";

export default function Founder() {
  return (
    <SectionShell>
      <SectionDivider />

      <div className="grid gap-16 lg:grid-cols-[1fr_minmax(0,28rem)] lg:items-start lg:gap-24">
        {/* Left */}
        <div>
          <p className="eyebrow">Built by a developer, for developers</p>
          <h2 className="section-heading mt-5 max-w-[22ch]">
            One problem. One tool. Built in the open.
          </h2>
          <p className="section-copy mt-6 max-w-[52ch]">
            BuildAtlas started as a personal frustration — too many hours spent
            hunting through log output after a CI failure. Instead of waiting
            for the tooling to catch up, Zaid built it.
          </p>
          <p className="section-copy mt-4 max-w-[52ch]">
            The goal is simple: give engineering teams the visual context they
            need to debug builds faster and hand off failures clearly.
          </p>
        </div>

        {/* Right — founder info, no card */}
        <div className="border-t border-[color:var(--line)] pt-8 lg:border-t-0 lg:border-l lg:pl-12 lg:pt-0">
          {/* Name + role */}
          <div className="flex items-center gap-4">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center text-sm font-bold text-white"
              style={{
                background: "linear-gradient(135deg, var(--step-one-start), var(--step-one-end))",
              }}
            >
              ZA
            </div>
            <div>
              <p className="font-semibold tracking-[-0.025em] text-[color:var(--ink)]">Zaid Ahmad</p>
              <p className="mt-0.5 text-sm text-[color:var(--ink-soft)]">Founder &amp; Engineer</p>
            </div>
          </div>

          {/* School + bio */}
          <p className="mt-6 text-sm text-[color:var(--ink-soft)]">
            Carleton University — Computer Science, AI/ML Focus
          </p>
          <p className="mt-2 text-sm leading-[1.85] text-[color:var(--ink-soft)]">
            Building developer tools that make complex systems easier to understand.
          </p>

          {/* Quote */}
          <p className="mt-6 text-sm italic leading-[1.85] text-[color:var(--ink-soft)]">
            &ldquo;I built BuildAtlas because I was tired of reading logs that could have been a picture.&rdquo;
          </p>

          {/* Links */}
          <div className="mt-6 flex items-center gap-6 border-t border-[color:var(--line)] pt-6">
            <a
              href="https://www.linkedin.com/company/buildatlas/"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-[color:var(--ink-soft)] transition-colors hover:text-[color:var(--ink)]"
            >
              LinkedIn →
            </a>
            <a
              href="https://github.com/buildAtlasOrg"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-[color:var(--ink-soft)] transition-colors hover:text-[color:var(--ink)]"
            >
              GitHub →
            </a>
            <a
              href="mailto:zaidahmad8060@gmail.com"
              className="text-sm text-[color:var(--ink-soft)] transition-colors hover:text-[color:var(--ink)]"
            >
              Email →
            </a>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
