"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PipelineFlow from "./PipelineFlow";
import { REPOS, Repo, WorkflowRun, Job, JobStatus } from "./mockData";

function RunStatusBadge({ status }: { status: WorkflowRun["status"] }) {
  if (status === "success")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-900/40 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        passed
      </span>
    );
  if (status === "failure")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-900/40 px-2 py-0.5 text-[10px] font-semibold text-red-400">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
        failed
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-900/30 px-2 py-0.5 text-[10px] font-semibold text-yellow-400">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-yellow-500" />
      running
    </span>
  );
}

function TriggerIcon({ trigger }: { trigger: WorkflowRun["trigger"] }) {
  if (trigger === "pull_request")
    return <svg className="h-3 w-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 4v4m0 0l4-4m-4 4l-4-4" /></svg>;
  if (trigger === "schedule")
    return <svg className="h-3 w-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" /></svg>;
  if (trigger === "workflow_dispatch")
    return <svg className="h-3 w-3 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" /></svg>;
  return <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>;
}

function JobStatusIcon({ status }: { status: JobStatus }) {
  if (status === "success") return <svg className="h-3.5 w-3.5 flex-shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>;
  if (status === "failure") return <svg className="h-3.5 w-3.5 flex-shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>;
  if (status === "in_progress") return <svg className="h-3.5 w-3.5 flex-shrink-0 animate-spin text-yellow-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" /></svg>;
  return <svg className="h-3.5 w-3.5 flex-shrink-0 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="9" strokeWidth={1.5} /></svg>;
}

