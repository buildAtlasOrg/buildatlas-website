"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Github, Linkedin, Mail } from "lucide-react";

const socials = [
  { icon: Mail, label: "Contact Us", href: "mailto:zaidahmad8060@gmail.com" },
  { icon: Github, label: "GitHub", href: "https://github.com/buildAtlasOrg" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/buildatlas/" },
];

export default function Footer() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const bannerSrc = isDarkMode ? "/BuildAtlas-BannerDark.png" : "/BuildAtlas-Banner.png";

  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => setIsDarkMode(root.classList.contains("dark"));

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="pb-6">
      <div className="shell">
        <div className="flex flex-col gap-4 border-t border-[color:var(--line)] py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative h-10 w-[10.5rem] sm:h-11 sm:w-[11.5rem]">
            <Image
              src={bannerSrc}
              alt="BuildAtlas"
              fill
              sizes="184px"
              className="object-contain object-left"
            />
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={social.href.startsWith("mailto:") ? undefined : "noreferrer"}
                className="inline-flex items-center gap-2 text-sm text-[color:var(--ink-soft)] transition-colors hover:text-[color:var(--ink)]"
              >
                <social.icon className="h-4 w-4" />
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
