import { openDB } from 'idb';

const DB_NAME = 'TarsRagDB';
const DB_VERSION = 1;

export async function initDB() {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('documents')) {
                db.createObjectStore('documents', { keyPath: 'id' });
            }
        },
    });
}

function dotProduct(vecA: number[], vecB: number[]) {
    return vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
}

export async function saveDocumentChunk(id: string, path: string, content: string, embedding: number[]) {
    const db = await initDB();
    await db.put('documents', { id, path, content, embedding });
}

export async function getExistingDocumentIds() {
    const db = await initDB();
    return new Set(await db.getAllKeys('documents'));
}

export async function searchDocuments(queryEmbedding: number[], topK: number = 10, threshold: number = 0.25) {
    const db = await initDB();
    const allDocs = await db.getAll('documents');

    if (allDocs.length === 0) return [];

    const scoredDocs = allDocs.map(doc => ({
        ...doc,
        score: dotProduct(doc.embedding, queryEmbedding)
    }));

    // Filter out completely irrelevant documents to prevent "hallucination" context
    const validDocs = scoredDocs.filter((d: any) => d.score >= threshold);
    validDocs.sort((a, b) => b.score - a.score);
    return validDocs.slice(0, topK);
}
