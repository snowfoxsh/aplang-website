// utils.ts

// export function waitForWorkerResponse<T>(
//     worker: Worker,
//     timeoutMs: number
// ): Promise<T> {
//     return new Promise((resolve, reject) => {
//         // Set up the timeout
//         const timeoutId = setTimeout(() => {
//             reject(new Error('Worker response timed out'));
//         }, timeoutMs);
//
//         // Handle the message event
//         const handleMessage = (event: MessageEvent) => {
//             clearTimeout(timeoutId); // Clear the timeout if we get a response
//             resolve(event.data); // Resolve the promise with worker response
//         };
//
//         // Listen for the message from the worker, using `once` to automatically remove listener after first response
//         worker.addEventListener('message', handleMessage, { once: true });
//     });
// }

export function workerResponse<T>(worker: Worker): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        const handleMessage = (event: MessageEvent) => {
            resolve(event.data as T);
            worker.removeEventListener('message', handleMessage, {});
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

// export function workerResponse<T>(worker: Worker): Promise<T> {
//     return new Promise<T>((resolve, reject) => {
//         const handleMessage = (event: MessageEvent) => {
//             resolve(event.data as T);
//         };
//
//         const handleError = (error: ErrorEvent) => {
//             reject(error);
//         };
//
//         // Use the `once: true` option to ensure the listeners are automatically removed after they are triggered.
//         worker.addEventListener('message', handleMessage, { once: true });
//         worker.addEventListener('error', handleError, { once: true });
//     });
// }
//
//
// export const workerResponse = new Promise<any>((resolve, reject) => {
//     const messageHandler = (event: MessageEvent) => {
//         // Clean up event listeners
//         workerRef.current.removeEventListener('message', messageHandler);
//         workerRef.current.removeEventListener('error', errorHandler);
//         resolve(event.data);
//     };
//
//     const errorHandler = (error: ErrorEvent) => {
//         // Clean up event listeners
//         workerRef.current.removeEventListener('message', messageHandler);
//         workerRef.current.removeEventListener('error', errorHandler);
//         reject(error);
//     };
//
//     workerRef.current.addEventListener('message', messageHandler);
//     workerRef.current.addEventListener('error', errorHandler);
// });
//
// export function timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
//     // Create a promise that rejects after the specified timeout
//     const timeoutPromise = new Promise<T>((_, reject) =>
//         setTimeout(() => reject(new Error('Timed out')), ms)
//     );
//     // Race the timeout promise and the original promise
//     return Promise.race([promise, timeoutPromise]);
// }

// export function timeout<T>(fn: () => Promise<T> | T, timeout: number): Promise<T> {
//     return new Promise<T>((resolve, reject) => {
//         const timer = setTimeout(() => {
//             reject(new Error('Function timed out'));
//         }, timeout);
//
//         Promise.resolve(fn())
//             .then((value) => {
//                 clearTimeout(timer);
//                 resolve(value);
//             })
//             .catch((err) => {
//                 clearTimeout(timer);
//                 reject(err);
//             });
//     });
// }


// export async function timeout<T>(fn: () => Promise<T>, timeout: number): Promise<T> {
//     const timeoutPromise = new Promise<T>((_, reject) => {
//         setTimeout(() => {
//             reject(new Error('Function timed out'));
//         }, timeout);
//     });
//
//     try {
//         return await Promise.race([fn(), timeoutPromise]);
//     } finally {
//         clearTimeout(timeoutPromise);
//     }
// }

// export async function timeout<T, Args extends any[]>(
//     fn: (...args: Args) => Promise<T>,
//     args: Args,
//     timeout: number
// ): Promise<T> {
//     let timer: NodeJS.Timeout;
//
//     const timeoutPromise = new Promise<T>((_, reject) => {
//         timer = setTimeout(() => {
//             reject(new Error('Function timed out'));
//         }, timeout);
//     });
//
//     try {
//         const result = await Promise.race([fn(...args), timeoutPromise]);
//         return result;
//     } finally {
//         clearTimeout(timer);
//     }
// }


// export async function timeout<T, Args extends any[]>(
//     fn: (...args: Args) => Promise<T>,
//     args: Args,
//     timeout: number
// ): Promise<T> {
//     let timer: NodeJS.Timeout;
//
//     const timeoutPromise = new Promise<T>((_, reject) => {
//         timer = setTimeout(() => {
//             reject(new Error('Function timed out'));
//         }, timeout);
//     });
//
//     const fnPromise = fn(...args);
//
//     // Clear the timer immediately when fnPromise settles
//     fnPromise.finally(() => {
//         clearTimeout(timer);
//     });
//
//     return Promise.race([fnPromise, timeoutPromise]);
// }

// export async function timeout<T, Args extends any[]>(
//     fn: (...args: Args) => Promise<T>,
//     args: Args,
//     timeout: number
// ): Promise<T> {
//     let timer: NodeJS.Timeout;
//
//     // Create a timeout promise that rejects after the specified timeout
//     const timeoutPromise = new Promise<T>((_, reject) => {
//         timer = setTimeout(() => {
//             reject(new Error('Function timed out'));
//         }, timeout);
//     });
//
//     // Execute the function with the provided arguments
//     const fnPromise = fn(...args);
//
//     // Clear the timer when fnPromise settles
//     fnPromise.finally(() => {
//         clearTimeout(timer);
//     });
//
//     // Race the function execution against the timeout
//     return Promise.race([fnPromise, timeoutPromise]);
// }

export function timeout<T, Args extends any[]>(
    fn: (...args: Args) => Promise<T>,
    args: Args,
    timeoutDuration: number
): Promise<T> {
    let timer: NodeJS.Timeout;

    return new Promise<T>((resolve, reject) => {
        // Start the timeout timer
        timer = setTimeout(() => {
            reject(new Error('Function timed out'));
        }, timeoutDuration);

        // Execute the function
        fn(...args).then(
            (result) => {
                clearTimeout(timer);
                resolve(result);
            },
            (error) => {
                clearTimeout(timer);
                reject(error);
            }
        );
    });
}

// export function timeout<T>(
//     promise: Promise<T>,
//     timeoutDuration: number
// ): Promise<T> {
//     let timer: NodeJS.Timeout;
//
//     return new Promise<T>((resolve, reject) => {
//         // Start the timeout timer
//         timer = setTimeout(() => {
//             reject(new Error('Function timed out'));
//         }, timeoutDuration);
//
//         // When the promise settles, clear the timer
//         promise.then(
//             (result) => {
//                 clearTimeout(timer);
//                 resolve(result);
//             },
//             (error) => {
//                 clearTimeout(timer);
//                 reject(error);
//             }
//         );
//     });
// }
