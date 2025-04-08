const text = document.getElementById("text");
        let start, session, testData, avg, sum = 0, counter = 0, failedCounter = 0, progStart;
        const classes = [
            "T-shirt/top",
            "Trouser",
            "Pullover",
            "Dress",
            "Coat",
            "Sandal",
            "Shirt",
            "Sneaker",
            "Bag",
            "Ankle boot",
        ]

        /*async function startSession() {
            start = performance.now();
            session = await ort.InferenceSession.create('./model.onnx');
            console.log("Session started")
            console.log(`Time it took to start session: ${performance.now() - start} ms`)
        }
        async function loadTestData() {
            fetch("output.txt")
                .then((res) => res.text())
                .then((text) => {
                    testData = JSON.parse(text)

                })
                .catch((e) => console.error(e));
        }
        async function main(x) {
            try {
                start = performance.now();
                const tensor1 = new ort.Tensor('float32', x.flat(), [1, 28, 28])
                const results = await session.run({ 'input': tensor1 });
                const data = results.output.data
                sum += performance.now() - start;
                counter++;
            } catch (e) {
                textFailed.innerHTML = (`failed to inference ONNX model: ${failedCounter++}.`);
            }
        }
        async function runAll() {
            await Promise.all([loadTestData(), startSession()]);
            for (var i = 0; i < testData.length; i++) {
                await main(testData[i])
            }

            text.innerHTML = (`Average time it took to analyze a tensor: ${sum / counter} ms<br>
                         Full time it took to analyze all tensors: ${sum} ms<br>
                         Full time of the program: ${performance.now() - progStart}`);

            console.log("end")
        }
        progStart = performance.now();
        console.log("start")
        runAll()*/

        const textEl = document.getElementById("text");
        let startRequest;
        async function loadTestData() {
            fetch("output.txt")
                .then((res) => res.text())
                .then((text) => {
                    progStart=performance.now()
                    testData = JSON.parse(text)
                    sendRequests()     
                })
                .catch((e) => console.error(e));
        }
        
        async function runAll() {
            await loadTestData()
            
        }
        
        
        async function sendRequests() {
            for (let i = 0; i < testData.length; i++) {
                startRequest = performance.now()
                await fetch("http://localhost:8080/", {
                    method: "POST",
                    body: JSON.stringify(testData[i]),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                    .then((response) => response.json())
                    .then((json) => {
                        sum+=performance.now()-startRequest
                        counter++;
                    });
            }
            textEl.innerHTML = (`Average time it took to analyze a tensor: ${sum / counter} ms<br>
                Full time it took to analyze all tensors: ${sum} ms<br>
                Full time of the program: ${performance.now() - progStart}`)
        }
        runAll();