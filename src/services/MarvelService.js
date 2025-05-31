import { useHttp } from "../hooks/http.hook";

const useMarvelServices = () => {
  const { request, clearError, processing, setProcess } = useHttp();

  const _apiBase = "https://marvel-server-zeta.vercel.app/";
  const _baseOffset = 0;

  const getCharacterByName = async (name) => {
    const lowerName = name.toLowerCase();
    const res = await request(
      `${_apiBase}characters?nameStartsWith=${name}&${process.env.REACT_APP_API_KEY}`
    );
    return res.data.results
      .filter((char) => char.name.toLowerCase() === lowerName)
      .map(_transformChar);
  };

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${process.env.REACT_APP_API_KEY}`
    );
    return res.data.results.map(_transformChar);
  };

  const getCharacter = async (id) => {
    const res = await request(
      `${_apiBase}characters/${id}?${process.env.REACT_APP_API_KEY}`
    );
    return _transformChar(res.data.results[0]);
  };

  const _transformChar = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 210)}...`
        : "There is no description for this character",
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };

  const getAllComics = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}comics?limit=8&offset=${offset}&${process.env.REACT_APP_API_KEY}`
    );
    return res.data.results.map(_transformComics);
  };

  const getComic = async (id) => {
    const res = await request(
      `${_apiBase}comics/${id}?${process.env.REACT_APP_API_KEY}`
    );
    return _transformComics(res.data.results[0]);
  };

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description || "There is no description",
      pageCount: `${comics.pageCount} pages`,
      thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
      language: comics.textObjects.languages,
      price: comics.prices.price ? `${comics.prices.price} $` : "Not available",
    };
  };

  return {
    clearError,
    processing,
    setProcess,
    getCharacterByName,
    getAllCharacters,
    getCharacter,
    getAllComics,
    getComic,
  };
};

export default useMarvelServices;
