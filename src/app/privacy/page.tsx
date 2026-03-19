import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="relative isolate min-h-screen pb-16 pt-24 sm:pt-28">
      <div className="shell max-w-4xl">
        <Link href="/" className="detail-label">
          BuildAtlas
        </Link>

        <section className="mt-8 rounded-[2rem] border border-[color:var(--line)] bg-[color:var(--surface)] px-6 py-8 shadow-[0_18px_36px_var(--shadow-soft)] backdrop-blur-md sm:px-8">
          <p className="detail-label">Legal</p>
          <h1 className="section-heading mt-4 max-w-none">Privacy Policy</h1>
          <p className="section-copy mt-5">
            Full BuildAtlas privacy policy details will be published here. For questions in the
            meantime, contact{" "}
            <a href="mailto:zaidahmad8060@gmail.com" className="text-[color:var(--ink)]">
              zaidahmad8060@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
