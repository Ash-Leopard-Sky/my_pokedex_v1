import React from "react";
import PropTypes from "prop-types";

class PokInfo extends React.Component {
  static propTypes = {
    pokemon: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
      sprite: PropTypes.string,
      type: PropTypes.string
    })
  };

  render() {
    const { id, name, sprite, type } = this.props.pokemon;

    return (
      <div>
        <img src={sprite} />
        <h6>{name}</h6>
        <p>{id}</p>
        <p>{type}</p>
      </div>
    );
  }
}

export default PokInfo;
