import { useState } from "react"

export default function ImageGen() {
    const [prompt, setPrompt] = useState('')
    const [imageUrls, setImageUrls] = useState([]);

    const generateImage = async () => {
        try{
            if (prompt.length < 1 ) {
                alert("Prompt cannot be empty!")
                return
            }
            const response = await fetch(`http://localhost:8080/generate-image?prompt=${prompt}`)
            const urls = await response.json()
            console.log(urls)
            setImageUrls(urls)
        }
        catch (error){
            console.error("Error encountered: ", error)
        }
    }

  return (
    <div className='tab-content'>
        <h2>ImageGen</h2>
        <input 
            type='text'
            value={prompt}
            onChange={ e => setPrompt(e.target.value)}
            placeholder="Let your imagination flies."
        />
        <button onClick={generateImage}>Generate!</button>

        <div className="image-grid">
            {imageUrls.map((url,index) => (
                <img key={index} src={url} alt={`Generated ${index}`}/>
            ))}

            {[...Array(4 - imageUrls.length)].map((_,index) => (
                <div key={index + imageUrls.length}
                className="empty-image-slot"></div>
            ))}
        </div>
    </div>
  )
}