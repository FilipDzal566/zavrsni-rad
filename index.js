const http = require('http');
const ort = require('onnxruntime-node');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString(); // convert buffer to string
        });

        req.on('end', () => {
            const receivedData = JSON.parse(body);
            console.log('Received from client:', receivedData);

            // Do something with the data
            main(result)

            // Send response back to client
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result));
        });
    } else {
        res.writeHead(404);
        res.end();
    }
});

async function startSession() {
    console.log("ses")
    const session = await ort.InferenceSession.create('./model.onnx');
    console.log("sesion started")
}

async function main(x) {
    try {
        const tensor1 = new ort.Tensor('float32', x.flat(), [1, 28, 28])
        const results = await session.run({ 'input': tensor1 });
        const data = results.output.data
    } catch (e) {
        console.log(`failed to inference ONNX model: ${failedCounter++}.`);
    }
}
startSession();
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});