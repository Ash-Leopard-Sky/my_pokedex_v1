import React from "react";
import './App.css';

import Info from "./comps/info";
import PokForm from "./comps/pokForm";
import PokCard from "./comps/pokCard";



class App extends React.Component{

  state = {
    data: {
    results: [] }
  }

  gettingPoks = async (e) => {
    e.preventDefault();

    const hMany = e.target.elements.hManyPoks.value;
    const page = e.target.elements.pagePoks.value;
    const api_url = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${page}&limit=${hMany}`);
    const data = await api_url.json();

    data.results.forEach(element => {
      console.log(element);
    });

    console.log(data);

    this.setState({
      data
    });
  }

  render(){

    const {results} = this.state.data;


    return(
      <div>
          <Info />
          <PokForm poks={this.gettingPoks}/>
          {results && (
          <ul>
            {results.map((result, i) => {
              const { name } = result;

              return (
                <PokCard name={name} id={i+1} />
              )
            })}
          </ul>
        )}
      </div>
    )
  }
}

export default App;
