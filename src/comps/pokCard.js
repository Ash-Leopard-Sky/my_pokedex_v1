import React from "react";
import PropTypes from "prop-types";

class PokCard extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    getPokInfo: PropTypes.func.isRequired
  };

  onClick = e => {
    this.props.getPokInfo(e, this.props.id);
  };

  render() {
    const { name, id } = this.props;

    return (
      <div className="pokCard pok_list_pokCard" onClick={this.onClick} id={id}>
        <img
          className="pokCardImg"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        />

        <div className="cardName">{name}</div>
      </div>
    );
  }
}

export default PokCard;
