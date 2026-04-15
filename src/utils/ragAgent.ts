import { saveDocumentChunk, getExistingDocumentIds, searchDocuments } from './ragDb';
import { invoke } from "@tauri-apps/api/core";

const worker = new Worker(new URL('./embeddingWorker.ts', import.meta.url), {
    type: 'module'
});

export async function initializeRAG() {
    try {
        console.log("Starting RAG Indexer...");
        const existingIds = await getExistingDocumentIds();

        let chunks: { path: string, content: string }[] = [];
        try {
            chunks = await invoke('index_local_documents');
        } catch (e) {
            console.error("Failed to invoke backend indexer. Make sure walkdir is set up.", e);
            return;
        }

        const chunksToIndex = chunks.filter(c => !existingIds.has(c.path));

        if (chunksToIndex.length > 0) {
            console.log(`Need to index ${chunksToIndex.length} new chunks...`);

            for (const chunk of chunksToIndex) {
                await embedTextAndSave(chunk.path, chunk.content);
            }
            console.log("RAG Indexing complete!");
        } else {
            console.log("RAG Indexer: No new files to index.");
        }
    } catch (e) {
        console.error("Failed to initialize RAG", e);
    }
}

function embedTextAndSave(id: string, text: string): Promise<void> {
    return new Promise((resolve) => {
        const handler = (e: MessageEvent) => {
            if (e.data.status === 'complete' && e.data.id === id) {
                saveDocumentChunk(id, id.split(':')[0], text, e.data.embedding).then(() => {
                    worker.removeEventListener('message', handler);
                    resolve();
                });
            } else if (e.data.status === 'error') {
                console.error("Worker embedding failed", e.data.error);
                worker.removeEventListener('message', handler);
                resolve();
            }
        };
        worker.addEventListener('message', handler);
        worker.postMessage({ type: 'embed', payload: { id, text } });
    });
}

export function embedQuery(query: string): Promise<number[]> {
    return new Promise((resolve, reject) => {
        const id = 'QUERY-' + Date.now();
        const handler = (e: MessageEvent) => {
            if (e.data.status === 'complete' && e.data.id === id) {
                worker.removeEventListener('message', handler);
                resolve(e.data.embedding);
            } else if (e.data.status === 'error') {
                worker.removeEventListener('message', handler);
                reject(e.data.error);
            }
        };
        worker.addEventListener('message', handler);
        worker.postMessage({ type: 'embed', payload: { id, text: query } });
    });
}

export async function performSemanticSearch(query: string, topK: number = 10) {
    const embedding = await embedQuery(query);
    return await searchDocuments(embedding, topK);
}
