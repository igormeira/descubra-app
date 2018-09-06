

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

    static postLogin(usuario, senha) {
        const uri = 'https://descubra-api.herokuapp.com/login';
        const requestInfo = {
        method: 'POST',
        body: JSON.stringify({
            email: usuario,
            senha: senha
        }),
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

    static postCadastro(nome, email, senha, ddd, sexo) {
        const uri = 'https://descubra-api.herokuapp.com/cadastro';
        const requestInfo = {
        method: 'POST',
        body: JSON.stringify({
            nome: nome,
            email: email,
            senha: senha,
            ddd: ddd,
            sexo: sexo
        }),
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

    static postUpdate(email, nome, ddd, sexo) {
        const uri = 'https://descubra-api.herokuapp.com/usuario/update';
        const requestInfo = {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            nome: nome,
            ddd: ddd,
            sexo: sexo
        }),
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
