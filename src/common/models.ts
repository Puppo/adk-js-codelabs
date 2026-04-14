import type { LlmRequest, LlmResponse } from "@google/adk";
import { BaseLlm, LLMRegistry } from "@google/adk";

const MODELS: string[] = (process.env.MODELS ?? "gemini-3-flash-preview")
  .split(",")
  .map((m) => m.trim());

export class FallbackLlm extends BaseLlm {
  private readonly models: string[];

  constructor(models: string[]) {
    super({ model: models[0] });
    this.models = models;
  }

  async *generateContentAsync(
    llmRequest: LlmRequest,
    stream?: boolean,
  ): AsyncGenerator<LlmResponse, void> {
    let lastError: Error | undefined;

    const originalModel = llmRequest.model;

    for (const modelName of this.models) {
      try {
        const llm = LLMRegistry.newLlm(modelName);
        // Override llmRequest.model so the inner Gemini class
        // sends the request to the correct model endpoint
        llmRequest.model = modelName;
        const generator = llm.generateContentAsync(llmRequest, stream);
        for await (const response of generator) {
          yield response;
        }
        return; // success — stop trying other models
      } catch (error) {
        lastError = error as Error;
        console.warn(
          `Model "${modelName}" failed: ${lastError.message}. Trying next model...`,
        );
      }
    }

    // Restore original model name before throwing
    llmRequest.model = originalModel;

    throw lastError ?? new Error("All models failed");
  }

  async connect(llmRequest: LlmRequest) {
    const llm = LLMRegistry.newLlm(this.models[0]);
    return llm.connect(llmRequest);
  }
}

export function getModel(): BaseLlm {
  if (MODELS.length === 1) {
    return LLMRegistry.newLlm(MODELS[0]);
  }
  return new FallbackLlm(MODELS);
}
