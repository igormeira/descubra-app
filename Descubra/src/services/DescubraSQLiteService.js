import SQLite, {okCallback, errorCallback} from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: "sqlite", createFromLocation: 1 }, okCallback, errorCallback);

export default class DescubraSQLiteService {

    static addFav(table, id, user) {
        db.transaction((tx) => {
            tx.executeSql('INSERT INTO table_fav_cel (id_plano,usuario) VALUES (' + id + ',' + user + ')');
        });
    }

    static getFav(table) {

    }

}