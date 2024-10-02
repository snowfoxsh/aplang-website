// utils.ts

export function workerResponse<T>(worker: Worker): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        const handleMessage = (event: MessageEvent) => {
            resolve(event.data as T);
            worker.removeEventListener('message', handleMessage);
            worker.removeEventListener('error', handleError);
        };

        const handleError = (error: ErrorEvent) => {
            reject(error);
            worker.removeEventListener('message', handleMessage);
            worker.removeEventListener('error', handleError);
        };

        worker.addEventListener('message', handleMessage);
        worker.addEventListener('error', handleError);
    });
}
