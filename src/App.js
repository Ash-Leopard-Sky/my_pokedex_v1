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
    pokemon: {},
    matchName: "",
    pokemons: [],
    pokemonTypes: [],
    selectedPokemonTypes: []
  };

  cleanPokemonsList() {
    this.setState({
      pokemons: []
    });
  }

  cleanPokemonTypes() {
    this.setState({
      pokemonTypes: []
    });
  }

  componentDidMount() {
    this.getPokemonTypes();
  }

  async getPokemonTypes() {
    this.cleanPokemonTypes();

    try {
      const res = await fetch("https://pokeapi.co/api/v2/type");
      const json = await res.json();

      const { results } = json;

      this.setState({
        pokemonTypes: results
      });
    } catch (error) {
      console.error(error);
    }
  }

  gettingPoks = async e => {
    e.preventDefault();

    const hMany = e.target.elements.hManyPoks.value;

    this.setState({
      page: Number(e.target.elements.pagePoks.value)
    });

    const api_url = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?offset=${
        this.state.page
      }&limit=${hMany}`
    );

    const data = await api_url.json();

    // clear pokemons property
    this.cleanPokemonsList();

    data.results.forEach(async result => {
      const { name, url } = result;

      const stuff = url.split("/");
      const id = Number(stuff[stuff.length - 2]);

      try {
        const res = await fetch(`http://pokeapi.co/api/v2/pokemon/${id}/`);
        const pokemon = await res.json();

        const { pokemons } = this.state;

        this.setState({
          pokemons: [...pokemons, pokemon]
        });
      } catch (error) {
        console.error(error);
      }
    });

    this.setState({
      data
    });
  };

  onChangeSearchBox = matchName => {
    this.setState({
      matchName
    });
  };

  onSelectTypeChange = (pokemonTypes = []) => {
    this.setState({
      selectedPokemonTypes: pokemonTypes
    });
  };

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

  filterByName = (name, matchName) => {
    return name.toLowerCase().indexOf(matchName.toLowerCase()) !== -1;
  };

  filterByType = (types, selectedTypes) => {
    let isEqual = false;

    if (selectedTypes.length === 0 || types.length === 0) {
      return true;
    }

    types.forEach(({ type: { name } }) => {
      selectedTypes.forEach(({ value }) => {
        if (name === value) {
          return (isEqual = true);
        }
      });
    });

    return isEqual;
  };

  render() {
    const {
      page,
      pokemon,
      pokemons,
      pokemonTypes,
      selectedPokemonTypes,
      matchName
    } = this.state;

    return (
      <div>
        <PokForm
          poks={this.gettingPoks}
          pokemonTypes={pokemonTypes}
          onChangeSearchBox={this.onChangeSearchBox}
          onSelectTypeChange={this.onSelectTypeChange}
          matchName={matchName}
        />
        {pokemons && (
          <section className="pok_list">
            {pokemons
              .filter(
                ({ name, types }) =>
                  this.filterByName(name, matchName) &&
                  this.filterByType(types, selectedPokemonTypes)
              )
              .map((instance, index) => {
                const { id, name } = instance;

                return (
                  <PokCard
                    getPokInfo={this.getPokInfo}
                    key={index}
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
