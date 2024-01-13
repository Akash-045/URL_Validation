import { useEffect, useState } from "react";

import "./App.css";

function App() {
  // State for the URL input
  const [url, setUrl] = useState<string>("");
  const [lastCheckedUrl, setLastCheckedUrl] = useState<string>("");
  const [urlExists, setUrlExists] = useState<boolean | null>(null);
  const [urlType, setUrlType] = useState<"file" | "folder" | null>(null);

  // Function to validate the URL format
  const isValidUrl = (url: string): boolean => {
    const pattern = new RegExp(
      // Regular expression for URL validation
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return pattern.test(url);
  };
// Mock function to simulate URL existence check
  const checkUrlExistence = async (url: string): Promise<{ exists: boolean; type: "file" | "folder" | null }> => {
    // Simulating a network delay
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    await delay(2000); // Delay of 2 seconds

    // Mocking the existence check
    const exists = Math.random() < 0.5; 
    const type = exists ? (Math.random() < 0.5 ? "file" : "folder") : null;
    
    return { exists, type };
  };

  // Effect for checking URL existence
  useEffect(() => {
    const handler = setTimeout(async () => {
      if (url && isValidUrl(url)) {
        const response = await checkUrlExistence(url);
        setUrlExists(response.exists);
        setUrlType(response.type);
        setLastCheckedUrl(url);
      }
    }, 1000); // 1 second delay

    return () => clearTimeout(handler);
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
