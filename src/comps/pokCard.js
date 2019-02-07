import React from "react";
import PropTypes from 'prop-types';





class PokCard extends React.Component{
  render(){
    const { name, id } = this.props
    return(
      <div class="pokeCard" id={id}>
        <div class="cardName">
          {name}
        </div>
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}/>
      </div>
    )
  }
}



PokCard.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string
};

export default PokCard;
