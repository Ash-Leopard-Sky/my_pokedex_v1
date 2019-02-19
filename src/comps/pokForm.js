import React from "react";
import Select from "react-select";

export default function PokeForm(props) {
  const onChangeSearchBox = e => {
    const { value } = e.target;

    props.onChangeSearchBox(value);
  };

  function getSelectOptions(pokemonTypes = []) {
    return pokemonTypes.map(({ name }) => ({
      value: name,
      label: name
    }));
  }

  const isReady = props.pokemonTypes && props.pokemonTypes.length !== 0;

  return (
    <form onSubmit={props.poks}>
      <div>
        <input
          id="inputInt"
          defaultValue="0"
          type="text"
          name="pagePoks"
          placeholder="Page?"
        />

        <button>Watch Pokemons!</button>

        <select type="text" name="hManyPoks" placeholder="How many Watch?">
          <option>10</option>
          <option>20</option>
          <option>50</option>
        </select>
      </div>
      <div>
        <input
          onChange={onChangeSearchBox}
          value={props.matchName}
          type="text"
        />
        {isReady && (
          <Select
            isSearchable={true}
            onChange={props.onSelectTypeChange}
            options={getSelectOptions(props.pokemonTypes)}
            isMulti={true}
            placeholder="type"
          />
        )}
      </div>
    </form>
  );
}
