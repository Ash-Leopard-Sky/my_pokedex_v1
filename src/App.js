import React from "react";
import Select from 'react-select';
import "./App.css";
import isEquals from './utils/isEquals';

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
    pokemon: {},
    matchName:""
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

    // data.results.forEach(element => {
    //   console.log(element);
    // });

    console.log(data);

    this.setState({
      data
    });
  };

  onChangeSearchBox = (matchName) => {
    this.setState({
      matchName
    })
  }

  getPokInfo = (e, id) => {
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

  filterByName = ( name , matchName) => {
    return name.toLowerCase().indexOf(matchName.toLowerCase()) !== -1;
  }

  render() {
    const { page, pokemon, matchName } = this.state;
    const { results } = this.state.data;
    console.log(matchName);

    return (
      <div>
        <PokForm poks={this.gettingPoks} onChangeSearchBox={this.onChangeSearchBox} matchName={matchName} />
        {results && (
          <section className="pok_list">
            {results.filter(({ name }) => this.filterByName(name, matchName)).map((result, i) => {
              const { name, url } = result;
              // const id = ++i + page;
              const stuff = url.split("/");
              const id = Number(stuff[stuff.length - 2]);
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
