

export default class DescubraFetchService {

    static get(recurso) {
        const uri = 'https://descubra-api.herokuapp.com/' + recurso;

        let headers = new Headers({
            'Accept': 'application/json',
            "Content-Type": "application/json",
          });

        return fetch(uri, {
            headers,
            method: 'GET',
          })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    static postLogout(token) {
        const uri = 'https://descubra-api.herokuapp.com/logout';
        const requestInfo = {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
        }

        return fetch(uri, requestInfo)
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
    }

    static post(uri, body) {
        const requestInfo = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-type': 'application/json'
        })
        }

        return fetch(uri, requestInfo)
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });
    }

}
