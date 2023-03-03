function getUserInput() {
    var userInput = alert("Please type in the input bar or use the microphone for audio input",);
}

    let output_a = document.getElementById("output1");
    let output_b = document.getElementById("output2");
    let output_c = document.getElementById("output3");
    let input_k = document.getElementById("input");

function showOutput() {
    let input_a = document.getElementById("input").value;
    if (input_a == "") {
        output_a.style.display = "none";
    } else {
        output_a.style.display = "block";
    }
}

        const record = document.getElementById("record-button");
        const stopRecord = document.getElementById("stop-record");

        navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {
        handlerFunction(stream)})

    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.querySelector('#input').value;
    fetch('/symptom-checker?input=' + input).then(response => response.json()).then(data => {
        let diagnosis = "";
        let first = "";
        let second = "";
        let third = "";
        diagnosis = data.response;
        if (diagnosis.includes("MEAL PLAN")){
        [first, second] = diagnosis.split("MEAL PLAN")
        second = "MEAL PLAN" + second;
        if (second.includes("EXERCISE")){
        [second,third] = second.split("EXERCISE");
        third = "EXERCISE" + third;
        }
        }
        const output_a = document.querySelector('#output1');
        const output_b = document.querySelector('#output2');
        const output_c = document.querySelector('#output3');
        if (second != "")
        {
        output_b.style.display = "block";
        }
        if (third != "")
        {
        output_c.style.display = "block";
        }
        output_a.innerHTML = `<p>${first}</p>`;
        output_b.innerHTML = `<p>${second}</p>`;
        output_c.innerHTML = `<p>${third}</p>`;
        diagnosis = "";
    });
});

        let rec;

        function handlerFunction(stream) {
        rec = new MediaRecorder(stream);
        rec.ondataavailable = e => {
        audioChunks.push(e.data);
        if (rec.state == "inactive") {
            let blob = new Blob(audioChunks, {type: 'audio/mpeg-3'});
            //        recordedAudio.src =URL.createObjectURL(blob);
            //      recordedAudio.controls=true;
            //    recordedAudio.autoplay=true;
            sendData(blob)
            }
            }  
        }

        function sendData(blob) {
        const formA = new FormData();
        formA.append("audio_file", blob);
        // const input = document.querySelector('#input').value;
        fetch('/to_whisper', {
            method: 'POST',
            body: formA
     }).then(response => response.json()).then(data => {
        let diagnosis = "";
        let first = "";
        let second = "";
        let third = "";
        diagnosis = data.response;
        if (diagnosis.includes("MEAL PLAN")){
        [first, second] = diagnosis.split("MEAL PLAN")
        second = "MEAL PLAN" + second;
        if (second.includes("EXERCISE")){
        [second,third] = second.split("EXERCISE");
        third = "EXERCISE" + third;
        }
        }
        const output_a = document.querySelector('#output1');
        const output_b = document.querySelector('#output2');
        const output_c = document.querySelector('#output3');
        if (second != "")
        {
        output_b.style.display = "block";
        }
        if (third != "")
        {
        output_c.style.display = "block";
        }
        output_a.innerHTML = `<p>${first}</p>`;
        output_b.innerHTML = `<p>${second}</p>`;
        output_c.innerHTML = `<p>${third}</p>`;
        diagnosis = "";
        });
    }

    stopRecord.disabled = true;
    record.onclick = e => {
    console.log("record button clicked");
     record.disabled = true;
     stopRecord.disabled = false;
     audioChunks = [];
     let g= "recording...";
     input_k.innerHTML = `<p>${g}</p>`;
     rec.start();
     output_a.style.display = "block";
}

    stopRecord.onclick = e => {
    console.log("stop button clicked")
     record.disabled = false;
     let g = "recording stopped";
     input_k.innerHTML = `<p>${g}</p>`;
     rec.stop();
 }
