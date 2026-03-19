"use client";

import { useEffect, useState } from "react";
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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const bannerSrc = isDarkMode ? "/BuildAtlas-BannerDark.png" : "/BuildAtlas-Banner.png";
  const currentYear = new Date().getFullYear();
  const logoClass = "relative h-[2.9rem] w-[11.25rem] sm:h-[3.1rem] sm:w-[12.25rem]";
  const footerBlurb =
    "BuildAtlas helps engineering teams visualize CI/CD pipelines, trace failures faster, and make complex build systems easier to understand and optimize.";

  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => setIsDarkMode(root.classList.contains("dark"));

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="mt-10 border-t border-[color:var(--line)] bg-[color:var(--surface)] backdrop-blur-md">
      <div className="shell">
        <div className="py-8 sm:py-10">
          <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:items-start lg:gap-12">
            <div className="flex max-w-sm flex-col gap-4">
              <a href="#top" aria-label="Back to top" className="block w-fit">
                <div className={logoClass}>
                  <Image
                    src={bannerSrc}
                    alt="BuildAtlas"
                    fill
                    sizes="224px"
                    className="object-contain object-left"
                  />
                </div>
              </a>

              <p className="text-sm leading-7 text-[color:var(--ink-soft)]">{footerBlurb}</p>

              <p className="text-sm text-[color:var(--ink-soft)]">
                &copy; Copyright {currentYear}. All Rights Reserved.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-3 sm:gap-x-8 lg:ml-auto lg:w-fit lg:gap-x-10">
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
