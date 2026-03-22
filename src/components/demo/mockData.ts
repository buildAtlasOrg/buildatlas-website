export type JobStatus = 'success' | 'failure' | 'skipped' | 'pending' | 'in_progress';

export interface Step {
  name: string;
  status: JobStatus;
  duration: string;
}

export interface Job {
  id: string;
  name: string;
  status: JobStatus;
  duration: string;
  durationSeconds: number;
  needs: string[];
  steps: Step[];
  logs: string;
  runner: string;
  annotations: string[];
}

export interface WorkflowRun {
  id: string;
  number: number;
  workflow: string;
  status: 'success' | 'failure' | 'in_progress';
  branch: string;
  commit: string;
  committer: string;
  ago: string;
  duration: string;
  trigger: 'push' | 'pull_request' | 'schedule' | 'workflow_dispatch';
  sha: string;
  jobs: Job[];
}

export interface Repo {
  id: string;
  name: string;
  org: string;
  language: string;
  languageColor: string;
  runs: WorkflowRun[];
}

const frontendRun48: WorkflowRun = {
  id: 'run48', number: 48, workflow: 'deploy.yml', status: 'in_progress',
  branch: 'feat/auth-refactor', commit: 'refactor: extract auth middleware',
  committer: 'alex-dev', ago: 'just now', duration: '—', trigger: 'push', sha: 'f2a9c3d',
  jobs: [
    { id: 'checkout', name: 'Checkout', status: 'success', duration: '2s', durationSeconds: 2, needs: [], runner: 'ubuntu-latest', annotations: [],
      steps: [{ name: 'Set up runner', status: 'success', duration: '1s' }, { name: 'actions/checkout@v4', status: 'success', duration: '1s' }],
      logs: 'Checked out feat/auth-refactor @ f2a9c3d' },
    { id: 'install', name: 'Install', status: 'success', duration: '6s', durationSeconds: 6, needs: ['checkout'], runner: 'ubuntu-latest', annotations: [],
      steps: [{ name: 'Setup Node.js 20', status: 'success', duration: '2s' }, { name: 'Restore cache (hit)', status: 'success', duration: '1s' }, { name: 'npm ci', status: 'success', duration: '3s' }],
      logs: 'npm ci completed in 3s (847 packages, cache restored)' },
    { id: 'lint', name: 'Lint', status: 'success', duration: '9s', durationSeconds: 9, needs: ['install'], runner: 'ubuntu-latest', annotations: [],
      steps: [{ name: 'Run ESLint', status: 'success', duration: '9s' }],
      logs: '✔ No ESLint warnings or errors.' },
    { id: 'typecheck', name: 'Type Check', status: 'in_progress', duration: '—', durationSeconds: 0, needs: ['install'], runner: 'ubuntu-latest', annotations: [],
      steps: [{ name: 'tsc --noEmit', status: 'in_progress', duration: '—' }],
      logs: 'Checking types...' },
    { id: 'test', name: 'Tests', status: 'pending', duration: '—', durationSeconds: 0, needs: ['install'], runner: 'ubuntu-latest', annotations: [],
      steps: [], logs: 'Waiting for required jobs to complete...' },
    { id: 'build', name: 'Build', status: 'pending', duration: '—', durationSeconds: 0, needs: ['lint', 'typecheck', 'test'], runner: 'ubuntu-latest', annotations: [],
      steps: [], logs: 'Waiting for required jobs to complete...' },
    { id: 'deploy', name: 'Deploy', status: 'pending', duration: '—', durationSeconds: 0, needs: ['build'], runner: 'ubuntu-latest', annotations: [],
      steps: [], logs: 'Waiting for required jobs to complete...' },
  ],
};

