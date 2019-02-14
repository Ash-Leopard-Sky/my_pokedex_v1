import React from "react";
import "./App.css";

import PokInfo from "./comps/pokInfo";
import PokForm from "./comps/pokForm";
import PokCard from "./comps/pokCard";

import Pokemon from "./Pokemon";

class App extends React.Component {
  state = {
    data: {
      results: []
    },
    page: 0,
    pokemon: {}
  };

  gettingPoks = async e => {
    e.preventDefault();

    const hMany = e.target.elements.hManyPoks.value;

    this.setState({
      page: Number(e.target.elements.pagePoks.value)
    });

    const api_url = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?offset=${this.state.page}&limit=${hMany}`
    );
    const data = await api_url.json();

    data.results.forEach(element => {
      console.log(element);
    });

    console.log(data);

    this.setState({
      data
    });
  };

  getPokInfo = async (e, id) => {
    e.preventDefault();

    fetch(`http://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(res => res.json())
      .then(data => {
        const pokemon = new Pokemon(data);

        this.setState({
          pokemon
        });
      })
      .catch(err => console.log(err));
  };
  render() {
    const { page, pokemon } = this.state;
    const { results } = this.state.data;
    console.log(page);

    return (
      <div>
        <PokForm poks={this.gettingPoks} />
        {results && (
          <section className="pok_list">
            {results.map((result, i) => {
              const { name } = result;
              const id = ++i + page;
              return (
                <PokCard
                  getPokInf={this.getPokInfo}
                  key={i}
                  name={name}
                  id={id}
                />
              );
            })}
          </section>
        )}
        <PokInfo pokemon={pokemon} />
      </div>
    );
  }
}

export default App;
