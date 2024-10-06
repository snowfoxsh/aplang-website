// utils.ts

// export function workerResponse<T>(worker: Worker): Promise<T> {
//     return new Promise<T>((resolve, reject) => {
//         const handleMessage = (event: MessageEvent) => {
//             resolve(event.data as T);
//             worker.removeEventListener('message', handleMessage);
//             worker.removeEventListener('error', handleError);
//         };
//
//         const handleError = (error: ErrorEvent) => {
//             reject(error);
//             worker.removeEventListener('message', handleMessage);
//             worker.removeEventListener('error', handleError);
//         };
//
//         worker.addEventListener('message', handleMessage);
//         worker.addEventListener('error', handleError);
//     });
// }

export function workerResponse<T>(worker: Worker): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        const handleMessage = (event: MessageEvent) => {
            resolve(event.data as T);
        };

        const handleError = (error: ErrorEvent) => {
            reject(error);
        };

        // Use the `once: true` option to ensure the listeners are automatically removed after they are triggered.
        worker.addEventListener('message', handleMessage, { once: true });
        worker.addEventListener('error', handleError, { once: true });
    });
}