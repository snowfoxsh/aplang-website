import init, {bind_io, aplang} from "../wasm/wasm_target.js";


// copy fom worker res because cant import it for some reason
// export function workerResponse(worker) {
//   return new Promise<T>((resolve, reject) => {
//     const handleMessage = (event) => {
//       resolve(event.data);
//     };
//
//     const handleError = (error) => {
//       reject(error);
//     };
//
//     // Use the `once: true` option to ensure the listeners are automatically removed after they are triggered.
//     worker.addEventListener('message', handleMessage, { once: true });
//     worker.addEventListener('error', handleError, { once: true });
//   });
// }
//
let wasmModule = null;

// Initialize WASM
async function initApLang() {
  wasmModule = await init();

  // let input = (prompt) => {
  //   postMessage({ type: "input", prompt: prompt});
  //   let response = await workerResponse(self);
    // postMessage({ type: "response", response: "res" });
  // };

  let input = (prompt) => {

    // postMessage({type: "log", message: "debug (worker): input hook has run\n"}) // todo: remove debug
    const maxStringLength = 1024;
    const bufferSize = 4 + maxStringLength;

    /*
     struct sharedBuffer {
       i32 str_size; // byte length of str
       i32[] data_str; // -> u8[]
     }
     */
      // let sharedBuffer = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * bufferSize);
    let sharedBuffer = new SharedArrayBuffer(bufferSize);

    postMessage({type: "debugLog", message: `debug (worker): shared buffer created\n`})
    let sharedArray = new Int32Array(sharedBuffer);
    new DataView(sharedBuffer).setInt32(0, -1); // string size cannot be < 0

    // postMessage({type: "debugLog", message: `debug (worker): view of shared array: ${sharedArray}\n`})
    postMessage({type: "input", sharedBuffer: sharedBuffer, maxStringLength: maxStringLength, prompt: prompt});

    // don't panic, freeze the worker until our data is ready
    Atomics.wait(sharedArray, 0, -1);
    // postMessage({type: "debugLog", message: `debug (worker): received response from the thing SharedArrayBuffer ${sharedArray}\n`})

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

    // start after then length
    // const rawStringBytes = new Uint8Array(sharedArray, 4, length);

    // let rawStringBytes = new Uint8Array(sharedBuffer, 4, length + 4);
    // try {
    // const regularBufferSlice = sharedBuffer.slice(4, 4 + length);
    // const sharedBackedU8Bytes = new Uint8Array(sharedBuffer, 4, length);

    // // this is the dumbest shit ever
    // // copy the data into unbacked array buffer
    // let unbackedStringBuffer = new ArrayBuffer(length);
    // let unbackedStringBufferView = new DataView(unbackedStringBuffer);
    // // fuck web workers
    // for (let i = 0; i < length; i++) {
    //
    // }






    // const rawStringBytes = new Uint8Array(regularBufferSlice);
    // console.log(rawStringBytes);


    // } catch (e) {
    //   postMessage({type: "debugLog", message: `error (worker): could not cast bytes to Uint8Array, ${e}`});
    // }

    // let resultString = new TextDecoder().decode(rawStringBytes);
    // console.log(resultString);

    // try {
    //   let decoder = new TextDecoder();
    //
    //   console.log("hello world");
    //   let resultString = decoder.decode(rawStringBytes);
    //   console.log("something");
    //   console.log(resultString);
    //   return resultString;
    // } catch (e) {
    //   // console.log("error is: ", e);
    //   postMessage({type: "error", message: `${e}`})
    // }

    // send it back for debug
    // postMessage({ type: "inputResponse", resultString: resultString});

    // let resultString = " l  asdfa";
    // return resultString;
  }


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