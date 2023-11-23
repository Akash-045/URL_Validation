import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [url, setUrl] = useState<string>("");
  const [lastCheckedUrl, setLastCheckedUrl] = useState<string>("");
  const [urlExists, setUrlExists] = useState<boolean | null>(null);
  const [urlType, setUrlType] = useState<"file" | "folder" | null>(null);

  const isValidUrl = (url: string): boolean => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!pattern.test(url);
  };

  const checkUrlExistence = (url: string) => {
    console.log("checking URL", url);
    setLastCheckedUrl(url);

    const exists = Math.random() < 0.5;
    setUrlExists(exists);
    setUrlType(exists ? (Math.random() < 0.5 ? "file" : "folder") : null);
    setLastCheckedUrl(url);
  };

  useEffect(() => {
    const handeler = setTimeout(() => {
      if (url && isValidUrl(url)) {
        checkUrlExistence(url);
      }
    }, 1000);

    return () => clearTimeout(handeler);
  }, [url]);

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
          {url && (
            <span className={isValidUrl(url) ? "valid" : "invalid"}>
              {isValidUrl(url) ? "Valid URL" : "Invalid URL"}
            </span>
          )}
        </div>
        {lastCheckedUrl && (
          <div className="result">
            Last checked URL: {lastCheckedUrl} <br />
            {urlExists !== null
              ? urlExists
                ? `Exists as a ${urlType}`
                : "Does not exist"
              : ""}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
