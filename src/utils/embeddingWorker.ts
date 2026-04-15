import { pipeline, env } from '@xenova/transformers';

// Allow model download and browser cache
// Skip local file system check for web builds
env.allowLocalModels = false;
env.useBrowserCache = true;

class PipelineSingleton {
    static task: any = 'feature-extraction';
    static model = 'Xenova/all-MiniLM-L6-v2';
    static instance: any = null;

    static async getInstance(progress_callback: any = undefined) {
        if (this.instance === null) {
            this.instance = await pipeline(this.task, this.model, { progress_callback });
        }
        return this.instance;
    }
}

self.addEventListener('message', async (event) => {
    // We expect { type: 'embed', payload: { text, id } }
    const { type, payload } = event.data;

    if (type === 'embed') {
        const text = payload.text;
        try {
            const generateEmbedding = await PipelineSingleton.getInstance((x: any) => {
                self.postMessage({ status: 'progress', message: x });
            });

            // Run the model (pooling='mean', normalize=true for cosine similarity)
            const output = await generateEmbedding(text, { pooling: 'mean', normalize: true });

            self.postMessage({
                status: 'complete',
                id: payload.id,
                embedding: Array.from(output.data),
                text: text
            });
        } catch (e) {
            self.postMessage({ status: 'error', error: String(e) });
        }
    }
});
