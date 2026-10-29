<div align="center">

# 🌐 pi-opencode-provider

**46+ models via [opencode](https://opencode.ai/)**

_GPT, Claude, Gemini, GLM, MiniMax, Kimi, DeepSeek — unified API for [pi](https://github.com/earendil-works/pi-coding-agent)._

[![pi extension](https://img.shields.io/badge/pi-extension-blueviolet)](https://github.com/earendil-works/pi-coding-agent)
[![license](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)

</div>

## Pi 1.0 compatibility

Tested with Pi **1.0.0**. Host-provided packages remain wildcard peers; development uses exact SDK pins.
Run `bun run test:pi` for offline manifest, catalog, lifecycle and streaming checks. To test an installed host, set `PI1_HOST_PACKAGE` to its package directory; add `PI1_HOST_ENTRY=bundle` for its bundled CLI runtime. The probe stubs all network requests and never uses a live provider endpoint.

---

## Features

- **82+ AI Models** including GPT-5.x Codex, Claude Opus/Sonnet/Haiku, Gemini 3.x, GLM, MiniMax, Kimi K2.5, and more
- **Multi-API Support** — uses the correct API protocol per model (Anthropic, OpenAI Responses, OpenAI Completions, Gemini)
- **Cost Tracking** with per-model pricing for budget management
- **Reasoning Models** with thinking level maps for proper effort control
- **Vision Support** for image-capable models
- **Quiet live model sync** — Models refresh from the opencode API in the background, at most hourly and by one pi process at a time ([details](#model-sync))

## Installation

### Option 1: Using `pi install` (Recommended)

Install from npm:

```bash
pi install @monotykamary/pi-opencode-provider
```

Or directly from GitHub:

```bash
pi install https://github.com/monotykamary/pi-opencode-provider
```

Then set your API key and run pi:
```bash
# Recommended: add to auth.json
# See Authentication section below

# Or set as environment variable
export OPENCODE_API_KEY=your-api-key-here

pi
```

### Option 2: Manual Clone

1. Clone this repository:
   ```bash
   git clone https://github.com/monotykamary/pi-opencode-provider.git
   cd pi-opencode-provider
   ```

2. Set your opencode API key:
   ```bash
   # Recommended: add to auth.json
   # See Authentication section below

   # Or set as environment variable
   export OPENCODE_API_KEY=your-api-key-here
   ```

3. Run pi with the extension:
   ```bash
   pi -e /path/to/pi-opencode-provider
   ```

## Available Models

| Model | API | Type | Context | Max Tokens | Input Cost | Output Cost |
|-------|-----|------|---------|------------|------------|-------------|
| Beam Free | Completions | Text | 1.0M | 131K | — | — |
| Big Pickle | Completions | Text | 200K | 32K | — | — |
| Claude Fable 5 | Anthropic | Text + Image | 1.0M | 128K | $10.00 | $50.00 |
| Claude Fable 5.1 | Anthropic | Text + Image | 1.0M | 128K | $10.00 | $50.00 |
| Claude Haiku 4.5 | Anthropic | Text + Image | 200K | 64K | $1.00 | $5.00 |
| Claude Haiku 5.5 | Anthropic | Text + Image | 1.0M | 128K | $0.10 | $0.50 |
| Claude Opus 4.5 | Anthropic | Text + Image | 200K | 64K | $5.00 | $25.00 |
| Claude Opus 4.6 | Anthropic | Text + Image | 1.0M | 128K | $5.00 | $25.00 |
| Claude Opus 4.7 | Anthropic | Text + Image | 1.0M | 128K | $5.00 | $25.00 |
| Claude Opus 4.8 | Anthropic | Text + Image | 1.0M | 128K | $5.00 | $25.00 |
| Claude Opus 5 | Anthropic | Text + Image | 1.0M | 128K | $5.00 | $25.00 |
| Claude Opus 5.5 | Anthropic | Text + Image | 1.0M | 128K | $4.00 | $20.00 |
| Claude Sonnet 4.5 | Anthropic | Text + Image | 200K | 64K | $3.00 | $15.00 |
| Claude Sonnet 4.6 | Anthropic | Text + Image | 1.0M | 64K | $3.00 | $15.00 |
| Claude Sonnet 5 | Anthropic | Text + Image | 1.0M | 128K | $2.00 | $10.00 |
| Claude Sonnet 5.5 | Anthropic | Text + Image | 1.0M | 128K | $2.00 | $10.00 |
| DeepSeek V4 Pro | Completions | Text | 1.0M | 384K | $1.74 | $3.48 |
| DeepSeek V4.1 Flash | Completions | Text + Image | 1.0M | 384K | $0.30 | $1.20 |
| DeepSeek V4.1 Flash Free | Completions | Text + Image | 200K | 32K | — | — |
| Flint 40B Free | Completions | Text | 262K | 66K | — | — |
| Gemini 3 Flash | Gemini | Text + Image | 1.0M | 66K | $0.50 | $3.00 |
| Gemini 3 Pro | Gemini | Text + Image | 1.0M | 66K | $1.25 | $10.00 |
| Gemini 3.1 Pro Preview | Gemini | Text + Image | 1.0M | 66K | $2.00 | $12.00 |
| Gemini 3.5 Flash | Gemini | Text + Image | 1.0M | 66K | $1.50 | $9.00 |
| Gemini 3.5 Flash Lite | Gemini | Text + Image | 1.0M | 66K | $0.30 | $2.50 |
| Gemini 3.6 Flash | Gemini | Text + Image | 1.0M | 66K | $1.50 | $7.50 |
| Gemini 3.7 Flash | Gemini | Text + Image | 1.0M | 66K | $1.50 | $7.50 |
| Gemini 3.8 Flash | Gemini | Text + Image | 1.0M | 66K | $1.50 | $7.50 |
| Gemini 4 Argon | Gemini | Text + Image | 1.0M | 66K | $2.00 | $10.00 |
| GLM-5 | Completions | Text | 205K | 131K | $1.00 | $3.20 |
| GLM-5.1 | Completions | Text | 205K | 131K | $1.40 | $4.40 |
| GLM-5.2 | Completions | Text | 1.0M | 131K | $1.40 | $4.40 |
| GLM-5.3 | Completions | Text | 1.0M | 131K | $1.40 | $4.40 |
| GLM-5.3-Flash | Completions | Text + Image | 1.0M | 131K | $0.15 | $0.50 |
| GLM-5.3-Flash Free | Completions | Text + Image | 200K | 32K | — | — |
| GPT-5 | Responses | Text + Image | 400K | 128K | $1.07 | $8.50 |
| GPT-5 Codex | Responses | Text + Image | 400K | 128K | $1.07 | $8.50 |
| GPT-5 Nano | Responses | Text + Image | 400K | 128K | $0.05 | $0.40 |
| GPT-5.1 | Responses | Text + Image | 400K | 128K | $1.07 | $8.50 |
| GPT-5.1 Codex | Responses | Text + Image | 400K | 128K | $1.07 | $8.50 |
| GPT-5.1 Codex Max | Responses | Text + Image | 400K | 128K | $1.25 | $10.00 |
| GPT-5.1 Codex Mini | Responses | Text + Image | 400K | 128K | $0.25 | $2.00 |
| GPT-5.2 | Responses | Text + Image | 400K | 128K | $1.75 | $14.00 |
| GPT-5.2 Codex | Responses | Text + Image | 400K | 128K | $1.75 | $14.00 |
| GPT-5.3 Codex | Responses | Text + Image | 400K | 128K | $1.75 | $14.00 |
| GPT-5.3 Codex Spark | Responses | Text | 128K | 128K | $1.75 | $14.00 |
| GPT-5.4 | Responses | Text + Image | 272K | 128K | $2.50 | $15.00 |
| GPT-5.4 Mini | Responses | Text + Image | 400K | 128K | $0.75 | $4.50 |
| GPT-5.4 Nano | Responses | Text + Image | 400K | 128K | $0.20 | $1.25 |
| GPT-5.4 Pro | Responses | Text + Image | 1.1M | 128K | $30.00 | $180.00 |
| GPT-5.5 | Responses | Text + Image | 1.1M | 128K | $5.00 | $30.00 |
| GPT-5.5 Pro | Responses | Text + Image | 1.1M | 128K | $30.00 | $180.00 |
| GPT-5.6 Luna | Responses | Text + Image | 1.1M | 128K | $0.20 | $1.20 |
| GPT-5.6 Sol | Responses | Text + Image | 1.1M | 128K | $4.00 | $20.00 |
| GPT-5.6 Terra | Responses | Text + Image | 1.1M | 128K | $2.00 | $12.00 |
| GPT-6 Astra | Responses | Text + Image | 1.1M | 128K | $10.00 | $50.00 |
| GPT-6 Luna | Responses | Text + Image | 1.1M | 128K | $0.10 | $0.50 |
| GPT-6 Sol | Responses | Text + Image | 1.1M | 128K | $2.00 | $10.00 |
| GPT-6.1 Sol | Responses | Text + Image | 1.1M | 128K | $2.00 | $10.00 |
| Grok 4.5 | Responses | Text + Image | 500K | 500K | $2.00 | $6.00 |
| Grok 4.6 | Responses | Text + Image | 500K | 500K | $2.00 | $6.00 |
| Grok 4.7 | Responses | Text + Image | 500K | 500K | $2.00 | $6.00 |
| Grok Build 0.1 | Completions | Text + Image | 256K | 256K | $1.00 | $2.00 |
| Grok Code | Completions | Text + Image | 256K | 256K | $1.00 | $2.00 |
| Kimi K2.5 | Completions | Text + Image | 262K | 66K | $0.60 | $3.00 |
| Kimi K2.6 | Completions | Text + Image | 262K | 66K | $0.95 | $4.00 |
| Kimi K2.7 Code | Completions | Text + Image | 262K | 262K | $0.95 | $4.00 |
| Kimi K3 | Completions | Text + Image | 1.0M | 131K | $3.00 | $15.00 |
| MiMo-V2.6-Flash Free | Completions | Text + Image | 200K | 32K | — | — |
| MiniMax-M2.5 | Completions | Text | 205K | 131K | $0.30 | $1.20 |
| MiniMax-M2.7 | Completions | Text | 205K | 131K | $0.30 | $1.20 |
| MiniMax-M3 | Completions | Text + Image | 512K | 128K | $0.30 | $1.20 |
| Mistral Large 4 | Completions | Text + Image | 524K | 262K | $0.68 | $2.09 |
| Muse Spark 1.2 | Responses | Text + Image | 1.0M | 131K | $1.25 | $4.25 |
| Muse Spark 1.3 | Responses | Text + Image | 1.0M | 131K | $1.25 | $4.25 |
| Muse Wonder | Responses | Text + Image | 1.0M | 131K | $4.00 | $20.00 |
| Nemotron 3.5 Lightning Free | Completions | Text | 262K | 262K | — | — |
| Nemotron 3.5 Super VL Free | Completions | Text + Image | 1.0M | 131K | — | — |
| Qwen3.5 Plus | Anthropic | Text + Image | 262K | 66K | $0.20 | $1.20 |
| Qwen3.6 Plus | Anthropic | Text + Image | 262K | 66K | $0.50 | $3.00 |
| Qwen3.8 Flash | Anthropic | Text + Image | 1.0M | 131K | $0.15 | $0.47 |
| Qwen3.8 Max | Completions | Text + Image | 262K | 131K | $2.00 | $6.00 |
*Costs are per million tokens. Prices subject to change - check [opencode.ai](https://opencode.ai) for current pricing.*

## Usage

After loading the extension, use the `/model` command in pi to select your preferred model:

```
/model
```

Then select "opencode" as the provider and choose from the available models.

The default model for this provider is `kimi-k2.6` (matching pi core's built-in default); use `/model` to pick another.

## Authentication

The opencode API key can be configured in multiple ways. Credentials are resolved in this order:

1. **CLI flag** — `--api-key` (highest priority, runtime override)
2. **`auth.json`** (recommended) — Add to `~/.pi/agent/auth.json`:
   ```json
   { "opencode": { "type": "api_key", "key": "your-api-key" } }
   ```
   The `key` field supports literals, `$ENV_VAR`/`${ENV_VAR}` interpolation, and `!command` execution. See [pi's providers docs](https://github.com/earendil-works/pi-coding-agent/blob/main/docs/providers.md) for details.
3. **Environment variable** — `OPENCODE_API_KEY`

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENCODE_API_KEY` | No | Your opencode.ai API key (fallback if not in auth.json) |
| `PI_PROVIDER_SYNC_TTL_MS` | No | Model sync freshness window in ms (default `3600000`; `0` = revalidate every session start) |

## Model sync

Startup never waits on the network. pi starts with the cached catalog (`~/.pi/agent/cache/opencode-models.json`,
falling back to the bundled `models.json`) and revalidates against `/zen/v1/models` in the background — only when:

- an opencode API key is configured (no key, no request),
- the cache is older than 1 hour, missing, or was fetched with a different API key, and
- no other pi process is already refreshing it (an `opencode-models.lock` file next to the cache).

So `/new`, `/reload`, `pi -p` and fan-out child agents share one cache instead of each calling the API; a
session that skips the fetch still picks up a cache another process refreshed. A failed refresh is retried after
5 minutes at the earliest. `PI_PROVIDER_SYNC_TTL_MS` changes the window (`0` revalidates on every session start).
Only a hash fingerprint of the key is stored (`opencode-models.sync.json`), never the key itself.

## Configuration

Add to your pi configuration for automatic loading:

```json
{
  "extensions": [
    "/path/to/pi-opencode-provider"
  ]
}
```

## License

MIT
