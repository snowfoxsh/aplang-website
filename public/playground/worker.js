import init, {bind_io, aplang} from "../wasm/wasm_target.js";

let wasmModule = null;

// Initialize WASM
async function initApLang() {
  wasmModule = await init();

  let input = (prompt) => {
    const maxStringLength = 1024;
    const bufferSize = 4 + maxStringLength;

    /*
     struct sharedBuffer {
       i32 str_size; // byte length of str
       i32[] data_str; // -> u8[]
     }
     */
    let sharedBuffer = new SharedArrayBuffer(bufferSize);

    postMessage({type: "debugLog", message: `debug (worker): shared buffer created\n`})
    let sharedArray = new Int32Array(sharedBuffer);
    new DataView(sharedBuffer).setInt32(0, -1); // string size cannot be < 0

    postMessage({type: "input", sharedBuffer: sharedBuffer, maxStringLength: maxStringLength, prompt: prompt});

    // don't panic, freeze the worker until our data is ready
    Atomics.wait(sharedArray, 0, -1);

    // grab first 4 bytes as i32
    const length = new Int32Array(sharedBuffer, 0, 1)[0];

    // create an non SharedArrayBuffer to decode the text (it cannot be backed for some reason)
    const unbackedBuffer = new ArrayBuffer(length);
    const unbackedStringBytes = new Uint8Array(unbackedBuffer);

    // copy the bytes from the SharedArrayBuffer
    unbackedStringBytes.set(new Uint8Array(sharedBuffer, 4, length));
    console.log()

    let resultString = new TextDecoder().decode(unbackedStringBytes);
    console.log("result string", resultString);
    return resultString;
  }


  bind_io(
    (output, error) => postMessage({ type: 'log', message: output , error: error }),  // Send output back to main thread
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