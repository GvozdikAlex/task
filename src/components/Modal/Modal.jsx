import React, { useEffect, useState } from "react";

export default function Modal({ close, owner, link }) {
  const [realUrl, setRealUrl] = useState("");
  async function getUrl() {
    try {
      const response = await fetch(link);
      const { url } = await response.json();
      const responseAgain = await fetch(`https://cataas.com/${url}`);
      const data = await responseAgain.blob();
      setRealUrl(URL.createObjectURL(data));
    } catch (error) {
      console.error("what happened?");
    }
  }

  useEffect(() => {
    getUrl();
  }, []);

  function handleClose(e) {
    if (e.target.id === "btn-modal" || e.target.id === "overlay") close();
  }
  return (
    <div className="modal" onClick={handleClose} id="overlay">
      <div className="modal-wrap">
        <div className="cross-icon">
          <button id="btn-modal" onClick={handleClose}>
            X
          </button>
        </div>
        {owner !== "null" ? (
          <span className="modal-span">{owner}</span>
        ) : (
          <span className="modal-span">Alex</span>
        )}
        {realUrl ? (
          <img src={realUrl} alt="wait please" width={300} height={300} />
        ) : (
          <span>Loading ....</span>
        )}
      </div>
    </div>
  );
}
