let imagedata =   await imagetodata("./vite.svg");
console.log(imagedata,"functionimagaa")
converttoimge(imagedata)
 function converttoimge(passfunc) {
  let {data } = passfunc;

  const newCanvas = document.createElement('canvas');
newCanvas.width = 40;
newCanvas.height =40;

const newCtx = newCanvas.getContext('2d');
newCtx.putImageData(data, 0, 0); // Draws the image data back
// Get base64 PNG
const dataURL = newCanvas.toDataURL('image/png');
console.log(dataURL, "dataURL");
// // Create an image element from it
const img = new Image();
img.style.width = '400px';
img.style.height = '400px';
img.style.position = 'absolute';
img.style.objectFit = 'contain';
img.style.top = '0';
img.style.left = '0';
img.src = dataURL; // Set the source to the base64 string
img.className="imageclass"
document.body.appendChild(img); // Display it in the page

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
    imagepadata.data=imgd;

    resolve(imagepadata)
    // Convert to PNG base64
    
  };


})

console.log( await pro, "pro")


    return await pro;

    


}