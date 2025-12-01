import { useState } from "react";




const App = () => {

  
const [img, setImg] = useState("");
const [loading, setLoading] = useState(false);
const [imgsize, setImgSize] = useState("150")
const[imgData, setImgData] = useState("https://www.google.com")





async function generateQr()

{
  setLoading(true)
  try{
     const url = `https://api.qrserver.com/v1/create-qr-code/?size=${imgsize}x${imgsize}&data=${encodeURIComponent(imgData)}`
     setImg(url)
  }catch(error)
  {
    console.log("Error the qr generate"+ error);
  }
  finally
  {
    setLoading(false)
  }
 
}
function downloadQr()
{
  fetch(img).then((responce) => responce.blob()).then((blob)=>{
    const link = document.createElement('a');
    link.href=URL.createObjectURL(blob)
    link.download = "qrCode.png";
    document.body.appendChild(link);
    link.click()
    document.body.removeChild(link)
  }).catch((err) => {
    console.log("error message " + err);
    
  })
}








  return (
    <div className='main-container'>
      <h2>QR Code Generator</h2>
      <div className='img-container'>
        {loading && <p>Please Wait...</p>}
       {img &&  <img src={img } className="qr-img" />}
      </div>
      <div className='form-input'>
        <label htmlFor="formInput">Insert Your data Code</label>
        <input type="text" id='formInput' value={imgData} onChange={(e) => setImgData(e.target.value)} />
        <label htmlFor="formInput">Select Img Size (eg.150)</label>
        <input type="text" id='formInput' value={imgsize} onChange={(e)=> setImgSize(e.target.value)} />
      </div>
      <div className='btn-container'>
        <button className='generate' disabled={loading} onClick={generateQr}>Generate Qr Code</button>
        <button className='download' onClick={downloadQr}>Download Qr Code</button>
      </div>
      <p className="designname">designed by <a href="https://mahanfreelauncer.vercel.app/" target="_blank">MahanPrinceOffical</a></p>
    </div>
  )
}

export default App