const frontendRun47: WorkflowRun = {
  id: 'run47', number: 47, workflow: 'deploy.yml', status: 'failure',
  branch: 'main', commit: 'fix: update JWT validation logic',
  committer: 'alex-dev', ago: '3 min ago', duration: '1m 43s', trigger: 'push', sha: 'abc1234',
  jobs: [
    { id: 'checkout', name: 'Checkout', status: 'success', duration: '2s', durationSeconds: 2, needs: [], runner: 'ubuntu-latest', annotations: [],
      steps: [{ name: 'Set up runner', status: 'success', duration: '1s' }, { name: 'actions/checkout@v4', status: 'success', duration: '1s' }],
      logs: 'Checked out main @ abc1234f' },
    { id: 'install', name: 'Install', status: 'success', duration: '18s', durationSeconds: 18, needs: ['checkout'], runner: 'ubuntu-latest', annotations: [],
      steps: [{ name: 'Setup Node.js 20', status: 'success', duration: '3s' }, { name: 'Restore node_modules cache', status: 'success', duration: '1s' }, { name: 'npm ci', status: 'success', duration: '14s' }],
      logs: 'added 847 packages, and audited 848 packages in 14s' },
    { id: 'lint', name: 'Lint', status: 'success', duration: '9s', durationSeconds: 9, needs: ['install'], runner: 'ubuntu-latest', annotations: [],
      steps: [{ name: 'Run ESLint', status: 'success', duration: '9s' }],
      logs: '✔ No ESLint warnings or errors.' },
    { id: 'typecheck', name: 'Type Check', status: 'success', duration: '22s', durationSeconds: 22, needs: ['install'], runner: 'ubuntu-latest', annotations: [],
      steps: [{ name: 'tsc --noEmit', status: 'success', duration: '22s' }],
      logs: 'Found 0 errors.' },
    { id: 'test', name: 'Tests', status: 'failure', duration: '43s', durationSeconds: 43, needs: ['install'], runner: 'ubuntu-latest',
      annotations: ['AuthService › should validate JWT tokens', 'Expected: true  Received: false', 'src/services/auth.test.ts:47'],
      steps: [{ name: 'Set up runner', status: 'success', duration: '0s' }, { name: 'Run Jest', status: 'failure', duration: '43s' }],
      logs: `FAIL  src/services/auth.test.ts\n\n  ● AuthService › should validate JWT tokens\n\n    expect(received).toBe(expected)\n    Expected: true\n    Received: false\n\n      47 |     expect(await validateToken(token)).toBe(true);\n\nTests: 1 failed, 18 passed` },
    { id: 'build', name: 'Build', status: 'skipped', duration: '—', durationSeconds: 0, needs: ['lint', 'typecheck', 'test'], runner: 'ubuntu-latest', annotations: [],
      steps: [], logs: 'Skipped — upstream job "Tests" failed.' },
    { id: 'deploy', name: 'Deploy', status: 'skipped', duration: '—', durationSeconds: 0, needs: ['build'], runner: 'ubuntu-latest', annotations: [],
      steps: [], logs: 'Skipped — upstream job "Build" failed.' },
  ],
};

const frontendRun46: WorkflowRun = {
  id: 'run46', number: 46, workflow: 'deploy.yml', status: 'success',
  branch: 'feat/dark-mode', commit: 'feat: add dark mode toggle',
  committer: 'sarah-m', ago: '2h ago', duration: '2m 31s', trigger: 'pull_request', sha: 'def5678',
  jobs: [
    { id: 'checkout', name: 'Checkout', status: 'success', duration: '2s', durationSeconds: 2, needs: [], runner: 'ubuntu-latest', annotations: [],
      steps: [{ name: 'actions/checkout@v4', status: 'success', duration: '2s' }], logs: 'Checked out feat/dark-mode @ def5678a' },
    { id: 'install', name: 'Install', status: 'success', duration: '6s', durationSeconds: 6, needs: ['checkout'], runner: 'ubuntu-latest', annotations: [],
      steps: [{ name: 'Setup Node.js 20', status: 'success', duration: '2s' }, { name: 'npm ci (cache hit)', status: 'success', duration: '3s' }], logs: 'npm ci completed in 3s' },
    { id: 'lint', name: 'Lint', status: 'success', duration: '8s', durationSeconds: 8, needs: ['install'], runner: 'ubuntu-latest', annotations: [],
      steps: [{ name: 'Run ESLint', status: 'success', duration: '8s' }], logs: '✔ No ESLint warnings or errors.' },
    { id: 'typecheck', name: 'Type Check', status: 'success', duration: '21s', durationSeconds: 21, needs: ['install'], runner: 'ubuntu-latest', annotations: [],
      steps: [{ name: 'tsc --noEmit', status: 'success', duration: '21s' }], logs: 'Found 0 errors.' },
    { id: 'test', name: 'Tests', status: 'success', duration: '38s', durationSeconds: 38, needs: ['install'], runner: 'ubuntu-latest', annotations: [],
      steps: [{ name: 'Run Jest', status: 'success', duration: '38s' }], logs: 'Tests: 19 passed, 0 failed\nTime: 3.847s' },
    { id: 'build', name: 'Build', status: 'success', duration: '45s', durationSeconds: 45, needs: ['lint', 'typecheck', 'test'], runner: 'ubuntu-latest', annotations: [],
      steps: [{ name: 'next build', status: 'success', duration: '45s' }], logs: '✓ Build complete.' },
    { id: 'deploy', name: 'Deploy', status: 'success', duration: '12s', durationSeconds: 12, needs: ['build'], runner: 'ubuntu-latest', annotations: [],
      steps: [{ name: 'Deploy to Vercel', status: 'success', duration: '12s' }], logs: '✓ Deployed to production.' },
  ],
};

