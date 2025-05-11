class MarvelServices {
  _apiBase = "https://marvel-server-zeta.vercel.app/";

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return res.json();
  };

  getAllCharacters = () => {
    return this.getResource(
      `${this._apiBase}characters?limit=9&${process.env.REACT_APP_API_KEY}`
    );
  };

  getlCharacter = (id) => {
    return this.getResource(
      `${this._apiBase}characters/${id}?${process.env.REACT_APP_API_KEY}`
    );
  };
}

export default MarvelServices;
