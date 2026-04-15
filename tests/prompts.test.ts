import { describe, it, expect } from 'vitest';
import { textPrompt } from '../src/utils/prompts';

describe('System Prompts', () => {
    it('should generate a text prompt containing the provided clipboard context', () => {
        const prompt = textPrompt("TEST_MOCK_CLIPBOARD_CONTEXT");
        expect(prompt).toContain("TEST_MOCK_CLIPBOARD_CONTEXT");
    });

    it('should include strictly formatted XML tool definitions for executing agents', () => {
        const prompt = textPrompt("context");
        expect(prompt).toContain("<tool>search_files</tool>");
        expect(prompt).toContain("<tool>open_app</tool>");
    });
});
