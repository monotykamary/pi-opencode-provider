/**
 * opencode Provider Extension
 *
 * Registers opencode as a custom provider using the openai-completions API.
 * Base URL: https://opencode.ai/zen/v1
 *
 * Usage:
 *   # Option 1: Store in auth.json (recommended)
 *   # Add to ~/.pi/agent/auth.json:
 *   #   "opencode": { "type": "api_key", "key": "your-api-key" }
 *
 *   # Option 2: Set as environment variable
 *   export OPENCODE_API_KEY=your-api-key
 *
 *   # Run pi with the extension
 *   pi -e /path/to/pi-opencode-provider
 *
 * Then use /model to select from available models
 */

import type { ExtensionAPI, ModelRegistry } from "@mariozechner/pi-coding-agent";

// ─── API Key Resolution (via ModelRegistry) ────────────────────────────────────

/**
 * Cached API key resolved from ModelRegistry.
 *
 * Pi's core resolves the key via ModelRegistry before making requests,
 * but we also cache it here so we can resolve it in contexts where the resolved
 * key isn't directly available (e.g. future features like quota fetching) and
 * to make the dependency explicit.
 *
 * Resolution order (via ModelRegistry.getApiKeyForProvider):
 *   1. Runtime override (CLI --api-key)
 *   2. auth.json stored credentials (manual entry in ~/.pi/agent/auth.json)
 *   3. OAuth tokens (auto-refreshed)
 *   4. Environment variable (from auth.json or provider config)
 */
let cachedApiKey: string | undefined;

/**
 * Resolve the opencode API key via ModelRegistry and cache the result.
 * Called on session_start and whenever ctx.modelRegistry is available.
 */
async function resolveApiKey(modelRegistry: ModelRegistry): Promise<void> {
  cachedApiKey = await modelRegistry.getApiKeyForProvider("opencode") ?? undefined;
}

