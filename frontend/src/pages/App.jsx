import React from "react";
import "../styles/App.css";

function App() {
  return (
    <>
      <div className="flex justify-center items-center mt-48 text-redz">
        <div className="flex justify-center items-center border-2-blue flex-col">
          <h1 className="font-black text-black-300 text-5xl">
            Landing ni (app.jsx ni nga file lmao){" "}
          </h1>
          <p className="font-bold text-black-300 text-xl">
            wala pay navigation so need pa e manually ug type ang link para maka
            access lmao
          </p>
          <p className="font-bold text-black-300 text-xl">
            GUBA ANG TAILWIND CUSTOM COLOR
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
