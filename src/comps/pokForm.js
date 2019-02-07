import React from "react";

class PokForm extends React.Component{
  render(){
    return(
      <form onSubmit={this.props.poks}>
        <input type="text" name="pagePoks" placeholder="Page?"/>
          <button>Watch Pokemons!</button>
        <select type="text" name="hManyPoks" placeholder="How many Watch?">
          <option>10</option>
          <option>20</option>
          <option>50</option>
        </select>
      </form>
    )
  }
}

export default PokForm;
