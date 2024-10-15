import init, {bind_io, aplang} from "../wasm/wasm_target.js";


// copy fom worker res because cant import it for some reason
export function workerRespons(worker) {
  return new Promise<T>((resolve, reject) => {
    const handleMessage = (event) => {
      resolve(event.data);
    };

    const handleError = (error) => {
      reject(error);
    };

    // Use the `once: true` option to ensure the listeners are automatically removed after they are triggered.
    worker.addEventListener('message', handleMessage, { once: true });
    worker.addEventListener('error', handleError, { once: true });
  });
}

let wasmModule = null;

// Initialize WASM
async function initApLang() {
  wasmModule = await init();

  // let input = (prompt) => {
  //   postMessage({ type: "input", prompt: prompt});
  //   let response = await workerResponse(self);
    // postMessage({ type: "response", response: "res" });
  // };

  let input = (pass) => {
    return pass
  };

  bind_io(
    (output, error) => postMessage({ type: 'log', message: output , error: error }),  // Send output back to main thread
    // (error) => postMessage({ type: 'error', message: error })   // Send errors back to main thread
    input
  );
}

self.onmessage = async (event) => {
  const {type, code} = event.data;

  if (type === 'init') {
    await initApLang();
    postMessage({ type: "ready"});
    return;
  }

  if (type === "run") {
    postMessage({type: "started"});

    if (!wasmModule) {
      postMessage({type: "error", message: "wasm module was not loaded"});
      return;
    }

    try {
      const startTime = performance.now();
      // Run the ApLang code
      aplang(code);
      const endTime = performance.now();
      const executionTime = (endTime - startTime);

      // Send execution time back to the main thread
      postMessage({ type: 'complete', time: executionTime });
    } catch (error) {
      postMessage({ type: 'error', message: error.message });
    }

  }
}