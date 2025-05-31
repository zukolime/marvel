import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";

import "./charList.scss";

const setContent = (processing, Component, newItemLoading) => {
  switch (processing) {
    case "waiting":
      return <Spinner />;
    case "loading":
      return newItemLoading ? <Component /> : <Spinner />;
    case "confirmed":
      return <Component />;
    case "error":
      return <ErrorMessage />;
    default:
      throw new Error("Unexpected process state");
  }
};

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [charEnded, setCharEnded] = useState(false);

  const { getAllCharacters, processing, setProcess } = useMarvelService();
  const itemRefs = useRef([]);

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offset)
      .then(onCharListLoaded)
      .then(() => {
        setProcess("confirmed");
      });
  };

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    setCharList((charList) => [...charList, ...newCharList]);
    setNewItemLoading(false);
    setOffset((offset) => offset + 9);
    setCharEnded(ended);
  };

  const setFocus = (id) => {
    itemRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };

  function showCards(arr) {
    return (
      <ul className="char__grid">
        {arr.map((item, i) => (
          <li
            ref={(el) => (itemRefs.current[i] = el)}
            tabIndex={0}
            className="char__item"
            key={item.id}
            onClick={() => {
              props.onCharSelected(item.id);
              setFocus(i);
            }}
            onKeyDown={(e) => {
              if (e.key === "" || e.key === "Enter") {
                props.onCharSelected(item.id);
                setFocus(i);
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

  return (
    <div className="char__list">
      {setContent(processing, () => showCards(charList), newItemLoading)}
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{ display: charEnded ? "none" : "block" }}
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
