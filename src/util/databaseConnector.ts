import {Pool} from 'pg';
const pool = new Pool({
    user: "postgres",
    host: "db-persist",
    database: "postgres",
    password: "password",
    port: 5432
})

class DatabaseConnector{
    public query(text: any, params:any){
        return pool.query(text, params)
    }
}

export default DatabaseConnector


