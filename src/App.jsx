import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';


function App() {
  let [option, setOption] = useState("")
  let [from, setFrom] = useState("en")
  let [to, setTo] = useState("en")
  let [input, setInput] = useState("")
  let [output, setOutput] = useState("")

  useEffect(()=>{
    let data = async () => {
      let languageData = await axios.get('https://libretranslate.com/languages',
      {headers:{'accept': 'application/json'}})
      setOption(languageData.data);
    }
    data()
  },[])





  let handleFrom = (e) =>{
    setFrom(e.target.value)
  }
  let handleTo = (e) =>{
    setTo(e.target.value)
  }
  let handleinput = (e) => {
    setInput(e.target.value)
  }
 
  const handleTranslate = async () => {
    const res = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      body: JSON.stringify({
        q: input,
        source: from,
        target: to,
        format: "text",
        api_key: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
      }),
      headers: { "Content-Type": "application/json" }
    });
    // console.log(await res.json());
    // setOutput(res.translatedText)
    // console.log(translatedText);
    let text = await res.json()
    setOutput(text.translatedText);
    console.log(text.translatedText);
  };


  return (
    <>
     <div className="google_translate">
      <div className="select-option">
        <span>From ({from}): </span>
        <select onChange={handleFrom}>
        { option &&
          option.map((item,index)=>(
            <option key={index} value={item.code}>{item.name}</option>
          ))
        }
        </select>
        <span>To ({to}): </span>
        <select onChange={handleTo}>
        { option &&
          option.map((item,index)=>(
            <option key={index} value={item.code}>{item.name}</option>
          ))
        }
        </select>
        <div className="input">
          <textarea name="" id="" cols="50" rows="8" onChange={handleinput}></textarea>
          <textarea name="" id="" cols="50" rows="8" value={output}></textarea>
        </div>
        <div className="btn">
          <button onClick={handleTranslate}>Translate</button>
        </div>
      </div>
     </div>
    </>
  )
}

export default App
