# Changelog

## 1.0.37

- Pin Pi SDK development dependencies to 1.0.0 while retaining wildcard host peers.
- Verify real manifest loading, provider catalogs, startup/shutdown and native/bundled Pi hosts offline.
- Exercise real transport adapters with Unicode text, tool calls, empty responses, usage, request hooks and cancellation; no live provider calls.
- Do not resurrect retired zero-output classifier aliases as chat models; preserve native classifier/image operations and valid custom chat models.

## 1.0.35

- Test against Pi 0.99.0 and declare host-provided modules as wildcard peers.
- Replace no-op checks with scoped TypeScript checks and an offline real-Pi loader, provider-registration, and session-lifecycle smoke test.

- Preserve Pi native classifier/image operations when replacing the OpenCode chat catalog.
