import React from "react";

export default function PokeForm(props){
  const onChangeSearchBox = (e) =>{
    const {value} = e.target
    props.onChangeSearchBox(value)
  }

  return(
    <form onSubmit={props.poks}>
      <div>
      <input id="inputInt" defaultValue="0" type="text" name="pagePoks" placeholder="Page?"/>
      
      <button>Watch Pokemons!</button>

      <select type="text" name="hManyPoks" placeholder="How many Watch?">
        <option>10</option>
        <option>20</option>
        <option>50</option>
      </select>
      </div>
      <div>
        <input onChange={onChangeSearchBox} value={props.matchName}  type="text" />
      </div>
    </form>
  )
}