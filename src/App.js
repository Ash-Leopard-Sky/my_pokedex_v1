import React from "react";
import './App.css';

import Info from "./comps/info";
import PokForm from "./comps/pokForm";
import PokBut from "./comps/pokBut";







var hMany = 20;
var vLimit = 20;

class App extends React.Component{



  gettingPokInfo = async () => {
    const api_url = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${hMany}&limit=${vLimit}`);
    const data = await api_url.json();
    console.log(data);
  }

  render(){
    return(
      <div>
          <Info />
          <PokForm />
          <PokBut />
      </div>
    )
  }
}

export default App;