const apiRun24: WorkflowRun = {
  id: 'api-run24', number: 24, workflow: 'ci.yml', status: 'failure',
  branch: 'feat/rate-limiting', commit: 'feat: add Redis rate limiting middleware',
  committer: 'priya-k', ago: '12 min ago', duration: '2m 8s', trigger: 'pull_request', sha: '3b8e1f0',
  jobs: [
    { id: 'checkout', name: 'Checkout', status: 'success', duration: '2s', durationSeconds: 2, needs: [], runner: 'ubuntu-22.04', annotations: [],
      steps: [{ name: 'actions/checkout@v4', status: 'success', duration: '2s' }], logs: 'Checked out feat/rate-limiting @ 3b8e1f0' },
    { id: 'install', name: 'Install', status: 'success', duration: '24s', durationSeconds: 24, needs: ['checkout'], runner: 'ubuntu-22.04', annotations: [],
      steps: [{ name: 'Setup Node.js 20', status: 'success', duration: '3s' }, { name: 'npm ci', status: 'success', duration: '21s' }], logs: 'added 312 packages in 21s' },
    { id: 'lint', name: 'Lint', status: 'success', duration: '7s', durationSeconds: 7, needs: ['install'], runner: 'ubuntu-22.04', annotations: [],
      steps: [{ name: 'Run ESLint', status: 'success', duration: '7s' }], logs: '✔ No ESLint warnings or errors.' },
    { id: 'test', name: 'Tests', status: 'failure', duration: '1m 35s', durationSeconds: 95, needs: ['install'], runner: 'ubuntu-22.04',
      annotations: ['RateLimiter › should reject requests above limit', 'Error: connect ECONNREFUSED 127.0.0.1:6379', 'Redis connection failed — is the service running?'],
      steps: [{ name: 'Start Postgres', status: 'success', duration: '4s' }, { name: 'Start Redis', status: 'failure', duration: '31s' }, { name: 'Run Jest', status: 'failure', duration: '1m 0s' }],
      logs: `FAIL  src/middleware/rateLimiter.test.ts\n\n  ● RateLimiter › should reject requests above limit\n\n    Error: connect ECONNREFUSED 127.0.0.1:6379\n\n      14 |     await redisClient.connect();\n\nTests: 1 failed, 33 passed` },
    { id: 'build', name: 'Build', status: 'skipped', duration: '—', durationSeconds: 0, needs: ['lint', 'test'], runner: 'ubuntu-22.04', annotations: [],
      steps: [], logs: 'Skipped — upstream job "Tests" failed.' },
    { id: 'deploy', name: 'Deploy Staging', status: 'skipped', duration: '—', durationSeconds: 0, needs: ['build'], runner: 'ubuntu-22.04', annotations: [],
      steps: [], logs: 'Skipped — upstream job "Build" failed.' },
  ],
};

const apiRun23: WorkflowRun = {
  id: 'api-run23', number: 23, workflow: 'ci.yml', status: 'success',
  branch: 'main', commit: 'chore: bump dependencies',
  committer: 'dependabot[bot]', ago: '1h ago', duration: '3m 14s', trigger: 'push', sha: '9f1e3a2',
  jobs: [
    { id: 'checkout', name: 'Checkout', status: 'success', duration: '2s', durationSeconds: 2, needs: [], runner: 'ubuntu-22.04', annotations: [],
      steps: [{ name: 'actions/checkout@v4', status: 'success', duration: '2s' }], logs: 'Checked out main @ 9f1e3a2' },
    { id: 'install', name: 'Install', status: 'success', duration: '22s', durationSeconds: 22, needs: ['checkout'], runner: 'ubuntu-22.04', annotations: [],
      steps: [{ name: 'Setup Node.js 20', status: 'success', duration: '3s' }, { name: 'npm ci', status: 'success', duration: '19s' }], logs: 'npm ci\nadded 312 packages in 19s' },
    { id: 'lint', name: 'Lint', status: 'success', duration: '7s', durationSeconds: 7, needs: ['install'], runner: 'ubuntu-22.04', annotations: [],
      steps: [{ name: 'Run ESLint', status: 'success', duration: '7s' }], logs: '✔ No ESLint warnings or errors.' },
    { id: 'test', name: 'Tests', status: 'success', duration: '1m 12s', durationSeconds: 72, needs: ['install'], runner: 'ubuntu-22.04', annotations: [],
      steps: [{ name: 'Start Postgres', status: 'success', duration: '4s' }, { name: 'Start Redis', status: 'success', duration: '3s' }, { name: 'Run Jest', status: 'success', duration: '1m 5s' }],
      logs: 'Tests: 34 passed, 0 failed\nCoverage: 86.4%\nTime: 65s' },
    { id: 'build', name: 'Build', status: 'success', duration: '38s', durationSeconds: 38, needs: ['lint', 'test'], runner: 'ubuntu-22.04', annotations: [],
      steps: [{ name: 'tsc build', status: 'success', duration: '38s' }], logs: 'Build complete. Output: dist/' },
    { id: 'deploy', name: 'Deploy Staging', status: 'success', duration: '20s', durationSeconds: 20, needs: ['build'], runner: 'ubuntu-22.04', annotations: [],
      steps: [{ name: 'Build Docker image', status: 'success', duration: '14s' }, { name: 'Push to ECR', status: 'success', duration: '6s' }],
      logs: 'Pushed acme/api:main-9f1e3a2 to ECR\nDeployed to ECS staging cluster' },
  ],
};

