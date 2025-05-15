class MarvelServices {
  _apiBase = "https://marvel-server-zeta.vercel.app/";

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return res.json();
  };

  getAllCharacters = async () => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&${process.env.REACT_APP_API_KEY}`
    );
    return res.data.results.map(this._transformChar);
  };

  getCharacter = async (id) => {
    const res = await this.getResource(
      `${this._apiBase}characters/${id}?${process.env.REACT_APP_API_KEY}`
    );
    return this._transformChar(res.data.results[0]);
  };

  _transformChar = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };
}

export default MarvelServices;
