import React from "react";
import "regenerator-runtime/runtime";
import ReactDOM from "react-dom";
import App from "./App";

const WidgetDivs = document.querySelectorAll('.lottery_widget')

// Inject our React App into each
WidgetDivs.forEach(Div => {
  console.log(Div)
  ReactDOM.render(
    <React.StrictMode>
      <App domElement={Div} />
    </React.StrictMode>,
    Div
  );
})

