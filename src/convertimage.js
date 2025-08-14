let imagedata =   await imagetodata("../public/vite.svg");
console.log(imagedata,"functionimagaa")
converttoimge(imagedata)
 function converttoimge(passfunc) {
  let {canvas, width, height, data } = passfunc;
  console.log(canvas, "canvas");
   const dataURL = canvas.toDataURL("image/png");
  
    // Create and append image
    const imgp = new Image();
    imgp.src = dataURL;
    console.log(imgp, "imgp");
    document.body.appendChild(imgp);
}
 async function imagetodata(imagepath){
  const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imagepath;
    const canvas = document.createElement("canvas");
    const canvasSizeW = img.naturalWidth ||40 ;
    const canvasSizeH = img.naturalHeight ||40;
    canvas.width = canvasSizeW;
    canvas.height = canvasSizeH;
    const ctx = canvas.getContext("2d");
    
let imagepadata={
  width:canvasSizeW,
  canvas,
  height:canvasSizeH,data:null
}

  let pro=new Promise((resolve, reject) => {

  img.onload = () => {
    ctx.drawImage(img, 0, 0);
  
    // Retrieve image data
    const imgd = ctx.getImageData(0, 0, canvasSizeW, canvasSizeH);
console.log(imgd.data, "imgd.data");
    imagepadata.data=imgd.data;

    resolve(imagepadata)
    // Convert to PNG base64
    
  };


})

console.log( await pro, "pro")


    return await pro;

    


}
