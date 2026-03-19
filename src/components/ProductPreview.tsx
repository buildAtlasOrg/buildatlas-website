import BorderGlow from "./BorderGlow";
import { SectionDivider, SectionShell } from "./Section";

export default function ProductPreview() {
  return (
    <SectionShell id="product">
      <SectionDivider />

      <BorderGlow
        className="rounded-[50px]"
        backgroundColor="var(--panel)"
        fillOpacity={0.16}
      >
        <div className="flex min-h-[18rem] items-center justify-center rounded-[50px] px-6 py-12 sm:min-h-[22rem] sm:px-8">
          <p className="text-center text-[clamp(2rem,4.5vw,3.5rem)] font-semibold tracking-[-0.05em] text-[color:var(--ink)]">
            Connect Repo TBA
          </p>
        </div>
      </BorderGlow>
    </SectionShell>
  );
}