function JobPanel({ job, onClose }: { job: Job; onClose: () => void }) {
  const isFailed = job.status === "failure";
  return (
    <div className="flex w-[400px] flex-shrink-0 flex-col overflow-hidden border-l border-white/5 bg-gray-900">
      <div className={`flex flex-shrink-0 items-center justify-between gap-3 border-b px-4 py-3 ${isFailed ? "border-red-900/40 bg-red-950/30" : "border-white/5"}`}>
        <div className="flex min-w-0 items-center gap-2.5">
          <JobStatusIcon status={job.status} />
          <span className="truncate text-sm font-semibold text-white">{job.name}</span>
          <span className="flex-shrink-0 font-mono text-xs text-gray-400">{job.duration}</span>
        </div>
        <button onClick={onClose} className="rounded-lg p-1 text-gray-400 transition hover:bg-white/10 hover:text-gray-200">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div className="flex flex-shrink-0 items-center gap-5 border-b border-white/5 bg-white/[0.02] px-4 py-2.5">
        <div><p className="text-[9px] font-semibold uppercase tracking-widest text-gray-400">Runner</p><p className="mt-0.5 font-mono text-[11px] text-gray-300">{job.runner}</p></div>
        <div><p className="text-[9px] font-semibold uppercase tracking-widest text-gray-400">Status</p><p className={`mt-0.5 text-[11px] font-semibold capitalize ${job.status === "success" ? "text-emerald-400" : job.status === "failure" ? "text-red-400" : job.status === "in_progress" ? "text-yellow-400" : "text-gray-400"}`}>{job.status.replace("_", " ")}</p></div>
        <div><p className="text-[9px] font-semibold uppercase tracking-widest text-gray-400">Duration</p><p className="mt-0.5 font-mono text-[11px] text-gray-300">{job.duration}</p></div>
      </div>

      {isFailed && job.annotations.length > 0 && (
        <div className="flex-shrink-0 border-b border-red-900/40 bg-red-950/20 px-4 py-3">
          <p className="mb-2 flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-widest text-red-500">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
            Annotations
          </p>
          <div className="space-y-1 font-mono">
            {job.annotations.map((a, i) => (
              <p key={i} className={`text-[11px] ${i === 0 ? "font-semibold text-red-300" : "text-red-400/80"}`}>
                {i > 0 && <span className="mr-1 select-none text-red-700">›</span>}{a}
              </p>
            ))}
          </div>
        </div>
      )}

      {job.steps.length > 0 && (
        <div className="flex-shrink-0 border-b border-white/5 px-4 py-3">
          <p className="mb-2.5 text-[9px] font-semibold uppercase tracking-widest text-gray-500">Steps</p>
          <div className="space-y-1.5">
            {job.steps.map((step, i) => (
              <div key={i} className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <JobStatusIcon status={step.status} />
                  <span className="truncate text-xs text-gray-400">{step.name}</span>
                </div>
                <span className="flex-shrink-0 font-mono text-[10px] text-gray-500">{step.duration}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex min-h-0 flex-1 flex-col">
        <p className="flex-shrink-0 border-b border-white/5 px-4 py-2.5 text-[9px] font-semibold uppercase tracking-widest text-gray-500">Logs</p>
        <pre className="flex-1 overflow-auto bg-gray-950 p-4 font-mono text-[11px] leading-relaxed text-gray-300">{job.logs}</pre>
      </div>
    </div>
  );
}

export default function DemoApp() {
  const [selectedRepo, setSelectedRepo] = useState<Repo>(REPOS[0]);
  const [selectedRun, setSelectedRun] = useState<WorkflowRun>(REPOS[0].runs[0]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleSelectRepo = (repo: Repo) => { setSelectedRepo(repo); setSelectedRun(repo.runs[0]); setSelectedJob(null); };
  const handleSelectRun = (run: WorkflowRun) => { setSelectedRun(run); setSelectedJob(null); };
  const handleJobClick = (job: Job) => { setSelectedJob((prev) => (prev?.id === job.id ? null : job)); };

  const passed = selectedRun.jobs.filter((j) => j.status === "success").length;
  const failed = selectedRun.jobs.filter((j) => j.status === "failure").length;
  const skipped = selectedRun.jobs.filter((j) => j.status === "skipped").length;
  const running = selectedRun.jobs.filter((j) => j.status === "pending" || j.status === "in_progress").length;
  const failedJob = selectedRun.jobs.find((j) => j.status === "failure");

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-950 font-sans">
      <header className="flex h-13 flex-shrink-0 items-center justify-between border-b border-white/5 bg-gray-900 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-32">
              <Image src="/BuildAtlas-BannerDark.png" alt="BuildAtlas" fill className="object-contain object-left" priority />
            </div>
          </Link>
          <span className="rounded-full border border-blue-800/40 bg-blue-900/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-400">Demo</span>
        </div>
        <div className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 sm:flex">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-gray-400" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
          <span className="text-xs font-medium text-gray-300">acme-org</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className="flex w-56 flex-shrink-0 flex-col overflow-y-auto border-r border-white/5 bg-gray-900">
          <div className="border-b border-white/5 p-3">
            <p className="mb-2 px-2 text-[9px] font-semibold uppercase tracking-widest text-gray-500">Repositories</p>
            {REPOS.map((repo) => (
              <button key={repo.id} onClick={() => handleSelectRepo(repo)}
                className={`mb-0.5 w-full rounded-lg px-2 py-2 text-left transition-colors ${selectedRepo.id === repo.id ? "bg-blue-900/20" : "hover:bg-white/5"}`}>
                <div className="flex items-center gap-2">
                  <svg className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" /></svg>
                  <span className={`truncate text-xs font-medium ${selectedRepo.id === repo.id ? "text-blue-300" : "text-gray-300"}`}>{repo.org}/{repo.name}</span>
                </div>
                <div className="mt-0.5 flex items-center gap-1.5 pl-5">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: repo.languageColor }} />
                  <span className="text-[10px] text-gray-500">{repo.language}</span>
                  <span className="ml-auto text-[10px] text-gray-600">{repo.runs.length} runs</span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex-1 p-3">
            <p className="mb-2 px-2 text-[9px] font-semibold uppercase tracking-widest text-gray-500">Workflow Runs</p>
            {selectedRepo.runs.map((run) => (
              <button key={run.id} onClick={() => handleSelectRun(run)}
                className={`mb-1 w-full rounded-lg px-2 py-2.5 text-left transition-colors ${selectedRun.id === run.id ? "bg-blue-900/20 ring-1 ring-blue-700/40" : "hover:bg-white/5"}`}>
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1.5"><TriggerIcon trigger={run.trigger} /><span className="font-mono text-[10px] text-gray-500">#{run.number}</span></div>
                  <RunStatusBadge status={run.status} />
                </div>
                <p className={`mt-1 truncate text-[11px] font-medium ${selectedRun.id === run.id ? "text-blue-300" : "text-gray-400"}`}>{run.workflow}</p>
                <p className="mt-0.5 truncate text-[10px] text-gray-500">{run.branch} · {run.ago}</p>
                <p className="mt-0.5 truncate text-[10px] text-gray-600">{run.commit}</p>
              </button>
            ))}
          </div>

          <div className="border-t border-white/5 px-4 py-3">
            <p className="text-[10px] text-gray-600">Click any job node to inspect logs</p>
          </div>
        </aside>

        <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="flex flex-shrink-0 items-center gap-3 border-b border-white/5 bg-gray-900 px-5 py-3">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="font-mono text-sm font-semibold text-white">{selectedRepo.org}/{selectedRepo.name}</span>
                <svg className="h-3 w-3 flex-shrink-0 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                <span className="text-sm text-gray-400">{selectedRun.workflow}</span>
                <span className="font-mono text-sm text-gray-500">#{selectedRun.number}</span>
                <RunStatusBadge status={selectedRun.status} />
                <span className="inline-flex items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-gray-400">
                  <TriggerIcon trigger={selectedRun.trigger} />{selectedRun.trigger.replace("_", " ")}
                </span>
                <span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-gray-500">{selectedRun.sha}</span>
              </div>
              <p className="mt-0.5 truncate text-xs text-gray-500">
                {selectedRun.commit} · by <span className="font-medium text-gray-300">{selectedRun.committer}</span> · {selectedRun.ago}
                {selectedRun.duration !== "—" && ` · ${selectedRun.duration}`}
              </p>
            </div>

            <div className="flex flex-shrink-0 items-center gap-3">
              <div className="hidden items-center gap-3 text-xs sm:flex">
                {passed > 0 && <span className="flex items-center gap-1 text-emerald-400"><JobStatusIcon status="success" />{passed} passed</span>}
                {failed > 0 && <span className="flex items-center gap-1 text-red-400"><JobStatusIcon status="failure" />{failed} failed</span>}
                {skipped > 0 && <span className="flex items-center gap-1 text-gray-500"><svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="9" strokeWidth={1.5} /></svg>{skipped} skipped</span>}
                {running > 0 && <span className="flex items-center gap-1 text-yellow-400"><JobStatusIcon status="in_progress" />{running} running</span>}
              </div>
              {selectedRun.status === "failure" && (
                <button disabled title="Re-run is disabled in demo mode"
                  className="flex cursor-not-allowed items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-500">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
                  Re-run failed jobs
                </button>
              )}
            </div>
          </div>

          {selectedRun.status === "failure" && failedJob && failedJob.annotations.length > 0 && (
            <div className="flex flex-shrink-0 items-start gap-3 border-b border-red-900/30 bg-red-950/20 px-5 py-2.5">
              <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
              <div className="min-w-0">
                <span className="text-xs font-semibold text-red-300">{failedJob.name} failed</span>
                <span className="mx-1.5 text-red-800">·</span>
                <span className="font-mono text-xs text-red-400">{failedJob.annotations[0]}</span>
                {failedJob.annotations[2] && (<><span className="mx-1.5 text-red-800">at</span><span className="font-mono text-xs text-red-500">{failedJob.annotations[2]}</span></>)}
                <button onClick={() => setSelectedJob(failedJob)} className="ml-3 text-xs font-medium text-red-400 underline underline-offset-2 hover:text-red-200">View logs</button>
              </div>
            </div>
          )}

          <div className="flex min-h-0 flex-1 overflow-hidden">
            <div className="min-w-0 flex-1 overflow-hidden">
              <PipelineFlow jobs={selectedRun.jobs} selectedJobId={selectedJob?.id ?? null} onJobClick={handleJobClick} />
            </div>
            {selectedJob && <JobPanel job={selectedJob} onClose={() => setSelectedJob(null)} />}
          </div>
        </main>
      </div>
    </div>
  );
}
