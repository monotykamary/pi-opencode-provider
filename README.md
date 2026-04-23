# pi-opencode-provider

A [pi](https://github.com/badlogic/pi-mono) extension that registers [opencode](https://opencode.ai/) as a custom provider. Access GPT, Claude, Gemini, GLM, MiniMax, Kimi, and more through a unified API.

## Features

- **35+ AI Models** including GPT-5.x Codex, Claude Opus/Sonnet/Haiku, Gemini 3.x, GLM, MiniMax, Kimi K2.5, and more
- **Unified API** via opencode.ai's OpenAI-compatible completions endpoint
- **Cost Tracking** with per-model pricing for budget management
- **Reasoning Models** support for advanced reasoning capabilities
- **Vision Support** for image-capable models

## Installation

### Option 1: Using `pi install` (Recommended)

Install directly from GitHub:

```bash
pi install git:github.com/monotykamary/pi-opencode-provider
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

| Model | Type | Context | Max Tokens | Input Cost | Output Cost |
|-------|------|---------|------------|------------|-------------|
| Big Pickle | Text | 200K | 128K | Free | Free |
| Claude Haiku 3.5 | Text + Image | 200K | 8K | $0.80 | $4.00 |
| Claude Haiku 4.5 | Text + Image | 200K | 64K | $1.00 | $5.00 |
| Claude Opus 4.1 | Text + Image | 200K | 32K | $15.00 | $75.00 |
| Claude Opus 4.5 | Text + Image | 200K | 64K | $5.00 | $25.00 |
| Claude Opus 4.6 | Text + Image | 1.0M | 128K | $5.00 | $25.00 |
| Claude Opus 4.7 | Text + Image | 1.0M | 128K | $5.00 | $25.00 |
| Claude Sonnet 4 | Text + Image | 1.0M | 64K | $3.00 | $15.00 |
| Claude Sonnet 4.5 | Text + Image | 1.0M | 64K | $3.00 | $15.00 |
| Claude Sonnet 4.6 | Text + Image | 1.0M | 64K | $3.00 | $15.00 |
| Gemini 3 Flash | Text + Image | 1.0M | 66K | $0.50 | $3.00 |
| Gemini 3.1 Pro Preview | Text + Image | 1.0M | 66K | $2.00 | $12.00 |
| GLM-5 | Text | 205K | 131K | $1.00 | $3.20 |
| GLM-5.1 | Text | 205K | 131K | $1.40 | $4.40 |
| GPT-5 | Text + Image | 400K | 128K | $1.07 | $8.50 |
| GPT-5.1 | Text + Image | 400K | 128K | $1.07 | $8.50 |
| GPT-5.2 | Text + Image | 400K | 128K | $1.75 | $14.00 |
| GPT-5.4 | Text + Image | 1.1M | 128K | $2.50 | $15.00 |
| GPT-5 Codex | Text + Image | 400K | 128K | $1.07 | $8.50 |
| GPT-5.1 Codex | Text + Image | 400K | 128K | $1.07 | $8.50 |
| GPT-5.1 Codex Max | Text + Image | 400K | 128K | $1.25 | $10.00 |
| GPT-5.1 Codex Mini | Text + Image | 400K | 128K | $0.25 | $2.00 |
| GPT-5.2 Codex | Text + Image | 400K | 128K | $1.75 | $14.00 |
| GPT-5.3 Codex | Text + Image | 400K | 128K | $1.75 | $14.00 |
| GPT-5.3 Codex Spark | Text | 128K | 128K | $1.75 | $14.00 |
| GPT-5.4 Mini | Text + Image | 400K | 128K | $0.75 | $4.50 |
| GPT-5 Nano | Text + Image | 400K | 128K | Free | Free |
| GPT-5.4 Nano | Text + Image | 400K | 128K | $0.20 | $1.25 |
| GPT-5.4 Pro | Text + Image | 1.1M | 128K | $30.00 | $180.00 |
| Kimi K2.5 | Text + Image | 262K | 66K | $0.60 | $3.00 |
| MiniMax M2.5 | Text | 205K | 131K | $0.30 | $1.20 |
| MiniMax M2.5 Free | Text | 205K | 131K | Free | Free |
| Nemotron 3 Super Free | Text | 205K | 128K | Free | Free |
| Qwen3.5 Plus | Text + Image | 262K | 66K | $0.20 | $1.20 |
| Qwen3.6 Plus | Text + Image | 262K | 66K | $0.50 | $3.00 |
*Costs are per million tokens. Prices subject to change - check [opencode.ai](https://opencode.ai) for current pricing.*

## Usage

After loading the extension, use the `/model` command in pi to select your preferred model:

```
/model
```

Then select "opencode" as the provider and choose from the available models.

## Authentication

The opencode API key can be configured in multiple ways (resolved in this order):

1. **`auth.json`** (recommended) — Add to `~/.pi/agent/auth.json`:
   ```json
   { "opencode": { "type": "api_key", "key": "your-api-key" } }
   ```
   The `key` field supports literal values, env var names, and shell commands (prefix with `!`). See [pi's auth file docs](https://github.com/badlogic/pi-mono) for details.
2. **Runtime override** — Use the `--api-key` CLI flag
3. **Environment variable** — Set `OPENCODE_API_KEY`

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENCODE_API_KEY` | No | Your opencode.ai API key (fallback if not in auth.json) |

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
