# @base44/vite-plugin

Vite plugin for Base44 applications running in sandboxed iframes. Provides error tracking, HMR notifications, visual editing, navigation tracking, and legacy SDK compatibility.

## Installation

```bash
npm install @base44/vite-plugin
```

## Usage

```ts
// vite.config.ts
import base44 from "@base44/vite-plugin";

export default {
  plugins: [
    base44({
      legacySDKImports: false,
      hmrNotifier: true,
      navigationNotifier: true,
      visualEditAgent: true,
    }),
  ],
};
```

### Options

| Option               | Type      | Default | Description                                         |
| -------------------- | --------- | ------- | --------------------------------------------------- |
| `legacySDKImports`   | `boolean` | `false` | Enable legacy SDK import resolution via compat layer |
| `hmrNotifier`        | `boolean` | `false` | Notify parent window of HMR update lifecycle         |
| `navigationNotifier` | `boolean` | `false` | Track URL changes and notify parent window           |
| `visualEditAgent`    | `boolean` | `false` | Enable interactive visual element editing            |

## Architecture

### Plugin Composition

The plugin registers four sub-plugins when running in a sandbox (`MODAL_SANDBOX_ID` is set):

1. **base44** — Core configuration: path aliases (`@/` → `/src/`), environment variables, dependency optimization, and legacy SDK import resolution.
2. **iframe-hmr** — Sets CORS and `frame-ancestors` headers to allow iframe embedding.
3. **error-overlay** — Replaces Vite's default error overlay with a custom one that reports errors to the parent window.
4. **html-injections** — Injects sandbox-side scripts into the HTML.

Outside a sandbox, only the core plugin runs (with optional API proxy support via `VITE_BASE44_APP_BASE_URL`).

### Build-status endpoint

An opt-in, dev-only (`apply: "serve"`) endpoint that reports the last build /
compile / HMR error observed by the dev server. It exists solely to let the
preview backend poll for post-load errors — it is **never** part of a
production build.

Enable it by setting the environment variable at dev-server start:

```bash
BASE44_BUILD_STATUS_ENABLED=1
```

The env var is checked when the plugin assembles its plugin list (config load),
so the generated app's `vite.config.js` does not need to change. When it is
unset, the build-status sub-plugin is not added to the pipeline at all — its
`configureServer` hook is never reached.

When enabled, the plugin serves:

```
GET /__build_status
```

- **Loopback-only.** Requests from any non-loopback `remoteAddress`
  (`127.0.0.1`, `::1`, `::ffff:127.0.0.1`) fall through as if the route did
  not exist. Non-`GET` methods fall through too.
- **Always `200`.** Health lives in the body, not the status code — a `500`
  would trip the preview proxy's own error path. The body is:

  ```json
  { "ok": true, "error": null }
  ```

  or, when an error is outstanding:

  ```json
  { "ok": false, "error": { "message": "…", "frame": "…", "loc": { "…": 0 } } }
  ```

- **Scrubbed.** Even though the endpoint is loopback-only (the backend relays a
  trimmed form onward), the error is size-capped and absolute filesystem paths
  are stripped down to basenames.
- **Fail-open.** All setup and request handling is wrapped in `try/catch` so a
  bug in this plugin can never break the dev server.

How it works: `configureServer` wraps the HMR send channel
(`server.hot ?? server.ws`). An `error` payload records the last error; a
successful `update` or `full-reload` clears it.

**Cold-start caveat & scope.** Errors thrown *before any client has connected*
are not sent over the HMR channel, so a boot-time transform failure may briefly
read `ok: true`. That window is already covered server-side by the existing
`dev_server_error_classifier` (install / start failures surface as `409`). This
endpoint's job is **post-load HMR / compile errors**, not cold-start failures.

### Sandbox Injections

In **dev mode**, individual `<script type="module" src="...">` tags are injected for each feature, loaded directly from `node_modules`:

- **Error handlers** (`unhandled-errors-handlers.js`) — Global `error` and `unhandledrejection` listeners that report to the parent via `postMessage`.
- **Mount observer** (`sandbox-mount-observer.js`) — `MutationObserver` that detects when instrumented elements (`data-source-location`) are rendered.
- **HMR notifier** (`sandbox-hmr-notifier.js`) — Forwards Vite's `beforeUpdate`/`afterUpdate` events to the parent.
- **Navigation notifier** (`navigation-notifier.js`) — Intercepts `pushState`, `replaceState`, and `popstate` to track URL changes.

These are self-executing scripts — they run as soon as the browser loads them, with no setup call required.

The **visual edit agent** is the exception. It's a larger module (~560 lines) that is bundled separately via `tsup` into `dist/statics/index.mjs` and loaded via a dynamic `import()`. This allows local dev iteration: add `?sandbox-bridge=local` to load it from a local HTTPS dev server instead of `node_modules`.

In **production**, an inline analytics tracker script is injected instead.

### Local Development (Visual Edit Agent)

To iterate on the visual edit agent locally without publishing:

1. Generate local HTTPS certificates:
   ```bash
   mkcert localhost
   ```

2. Start the dev server (with optional watch mode):
   ```bash
   npm run dev       # serve dist/statics/ on https://localhost:3201
   npm run dev -- -w # same, with auto-rebuild on changes
   ```

3. Add `?sandbox-bridge=local` to your app's URL to load the agent from `localhost:3201` instead of `node_modules`.

### Legacy SDK Compatibility

When `legacySDKImports` is enabled, imports of `/entities`, `/functions`, `/integrations`, and `/agents` are resolved to compatibility modules in `compat/`. These use `Proxy` objects to route calls to the Base44 SDK client.

## Building

```bash
npm run build          # TypeScript compilation (plugin)
npm run build:bridge   # tsup bundle (bridge ES module for browsers)
```

## License

MIT
