import {Pool} from 'pg';
const pool = new Pool()

class DatabaseConnector{
    public query(text: any, params:any){
        return pool.query(text, params)
    }
}

export default DatabaseConnector
