import { useState } from "react"

export default function ChatBot() {
    const [prompt, setPrompt] = useState('')
    const [chatResponse, setChatResponse] = useState('')

    const chatAI = async () => {
        try {
            const response = await fetch(`http://localhost:8080/ask-ai?prompt=${prompt}`)
            const data = await response.text()
            console.log(chatResponse)
            setChatResponse(data)
        }        
        catch (error){
            console.log("Chat response encountered error: ", error)
        }
    }   

  return (
    <div>
        <h2>Talk with AIBuddy!</h2>
        <input 
            id = "input-prompt"
            type="text"
            value={prompt}
            onChange={e=> setPrompt(e.target.value)}
            placeholder="What's good brother?"/>

        <button onClick={() =>{
            chatAI()
            document.querySelector("#input-prompt").value = ''
        }}>Send!</button>
        <div className="output">
            <p>{chatResponse}</p>
        </div>
    </div>
  )
}