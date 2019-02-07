import React from "react";
import PropTypes from 'prop-types';





class PokCard extends React.Component{
  render(){
    const { name, id, d } = this.props
    
    return(
      <div className="pokeCard" id={id}>
        <div className="cardName">
          {name}
        </div>
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${(id)}.png`}/>
      </div>
    )
  }
}



PokCard.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string
};

export default PokCard;
