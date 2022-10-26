// this was once commented out and included in index.html script tag due to one image in a batch giving a CORS error

 //handle read and process photos
async function loaded(reader) {
    // photos = document.getElementById('photos');
    // console.log(photos);
    // console.log(reader);
    const response = await fetch('https://hf.space/embed/jph00/pets/+/api/predict/', {
      method: "POST", body: JSON.stringify({ "data": [reader.result] }),
      headers: { "Content-Type": "application/json" }
    });
    const json = await response.json();
    // console.log(reader);
    console.log("json", json);
   
   // storing data from API call
    const label = json['data'][0]['confidences'][0]['label'];
    const conf = 100*(json['data'][0]['confidences'][0]['confidence']).toPrecision(4);
    console.log(label);
    console.log(conf);
    // displaying data from API call
    const div = document.createElement('div');
    div.innerHTML = `<br/><img src="${reader.result}" width="300"> <p>${label}</p> <p>${conf}<p>`
    document.body.append(div);
    
  }

  // read files uploaded
  function read(file) {
    console.log(file);
    const reader = new FileReader();
    // console.log(file);
    reader.addEventListener('load', () => loaded(reader))
    reader.readAsDataURL(file);
    // console.log(file);
  }
  photos.addEventListener('input', () => { [...photos.files].map(read) });

    // call python script integration attempts
  // const result = require('subprocess').result
  