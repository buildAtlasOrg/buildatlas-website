import Image from "next/image";
import Link from "next/link";

const footerSections = [
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact Us", href: "mailto:zaidahmad8060@gmail.com" },
      { label: "Jobs", href: "https://www.linkedin.com/company/buildatlas/jobs/" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "GitHub", href: "https://github.com/buildAtlasOrg" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/buildatlas/" },
    ],
  },
] as const;

type FooterLinkProps = {
  label: string;
  href: string;
};

function FooterLink({ label, href }: FooterLinkProps) {
  const isInternal = href.startsWith("/");
  const isExternal = href.startsWith("http");

  const className =
    "text-sm text-[color:var(--ink-soft)] transition-colors hover:text-[color:var(--ink)]";

  if (isInternal) {
    return (
      <Link href={href} className={className}>
        {label}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className={className}
    >
      {label}
    </a>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[color:var(--line)]">
      <div className="shell">
        <div className="py-10 sm:py-12">
          <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:items-start lg:gap-16">
            {/* Brand */}
            <div className="flex flex-col gap-4">
              <a href="#top" aria-label="Back to top" className="block w-fit">
                <div className="relative h-[2.4rem] w-[9.75rem]">
                  <Image
                    src="/BuildAtlas-BannerDark.png"
                    alt="BuildAtlas"
                    fill
                    sizes="160px"
                    className="object-contain object-left"
                  />
                </div>
              </a>
              <p className="max-w-[30ch] text-sm leading-[1.8] text-[color:var(--ink-soft)]">
                BuildAtlas helps engineering teams visualize GitHub Actions pipelines, trace failures faster, and debug complex builds in seconds.
              </p>
              <p className="text-xs text-[color:var(--ink-soft)]/60">
                &copy; {currentYear} BuildAtlas. All rights reserved.
              </p>
            </div>

            {/* Links */}
            <div className="grid gap-8 sm:grid-cols-3 lg:ml-auto lg:w-fit lg:gap-12">
              {footerSections.map((section) => (
                <div key={section.title} className="lg:text-right">
                  <p className="detail-label">{section.title}</p>
                  <div className="mt-4 flex flex-col gap-3 lg:items-end">
                    {section.links.map((link) => (
                      <FooterLink key={link.label} label={link.label} href={link.href} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