const infraRun16: WorkflowRun = {
  id: 'tf-run16', number: 16, workflow: 'terraform.yml', status: 'in_progress',
  branch: 'main', commit: 'feat: add CloudFront distribution',
  committer: 'devops-bot', ago: 'just now', duration: '—', trigger: 'workflow_dispatch', sha: 'e4d2c8b',
  jobs: [
    { id: 'validate', name: 'TF Validate', status: 'success', duration: '12s', durationSeconds: 12, needs: [], runner: 'ubuntu-latest', annotations: [],
      steps: [{ name: 'Setup Terraform 1.7', status: 'success', duration: '4s' }, { name: 'terraform init', status: 'success', duration: '5s' }, { name: 'terraform validate', status: 'success', duration: '3s' }],
      logs: 'Success! The configuration is valid.' },
    { id: 'plan', name: 'TF Plan', status: 'success', duration: '52s', durationSeconds: 52, needs: ['validate'], runner: 'ubuntu-latest', annotations: [],
      steps: [{ name: 'Configure AWS credentials', status: 'success', duration: '2s' }, { name: 'terraform plan', status: 'success', duration: '50s' }],
      logs: 'Plan: 5 to add, 2 to change, 0 to destroy.' },
    { id: 'apply', name: 'TF Apply', status: 'in_progress', duration: '—', durationSeconds: 0, needs: ['plan'], runner: 'ubuntu-latest', annotations: [],
      steps: [{ name: 'Configure AWS credentials', status: 'success', duration: '2s' }, { name: 'terraform apply', status: 'in_progress', duration: '—' }],
      logs: 'aws_cloudfront_distribution.cdn: Creating...\nStill creating... [1m0s elapsed]' },
  ],
};

const infraRun15: WorkflowRun = {
  id: 'tf-run15', number: 15, workflow: 'terraform.yml', status: 'success',
  branch: 'main', commit: 'feat: add staging RDS instance',
  committer: 'infra-team', ago: '6h ago', duration: '4m 22s', trigger: 'push', sha: 'c1b0a9f',
  jobs: [
    { id: 'validate', name: 'TF Validate', status: 'success', duration: '12s', durationSeconds: 12, needs: [], runner: 'ubuntu-latest', annotations: [],
      steps: [{ name: 'Setup Terraform 1.7', status: 'success', duration: '4s' }, { name: 'terraform init', status: 'success', duration: '5s' }, { name: 'terraform validate', status: 'success', duration: '3s' }],
      logs: 'Success! The configuration is valid.' },
    { id: 'plan', name: 'TF Plan', status: 'success', duration: '48s', durationSeconds: 48, needs: ['validate'], runner: 'ubuntu-latest', annotations: [],
      steps: [{ name: 'Configure AWS credentials', status: 'success', duration: '2s' }, { name: 'terraform plan', status: 'success', duration: '46s' }],
      logs: 'Plan: 3 to add, 0 to change, 0 to destroy.' },
    { id: 'apply', name: 'TF Apply', status: 'success', duration: '3m 22s', durationSeconds: 202, needs: ['plan'], runner: 'ubuntu-latest', annotations: [],
      steps: [{ name: 'Configure AWS credentials', status: 'success', duration: '2s' }, { name: 'terraform apply', status: 'success', duration: '3m 20s' }],
      logs: 'Apply complete! Resources: 3 added, 0 changed, 0 destroyed.' },
  ],
};

export const REPOS: Repo[] = [
  { id: 'r1', name: 'frontend', org: 'acme', language: 'TypeScript', languageColor: '#3178c6', runs: [frontendRun48, frontendRun47, frontendRun46] },
  { id: 'r2', name: 'api', org: 'acme', language: 'Node.js', languageColor: '#68a063', runs: [apiRun24, apiRun23] },
  { id: 'r3', name: 'infra', org: 'acme', language: 'Terraform', languageColor: '#7b42bc', runs: [infraRun16, infraRun15] },
];
