import { Component } from "react";
import PropTypes from "prop-types";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelService from "../../services/MarvelService";

import "./charList.scss";

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 0,
    charEnded: false,
  };

  marvelService = new MarvelService();
  itemRefs = [];

  componentDidMount() {
    this.onRequest();
  }

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharListLoaded)
      .catch(this.onError);
  };

  onCharListLoading = () => {
    this.setState({
      newItemLoading: true,
    });
  };

  onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }
    this.setState(({ offset, charList }) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }));
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  itemRef = (item) => {
    this.itemRefs.push(item);
  };

  setFocus = (id) => {
    const item = this.itemRefs[id];

    this.itemRefs.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    item.classList.add("char__item_selected");
    item.focus();
  };

  showCards(arr) {
    return (
      <ul className="char__grid">
        {arr.map((item, id) => (
          <li
            ref={this.itemRef}
            tabIndex={0}
            className="char__item"
            key={item.id}
            onClick={() => {
              this.props.onCharSelected(item.id);
              this.setFocus(id);
            }}
            onKeyDown={(e) => {
              if (e.key === "" || e.key === "Enter") {
                this.props.onCharSelected(item.id);
                this.setFocus(id);
              }
            }}
          >
            <img src={item.thumbnail} alt={item.name} />
            <div className="char__name">{item.name}</div>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { charList, loading, error, newItemLoading, offset, charEnded } =
      this.state;

    const items = this.showCards(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button
          className="button button__main button__long"
          disabled={newItemLoading}
          style={{ display: charEnded ? "none" : "block" }}
          onClick={() => this.onRequest(offset)}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
