import init, {bind_io, aplang} from "../wasm/wasm_target.js";


let wasmModule = null;

// Initialize WASM
async function initApLang() {
  wasmModule = await init();
  bind_io(
    (output) => postMessage({ type: 'log', message: output }),  // Send output back to main thread
    (error) => postMessage({ type: 'error', message: error })   // Send errors back to main thread
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