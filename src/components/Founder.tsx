import Link from "next/link";
import { SectionDivider, SectionShell } from "./Section";
import BorderGlow from "./BorderGlow";

export default function Founder() {
  return (
    <SectionShell>
      <SectionDivider />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-center">
        <div>
          <p className="eyebrow">Built by a developer, for developers</p>
          <h2 className="section-heading mt-5 max-w-[22ch]">
            One problem. One tool. Built in the open.
          </h2>
          <p className="section-copy mt-5 max-w-[52ch]">
            BuildAtlas started as a personal frustration — too many hours spent
            hunting through log output after a CI failure. Instead of waiting
            for the tooling to catch up, Zaid built it.
          </p>
          <p className="section-copy mt-4 max-w-[52ch]">
            The goal is simple: give engineering teams the visual context they
            need to debug builds faster and hand off failures clearly.
          </p>
        </div>

        <BorderGlow
          className="rounded-[2rem]"
          backgroundColor="var(--surface)"
          borderRadius={32}
          fillOpacity={0.12}
          colors={["#8a76ff", "#a596ff", "#c4b8ff"]}
        >
          <div className="flex flex-col gap-6 rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface)] p-7 backdrop-blur-md">
            <div className="flex items-center gap-4">
              {/* Initials avatar */}
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.1rem] text-[1.05rem] font-bold tracking-tight text-[color:var(--paper)]"
                style={{
                  background:
                    "linear-gradient(135deg, var(--step-one-start), var(--step-one-end))",
                }}
              >
                ZA
              </div>
              <div>
                <p className="text-[1.05rem] font-semibold tracking-[-0.03em] text-[color:var(--ink)]">
                  Zaid Ahmad
                </p>
                <p className="mt-0.5 text-sm text-[color:var(--ink-soft)]">
                  Founder &amp; Engineer
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-[color:var(--ink-soft)]">
                Carleton University — Computer Science, AI/ML Focus
              </p>
              <p className="mt-2 text-sm leading-7 text-[color:var(--ink-soft)]">
                Building developer tools that make complex systems easier to understand.
              </p>
            </div>

            <blockquote className="rounded-[1rem] border-l-2 border-[color:var(--signal)] bg-[color:var(--surface-soft)] py-3 pl-4 pr-3">
              <p className="text-sm italic leading-7 text-[color:var(--ink-soft)]">
                &ldquo;I built BuildAtlas because I was tired of reading logs
                that could have been a picture.&rdquo;
              </p>
            </blockquote>

            <div className="flex items-center gap-4 border-t border-[color:var(--line)] pt-4">
              <a
                href="https://www.linkedin.com/company/buildatlas/"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-[color:var(--ink-soft)] transition-colors hover:text-[color:var(--ink)]"
              >
                LinkedIn →
              </a>
              <a
                href="https://github.com/buildAtlasOrg"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-[color:var(--ink-soft)] transition-colors hover:text-[color:var(--ink)]"
              >
                GitHub →
              </a>
              <a
                href="mailto:zaidahmad8060@gmail.com"
                className="text-sm font-medium text-[color:var(--ink-soft)] transition-colors hover:text-[color:var(--ink)]"
              >
                Email →
              </a>
            </div>
          </div>
        </BorderGlow>
      </div>
    </SectionShell>
  );
}
