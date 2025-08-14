
let imagedata =   await imagetodata("https://threejs.org/examples/textures/uv_grid_opengl.jpg");
console.log(imagedata,"functionimagaa")
converttoimge(imagedata)
async function imagetodata(imagepath) {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imagepath;
  
    return new Promise((resolve, reject) => {
      img.onload = () => {
        // Now we have real image dimensions
        const canvas = document.createElement("canvas");
        const canvasSizeW = img.naturalWidth;
        const canvasSizeH = img.naturalHeight;
        canvas.width = canvasSizeW;
        canvas.height = canvasSizeH;
  
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        ctx.drawImage(img, 0, 0, canvasSizeW, canvasSizeH);
  
        const imgd = ctx.getImageData(0, 0, canvasSizeW, canvasSizeH);
  
        resolve({
          width: canvasSizeW,
          height: canvasSizeH,
          data: imgd
        });
      };
  
      img.onerror = reject;
    });
  }
  
  function converttoimge(passfunc) {
    const { data, width, height } = passfunc;
  
    // Create preview canvas
    const previewCanvas = document.createElement("canvas");
    previewCanvas.width = 400;
    previewCanvas.height = 400;
    const ctx = previewCanvas.getContext("2d");
  
    // Offscreen canvas with original data
    const tempCanvas = document.createElement("canvas");

    tempCanvas.getContext("2d").putImageData(data, 0, 0);
  
    // Draw scaled into preview
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(tempCanvas, 0, 0, previewCanvas.width, previewCanvas.height);
  
    // Export to <img>
    const img = new Image();
    img.src = previewCanvas.toDataURL("image/png");
    img.style.position = "absolute";
    img.style.top = "0";
  img.className = "imageclass";
    img.style.left = "0";
    document.body.appendChild(img);
  }