export default function (pi: ExtensionAPI) {
  // Resolve API key via ModelRegistry on session start
  pi.on("session_start", async (_event, ctx) => {
    await resolveApiKey(ctx.modelRegistry);
  });

	pi.registerProvider("opencode", {
		baseUrl: "https://opencode.ai/zen/v1",
		apiKey: "OPENCODE_API_KEY",
		api: "openai-completions",

		models: [
		{
			id: "gpt-5.1-codex-max",
			name: "GPT-5.1 Codex Max",
			reasoning: true,
			input: ["text","image"],
			cost: {
				input: 1.25,
				output: 10,
				cacheRead: 0.125,
				cacheWrite: 0,
			},
			contextWindow: 400000,
			maxTokens: 128000,
		},
		{
			id: "claude-haiku-4-5",
			name: "Claude Haiku 4.5",
			reasoning: true,
			input: ["text","image","pdf"],
			cost: {
				input: 1,
				output: 5,
				cacheRead: 0.1,
				cacheWrite: 1.25,
			},
			contextWindow: 200000,
			maxTokens: 64000,
		},
		{
			id: "kimi-k2.5",
			name: "Kimi K2.5",
			reasoning: true,
			input: ["text","image","video"],
			cost: {
				input: 0.6,
				output: 3,
				cacheRead: 0.08,
				cacheWrite: 0,
			},
			contextWindow: 262144,
			maxTokens: 65536,
		},
		{
			id: "glm-5",
			name: "GLM-5",
			reasoning: true,
			input: ["text"],
			cost: {
				input: 1,
				output: 3.2,
				cacheRead: 0.2,
				cacheWrite: 0,
			},
			contextWindow: 204800,
			maxTokens: 131072,
		},
		{
			id: "gemini-3.1-pro",
			name: "Gemini 3.1 Pro Preview",
			reasoning: true,
			input: ["text","image","video","audio","pdf"],
			cost: {
				input: 2,
				output: 12,
				cacheRead: 0.2,
				cacheWrite: 0,
			},
			contextWindow: 1048576,
			maxTokens: 65536,
		},
		{
			id: "claude-sonnet-4-6",
			name: "Claude Sonnet 4.6",
			reasoning: true,
			input: ["text","image","pdf"],
			cost: {
				input: 3,
				output: 15,
				cacheRead: 0.3,
				cacheWrite: 3.75,
			},
			contextWindow: 1000000,
			maxTokens: 64000,
		},
		{
			id: "claude-opus-4-7",
			name: "Claude Opus 4.7",
			reasoning: true,
			input: ["text","image","pdf"],
			cost: {
				input: 5,
				output: 25,
				cacheRead: 0.5,
				cacheWrite: 6.25,
			},
			contextWindow: 1000000,
			maxTokens: 128000,
		},
		{
			id: "gpt-5-nano",
			name: "GPT-5 Nano",
			reasoning: true,
			input: ["text","image"],
			cost: {
				input: 0,
				output: 0,
				cacheRead: 0,
				cacheWrite: 0,
			},
			contextWindow: 400000,
			maxTokens: 128000,
		},
		{
			id: "gpt-5.3-codex",
			name: "GPT-5.3 Codex",
			reasoning: true,
			input: ["text","image","pdf"],
			cost: {
				input: 1.75,
				output: 14,
				cacheRead: 0.175,
				cacheWrite: 0,
			},
			contextWindow: 400000,
			maxTokens: 128000,
		},
		{
			id: "minimax-m2.5-free",
			name: "MiniMax M2.5 Free",
			reasoning: true,
			input: ["text"],
			cost: {
				input: 0,
				output: 0,
				cacheRead: 0,
				cacheWrite: 0,
			},
			contextWindow: 204800,
			maxTokens: 131072,
		},
		{
			id: "gpt-5.2",
			name: "GPT-5.2",
			reasoning: true,
			input: ["text","image"],
			cost: {
				input: 1.75,
				output: 14,
				cacheRead: 0.175,
				cacheWrite: 0,
			},
			contextWindow: 400000,
			maxTokens: 128000,
		},
		{
			id: "big-pickle",
			name: "Big Pickle",
			reasoning: true,
			input: ["text"],
			cost: {
				input: 0,
				output: 0,
				cacheRead: 0,
				cacheWrite: 0,
			},
			contextWindow: 200000,
			maxTokens: 128000,
		},
		{
			id: "claude-opus-4-1",
			name: "Claude Opus 4.1",
			reasoning: true,
			input: ["text","image","pdf"],
			cost: {
				input: 15,
				output: 75,
				cacheRead: 1.5,
				cacheWrite: 18.75,
			},
			contextWindow: 200000,
			maxTokens: 32000,
		},
		{
			id: "qwen3.6-plus",
			name: "Qwen3.6 Plus",
			reasoning: true,
			input: ["text","image","video"],
			cost: {
				input: 0.5,
				output: 3,
				cacheRead: 0.05,
				cacheWrite: 0.625,
			},
			contextWindow: 262144,
			maxTokens: 65536,
		},
		{
			id: "gpt-5.4-mini",
			name: "GPT-5.4 Mini",
			reasoning: true,
			input: ["text","image","pdf"],
			cost: {
				input: 0.75,
				output: 4.5,
				cacheRead: 0.075,
				cacheWrite: 0,
			},
			contextWindow: 400000,
			maxTokens: 128000,
		},
		{
			id: "claude-3-5-haiku",
			name: "Claude Haiku 3.5",
			reasoning: false,
			input: ["text","image","pdf"],
			cost: {
				input: 0.8,
				output: 4,
				cacheRead: 0.08,
				cacheWrite: 1,
			},
			contextWindow: 200000,
			maxTokens: 8192,
		},
		{
			id: "glm-5.1",
			name: "GLM-5.1",
			reasoning: true,
			input: ["text"],
			cost: {
				input: 1.4,
				output: 4.4,
				cacheRead: 0.26,
				cacheWrite: 0,
			},
			contextWindow: 204800,
			maxTokens: 131072,
		},
		{
			id: "gpt-5.4-nano",
			name: "GPT-5.4 Nano",
			reasoning: true,
			input: ["text","image","pdf"],
			cost: {
				input: 0.2,
				output: 1.25,
				cacheRead: 0.02,
				cacheWrite: 0,
			},
			contextWindow: 400000,
			maxTokens: 128000,
		},
		{
			id: "gpt-5.2-codex",
			name: "GPT-5.2 Codex",
			reasoning: true,
			input: ["text","image","pdf"],
			cost: {
				input: 1.75,
				output: 14,
				cacheRead: 0.175,
				cacheWrite: 0,
			},
			contextWindow: 400000,
			maxTokens: 128000,
		},
		{
			id: "gpt-5.1-codex-mini",
			name: "GPT-5.1 Codex Mini",
			reasoning: true,
			input: ["text","image"],
			cost: {
				input: 0.25,
				output: 2,
				cacheRead: 0.025,
				cacheWrite: 0,
			},
			contextWindow: 400000,
			maxTokens: 128000,
		},
		{
			id: "claude-sonnet-4",
			name: "Claude Sonnet 4",
			reasoning: true,
			input: ["text","image","pdf"],
			cost: {
				input: 3,
				output: 15,
				cacheRead: 0.3,
				cacheWrite: 3.75,
			},
			contextWindow: 1000000,
			maxTokens: 64000,
		},
		{
			id: "gemini-3-flash",
			name: "Gemini 3 Flash",
			reasoning: true,
			input: ["text","image","video","audio","pdf"],
			cost: {
				input: 0.5,
				output: 3,
				cacheRead: 0.05,
				cacheWrite: 0,
			},
			contextWindow: 1048576,
			maxTokens: 65536,
		},
		{
			id: "gpt-5.1",
			name: "GPT-5.1",
			reasoning: true,
			input: ["text","image"],
			cost: {
				input: 1.07,
				output: 8.5,
				cacheRead: 0.107,
				cacheWrite: 0,
			},
			contextWindow: 400000,
			maxTokens: 128000,
		},
		{
			id: "gpt-5.4-pro",
			name: "GPT-5.4 Pro",
			reasoning: true,
			input: ["text","image","pdf"],
			cost: {
				input: 30,
				output: 180,
				cacheRead: 30,
				cacheWrite: 0,
			},
			contextWindow: 1050000,
			maxTokens: 128000,
		},
		{
			id: "claude-opus-4-5",
			name: "Claude Opus 4.5",
			reasoning: true,
			input: ["text","image","pdf"],
			cost: {
				input: 5,
				output: 25,
				cacheRead: 0.5,
				cacheWrite: 6.25,
			},
			contextWindow: 200000,
			maxTokens: 64000,
		},
		{
			id: "gpt-5-codex",
			name: "GPT-5 Codex",
			reasoning: true,
			input: ["text","image"],
			cost: {
				input: 1.07,
				output: 8.5,
				cacheRead: 0.107,
				cacheWrite: 0,
			},
			contextWindow: 400000,
			maxTokens: 128000,
		},
		{
			id: "gpt-5.3-codex-spark",
			name: "GPT-5.3 Codex Spark",
			reasoning: true,
			input: ["text"],
			cost: {
				input: 1.75,
				output: 14,
				cacheRead: 0.175,
				cacheWrite: 0,
			},
			contextWindow: 128000,
			maxTokens: 128000,
		},
		{
			id: "minimax-m2.5",
			name: "MiniMax M2.5",
			reasoning: true,
			input: ["text"],
			cost: {
				input: 0.3,
				output: 1.2,
				cacheRead: 0.06,
				cacheWrite: 0,
			},
			contextWindow: 204800,
			maxTokens: 131072,
		},
		{
			id: "claude-sonnet-4-5",
			name: "Claude Sonnet 4.5",
			reasoning: true,
			input: ["text","image","pdf"],
			cost: {
				input: 3,
				output: 15,
				cacheRead: 0.3,
				cacheWrite: 3.75,
			},
			contextWindow: 1000000,
			maxTokens: 64000,
		},
		{
			id: "gpt-5",
			name: "GPT-5",
			reasoning: true,
			input: ["text","image"],
			cost: {
				input: 1.07,
				output: 8.5,
				cacheRead: 0.107,
				cacheWrite: 0,
			},
			contextWindow: 400000,
			maxTokens: 128000,
		},
		{
			id: "qwen3.5-plus",
			name: "Qwen3.5 Plus",
			reasoning: true,
			input: ["text","image","video"],
			cost: {
				input: 0.2,
				output: 1.2,
				cacheRead: 0.02,
				cacheWrite: 0.25,
			},
			contextWindow: 262144,
			maxTokens: 65536,
		},
		{
			id: "nemotron-3-super-free",
			name: "Nemotron 3 Super Free",
			reasoning: true,
			input: ["text"],
			cost: {
				input: 0,
				output: 0,
				cacheRead: 0,
				cacheWrite: 0,
			},
			contextWindow: 204800,
			maxTokens: 128000,
		},
		{
			id: "gpt-5.1-codex",
			name: "GPT-5.1 Codex",
			reasoning: true,
			input: ["text","image"],
			cost: {
				input: 1.07,
				output: 8.5,
				cacheRead: 0.107,
				cacheWrite: 0,
			},
			contextWindow: 400000,
			maxTokens: 128000,
		},
		{
			id: "gpt-5.4",
			name: "GPT-5.4",
			reasoning: true,
			input: ["text","image","pdf"],
			cost: {
				input: 2.5,
				output: 15,
				cacheRead: 0.25,
				cacheWrite: 0,
			},
			contextWindow: 1050000,
			maxTokens: 128000,
		},
		{
			id: "claude-opus-4-6",
			name: "Claude Opus 4.6",
			reasoning: true,
			input: ["text","image","pdf"],
			cost: {
				input: 5,
				output: 25,
				cacheRead: 0.5,
				cacheWrite: 6.25,
			},
			contextWindow: 1000000,
			maxTokens: 128000,
		}
		],
	});
}
