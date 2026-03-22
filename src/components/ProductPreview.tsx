import { SectionDivider, SectionIntro, SectionShell } from "./Section";
import BorderGlow from "./BorderGlow";

export default function ProductPreview() {
  return (
    <SectionShell id="product">
      <SectionDivider />

      <SectionIntro
        eyebrow="The product"
        title="Your pipeline, as a map."
        description="Every GitHub Actions run becomes an interactive dependency graph. Click any node to instantly surface logs, errors, and context — no scrolling required."
      />

      <div className="mt-10">
        <BorderGlow
          className="rounded-[2rem]"
          backgroundColor="var(--panel)"
          borderRadius={32}
          fillOpacity={0.14}
        >
          <div className="overflow-hidden rounded-[2rem] border border-[color:var(--line)] shadow-[0_32px_80px_rgba(2,6,23,0.6)]">
            <svg
              width="100%"
              viewBox="0 0 940 500"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="BuildAtlas pipeline visualization"
              role="img"
            >
              <defs>
                <pattern id="pp-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.035)" />
                </pattern>
                <filter id="pp-glow-red" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <marker id="pp-arr-green" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
                  <polygon points="0 0,7 2.5,0 5" fill="#10b981" opacity="0.7" />
                </marker>
                <marker id="pp-arr-dim" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
                  <polygon points="0 0,7 2.5,0 5" fill="#1f2937" />
                </marker>
              </defs>

              {/* ── BROWSER CHROME ── */}
              <rect width="940" height="38" fill="#07091a" />
              <circle cx="16" cy="19" r="5.5" fill="#ff5f57" />
              <circle cx="28" cy="19" r="5.5" fill="#febc2e" />
              <circle cx="40" cy="19" r="5.5" fill="#28c840" />
              <rect x="96" y="11" width="240" height="16" rx="5" fill="rgba(255,255,255,0.05)" />
              <text x="216" y="23" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.22)" fontFamily="'Courier New',monospace">app.buildatlas.io</text>
              <line x1="0" y1="38" x2="940" y2="38" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

              {/* ── APP BACKGROUNDS ── */}
              <rect x="0" y="38" width="190" height="462" fill="#060910" />
              <line x1="190" y1="38" x2="190" y2="500" stroke="rgba(255,255,255,0.055)" strokeWidth="1" />
              <rect x="190" y="38" width="520" height="462" fill="#080b10" />
              <rect x="190" y="38" width="520" height="462" fill="url(#pp-dots)" />
              <rect x="710" y="38" width="230" height="462" fill="#0a0f1c" />
              <line x1="710" y1="38" x2="710" y2="500" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

              {/* ── SIDEBAR ── */}
              <text x="14" y="68" fontSize="8.5" fill="#4b5880" fontFamily="'Courier New',monospace" letterSpacing="1.5">REPOSITORIES</text>

              {/* acme/frontend selected */}
              <rect x="6" y="74" width="178" height="30" rx="7" fill="#121a31" />
              <circle cx="17" cy="89" r="4" fill="#8a76ff" />
              <text x="27" y="94" fontSize="11" fill="#edf2ff" fontFamily="-apple-system,sans-serif" fontWeight="500">acme/frontend</text>

              <text x="27" y="128" fontSize="11" fill="#3d4b6b" fontFamily="-apple-system,sans-serif">acme/api</text>
              <text x="27" y="153" fontSize="11" fill="#3d4b6b" fontFamily="-apple-system,sans-serif">acme/infra</text>

              <line x1="8" y1="170" x2="182" y2="170" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

              <text x="14" y="191" fontSize="8.5" fill="#4b5880" fontFamily="'Courier New',monospace" letterSpacing="1.5">RECENT RUNS</text>

              {/* Run #47 failed (selected) */}
              <rect x="6" y="198" width="178" height="36" rx="7" fill="#150808" stroke="#ef4444" strokeWidth="0.75" strokeOpacity="0.45" />
              <circle cx="17" cy="216" r="4" fill="#ef4444" />
              <text x="27" y="212" fontSize="10.5" fill="#f87171" fontFamily="-apple-system,sans-serif" fontWeight="500">Run #47</text>
              <text x="27" y="227" fontSize="8.5" fill="#ef4444" fontFamily="'Courier New',monospace" opacity="0.65">failed · 3m 42s</text>

              {/* Run #46 success */}
              <rect x="6" y="238" width="178" height="34" rx="7" fill="rgba(255,255,255,0.018)" />
              <circle cx="17" cy="255" r="4" fill="#10b981" />
              <text x="27" y="251" fontSize="10.5" fill="#6b7a9c" fontFamily="-apple-system,sans-serif">Run #46</text>
              <text x="27" y="264" fontSize="8.5" fill="#2e3d56" fontFamily="'Courier New',monospace">success · 2m 58s</text>

              {/* Run #45 success */}
              <rect x="6" y="276" width="178" height="34" rx="7" fill="rgba(255,255,255,0.018)" />
              <circle cx="17" cy="293" r="4" fill="#10b981" />
              <text x="27" y="289" fontSize="10.5" fill="#6b7a9c" fontFamily="-apple-system,sans-serif">Run #45</text>
              <text x="27" y="302" fontSize="8.5" fill="#2e3d56" fontFamily="'Courier New',monospace">success · 3m 11s</text>

              {/* ── MAIN TOP BAR ── */}
              <rect x="190" y="38" width="520" height="44" fill="rgba(255,255,255,0.018)" />
              <line x1="190" y1="82" x2="710" y2="82" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <text x="208" y="65" fontSize="12.5" fill="#edf2ff" fontFamily="-apple-system,sans-serif" fontWeight="600">acme/frontend</text>
              <text x="316" y="65" fontSize="11" fill="#3d4b6b" fontFamily="-apple-system,sans-serif">/ Run #47</text>
              <rect x="530" y="50" width="52" height="18" rx="5" fill="rgba(239,68,68,0.14)" />
              <text x="556" y="63" textAnchor="middle" fontSize="9" fill="#f87171" fontFamily="'Courier New',monospace" fontWeight="700">FAILED</text>
              <text x="600" y="65" fontSize="10" fill="#3d4b6b" fontFamily="'Courier New',monospace">3m 42s</text>
              <rect x="644" y="51" width="48" height="17" rx="5" fill="transparent" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
              <text x="668" y="63.5" textAnchor="middle" fontSize="9" fill="#3d4b6b" fontFamily="'Courier New',monospace">Re-run</text>

              {/* ── PIPELINE EDGES ── */}
              {/* lint → test */}
              <path d="M330,242 C355,242 355,208 380,208" fill="none" stroke="#10b981" strokeWidth="2" strokeOpacity="0.6" markerEnd="url(#pp-arr-green)" />
              {/* lint → build */}
              <path d="M330,242 C355,242 355,276 380,276" fill="none" stroke="#10b981" strokeWidth="2" strokeOpacity="0.6" markerEnd="url(#pp-arr-green)" />
              {/* test → deploy (dashed, failure) */}
              <path d="M490,208 C515,208 515,242 540,242" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeOpacity="0.2" strokeDasharray="5 4" markerEnd="url(#pp-arr-dim)" />
              {/* build → deploy (dashed, success but deploy blocked) */}
              <path d="M490,276 C515,276 515,242 540,242" fill="none" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.2" strokeDasharray="5 4" markerEnd="url(#pp-arr-dim)" />

              {/* ── NODE: lint (success) ── */}
              <rect x="220" y="220" width="110" height="44" rx="10" fill="#0a1f14" stroke="#10b981" strokeWidth="1" strokeOpacity="0.45" />
              <circle cx="237" cy="238" r="5" fill="none" stroke="#10b981" strokeWidth="1.4" />
              <path d="M234,238 L236.5,240.5 L240.5,235" fill="none" stroke="#10b981" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              <text x="247" y="234" fontSize="10.5" fill="#34d399" fontFamily="-apple-system,sans-serif" fontWeight="600">lint</text>
              <text x="247" y="248" fontSize="8.5" fill="#10b981" fontFamily="'Courier New',monospace" opacity="0.65">38s</text>
              <rect x="220" y="262" width="110" height="2" rx="1" fill="rgba(255,255,255,0.03)" />
              <rect x="220" y="262" width="30" height="2" rx="1" fill="#10b981" opacity="0.45" />

              {/* ── NODE: test (FAILURE — selected) ── */}
              {/* Glow / selection ring */}
              <rect x="376" y="182" width="118" height="52" rx="12" fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="1.5" />
              <rect x="380" y="186" width="110" height="44" rx="10" fill="#1a0a0a" stroke="#ef4444" strokeWidth="1.25" strokeOpacity="0.7" filter="url(#pp-glow-red)" />
              <circle cx="397" cy="204" r="5" fill="rgba(239,68,68,0.15)" stroke="#ef4444" strokeWidth="1.4" />
              <path d="M394.5,201.5 L399.5,206.5 M399.5,201.5 L394.5,206.5" fill="none" stroke="#ef4444" strokeWidth="1.4" strokeLinecap="round" />
              <text x="407" y="200" fontSize="10.5" fill="#f87171" fontFamily="-apple-system,sans-serif" fontWeight="600">test</text>
              <text x="407" y="214" fontSize="8.5" fill="#ef4444" fontFamily="'Courier New',monospace" opacity="0.65">1m 12s</text>
              <rect x="380" y="228" width="110" height="2" rx="1" fill="rgba(255,255,255,0.03)" />
              <rect x="380" y="228" width="62" height="2" rx="1" fill="#ef4444" opacity="0.45" />

              {/* ── NODE: build (success) ── */}
              <rect x="380" y="254" width="110" height="44" rx="10" fill="#0a1f14" stroke="#10b981" strokeWidth="1" strokeOpacity="0.45" />
              <circle cx="397" cy="272" r="5" fill="none" stroke="#10b981" strokeWidth="1.4" />
              <path d="M394,272 L396.5,274.5 L400.5,269" fill="none" stroke="#10b981" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              <text x="407" y="268" fontSize="10.5" fill="#34d399" fontFamily="-apple-system,sans-serif" fontWeight="600">build</text>
              <text x="407" y="282" fontSize="8.5" fill="#10b981" fontFamily="'Courier New',monospace" opacity="0.65">2m 4s</text>
              <rect x="380" y="296" width="110" height="2" rx="1" fill="rgba(255,255,255,0.03)" />
              <rect x="380" y="296" width="88" height="2" rx="1" fill="#10b981" opacity="0.45" />

              {/* ── NODE: deploy (skipped) ── */}
              <rect x="540" y="220" width="110" height="44" rx="10" fill="#0d1117" stroke="rgba(255,255,255,0.04)" strokeWidth="1" opacity="0.4" />
              <circle cx="557" cy="238" r="5" fill="none" stroke="#374151" strokeWidth="1.4" opacity="0.7" />
              <path d="M554,238 L560,238" fill="none" stroke="#374151" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
              <text x="567" y="234" fontSize="10.5" fill="#374151" fontFamily="-apple-system,sans-serif" fontWeight="600">deploy</text>
              <text x="567" y="248" fontSize="8.5" fill="#374151" fontFamily="'Courier New',monospace" opacity="0.7">blocked</text>

              {/* ── JOB PANEL ── */}
              <text x="726" y="66" fontSize="8.5" fill="#4b5880" fontFamily="'Courier New',monospace" letterSpacing="1.5">JOB DETAILS</text>

              {/* Job name */}
              <text x="726" y="96" fontSize="15" fill="#f87171" fontFamily="-apple-system,sans-serif" fontWeight="700">test</text>
              <rect x="756" y="81" width="50" height="19" rx="5" fill="rgba(239,68,68,0.12)" stroke="#ef4444" strokeWidth="0.5" strokeOpacity="0.35" />
              <text x="781" y="95" textAnchor="middle" fontSize="8.5" fill="#f87171" fontFamily="'Courier New',monospace" fontWeight="700">FAILED</text>
              <text x="726" y="117" fontSize="9.5" fill="#3d4b6b" fontFamily="'Courier New',monospace">ubuntu-latest · 1m 12s</text>

              <line x1="720" y1="129" x2="932" y2="129" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

              {/* Steps */}
              <text x="726" y="149" fontSize="8.5" fill="#4b5880" fontFamily="'Courier New',monospace" letterSpacing="1.5">STEPS</text>

              {/* Step 1 ✓ */}
              <circle cx="734" cy="165" r="4.5" fill="none" stroke="#10b981" strokeWidth="1.2" />
              <path d="M731.5,165 L733.5,167.5 L736.5,162" fill="none" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              <text x="744" y="169" fontSize="10" fill="#5a6b85" fontFamily="-apple-system,sans-serif">Set up job</text>

              {/* Step 2 ✓ */}
              <circle cx="734" cy="185" r="4.5" fill="none" stroke="#10b981" strokeWidth="1.2" />
              <path d="M731.5,185 L733.5,187.5 L736.5,182" fill="none" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              <text x="744" y="189" fontSize="10" fill="#5a6b85" fontFamily="-apple-system,sans-serif">Checkout code</text>

              {/* Step 3 ✓ */}
              <circle cx="734" cy="205" r="4.5" fill="none" stroke="#10b981" strokeWidth="1.2" />
              <path d="M731.5,205 L733.5,207.5 L736.5,202" fill="none" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              <text x="744" y="209" fontSize="10" fill="#5a6b85" fontFamily="-apple-system,sans-serif">Install dependencies</text>

              {/* Step 4 ✗ FAIL */}
              <circle cx="734" cy="225" r="4.5" fill="rgba(239,68,68,0.12)" stroke="#ef4444" strokeWidth="1.2" />
              <path d="M731.5,222.5 L736.5,227.5 M736.5,222.5 L731.5,227.5" fill="none" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round" />
              <text x="744" y="229" fontSize="10" fill="#f87171" fontFamily="-apple-system,sans-serif" fontWeight="600">Run tests</text>

              {/* Step 5 skipped */}
              <circle cx="734" cy="245" r="4.5" fill="none" stroke="#2e3d56" strokeWidth="1" opacity="0.5" />
              <text x="744" y="249" fontSize="10" fill="#2e3d56" fontFamily="-apple-system,sans-serif" opacity="0.5">Upload coverage</text>

              <line x1="720" y1="262" x2="932" y2="262" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

              {/* Error log */}
              <rect x="720" y="270" width="210" height="108" rx="8" fill="#060910" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <text x="730" y="289" fontSize="9" fill="#5a6b85" fontFamily="'Courier New',monospace">$ npx jest --ci</text>
              <text x="730" y="306" fontSize="8.5" fill="#f87171" fontFamily="'Courier New',monospace">FAIL src/__tests__/auth.test.ts</text>
              <text x="730" y="321" fontSize="8" fill="#3d4b6b" fontFamily="'Courier New',monospace">  ✕ should validate token (3s)</text>
              <text x="730" y="335" fontSize="8" fill="#3d4b6b" fontFamily="'Courier New',monospace">  Expected: 200</text>
              <text x="730" y="349" fontSize="8" fill="#3d4b6b" fontFamily="'Courier New',monospace">  Received: 401 Unauthorized</text>
              <text x="730" y="364" fontSize="8" fill="#ef4444" fontFamily="'Courier New',monospace" opacity="0.65">2 failed, 47 passed</text>

              {/* Outer frame */}
              <rect width="940" height="500" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            </svg>
          </div>
        </BorderGlow>

        {/* Caption row */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 px-2">
          <p className="text-sm text-[color:var(--ink-soft)]">
            Above: the <span className="text-[color:var(--ink)]">test</span> job failed — lint and build passed, but <span className="text-[color:var(--ember)]">deploy is blocked</span>. One click shows you exactly why.
          </p>
          <a
            href="/demo"
            className="shrink-0 text-sm font-medium text-[color:var(--signal)] transition-opacity hover:opacity-80"
          >
            Try the live demo →
          </a>
        </div>
      </div>
    </SectionShell>
  );
}
