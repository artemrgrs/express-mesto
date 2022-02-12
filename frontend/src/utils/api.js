class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _handleResponse(res) {
        if(res.ok) {
            return res.json();
            }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getProfileInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
        .then(this._handleResponse);
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
        .then(this._handleResponse);
    }

    getAllNeededData() {
        return Promise.all([this.getProfileInfo(), this.getInitialCards()]);
      }

    setProfileInfo(user) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
              name: user.name,
              about: user.about
            })
        })
        .then(this._handleResponse);
    }

    changeLikeCardStatus(id, isLiked) {
        if(!isLiked) {
            return fetch(`${this._url}/cards/likes/${id}`, {
                method: 'DELETE',
                headers: this._headers
            })
            .then(this._handleResponse);
        } else {
            return fetch(`${this._url}/cards/likes/${id}`, {
                method: 'PUT',
                headers: this._headers
            })
            .then(this._handleResponse);
        }
    }

    addCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            }),
        })
        .then(this._handleResponse);
    }

    deleteCard(card) {
        return fetch(`${this._url}/cards/${card._id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._handleResponse);
    }

    setProfileAvatar(user) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: user.avatar
            })
        })
        .then(this._handleResponse);
    }
}

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-23',
    headers: {
      authorization: '1ad7ccec-ea6a-44a0-b5d9-0e1200b1fa62',
      "Content-type": "application/json"
    }
  });

export default api;