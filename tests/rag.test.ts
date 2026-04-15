import { describe, it, expect } from 'vitest';

// Extracted from ragDb for pure testing isolated from IndexedDB hooks
function dotProduct(vecA: number[], vecB: number[]) {
    return vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
}

describe('RAG Math Execution', () => {
    it('should calculate identical vectors smoothly', () => {
        const vecA = [1, 0, 0];
        const vecB = [1, 0, 0];
        expect(dotProduct(vecA, vecB)).toBe(1);
    });

    it('should calculate perfectly orthogonal vectors to zero similarity', () => {
        const vecA = [1, 0, 0];
        const vecC = [0, 1, 0];
        expect(dotProduct(vecA, vecC)).toBe(0);
    });

    it('should handle fractional dimensional inputs during RAG queries properly', () => {
        const vecA = [0.5, 0.5, 0.5];
        const vecB = [0.5, 0.5, 0.5];
        expect(dotProduct(vecA, vecB)).toBe(0.75); // 0.25 + 0.25 + 0.25
    });
});
