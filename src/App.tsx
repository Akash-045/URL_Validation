import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [url, setUrl] = useState<string>("");
  const [lastCheckedUrl, setLastCheckedUrl] = useState<string>("");
  const [urlExists,setUrlExists] = useState<boolean | null>(null);
  const [urlType, setUrlType] = useState<"file" | "folder" | null>(null)

  // Function to check URL format
  const isValidUrl = (url: string): boolean => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(url);
  };
  // Function to simulate URL existence check
  const checkUrlExistence = (url:string) => {
    console.log("checking URL" ,url)
setLastCheckedUrl(url);

//Mocking the existence Check
const exists = Math.random() < 0.5;
setUrlExists(exists);
setUrlType(exists ? (Math.random() < 0.5 ? "file" : "folder") : null );
setLastCheckedUrl(url)
  }

  //Throttle the URL existence check
  useEffect(()=>{
const handeler = setTimeout(() => {
  if (url && isValidUrl(url)) {
    checkUrlExistence(url)
  }
},1000);//1 second delay

return () => clearTimeout(handeler)
  },[url])

  return (
    <div className="App">
      <header className="App-header">
        <h1>URL Checker</h1>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter Url"
        />
        <div>
          {url &&
            (isValidUrl(url) ? (
              <span>Valid URL</span>
            ) : (
              <span>Invalid URL</span>
            ))}
        </div>
        {lastCheckedUrl && (
          <div>
            Last checked URL: {lastCheckedUrl} <br/>
            {urlExists !== null ? (
              urlExists ? `Exists as a ${urlType}` : 'Does not exist'
            ) : ''}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
