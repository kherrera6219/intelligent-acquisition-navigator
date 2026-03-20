## Summary

<!-- 1-3 bullet points describing what this PR does and why -->

-
-

## Type of Change

- [ ] `feat` — new feature
- [ ] `fix` — bug fix
- [ ] `docs` — documentation only
- [ ] `chore` — build, deps, config (no production code change)
- [ ] `refactor` — code change that is not a fix or feature
- [ ] `perf` — performance improvement
- [ ] `test` — adding or fixing tests

## Related Issues

<!-- Link any related issues: Closes #123 -->

## Test Plan

<!-- Describe how you tested this change. Check all that apply. -->

- [ ] Dev server runs without errors (`npm run dev`)
- [ ] ESLint passes with zero errors (`npm run lint`)
- [ ] Production build succeeds (`npm run build`)
- [ ] Manually tested the affected feature(s) in the browser
- [ ] New/changed Supabase queries return expected data
- [ ] AI-dependent flows tested with a real `VITE_ANTHROPIC_API_KEY`
- [ ] No regressions in adjacent features

## Screenshots / Screen Recordings

<!-- For UI changes, include before/after screenshots or a short recording -->

## Checklist

- [ ] PR title follows Conventional Commits format (`type(scope): description`)
- [ ] No secrets or API keys are committed (all via `VITE_*` env vars)
- [ ] New pages have a route in `App.tsx` and an entry in `navigationItems.ts`
- [ ] New Supabase tables have a type-safe hook in `src/hooks/`
- [ ] Write operations are gated behind `accessControl.hasPermission()`
- [ ] All auth and mutation events are logged via `auditLogger.log()`
- [ ] All interactive elements have `aria-label` or visible text labels
- [ ] Structured AI outputs are validated with Zod before use in business logic
