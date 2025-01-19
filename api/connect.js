import mysql from "mysql"

export const db = mysql.createConnection({
host: "127.0.0.1",
user:"root",
password: "Trandafir5703!",
port: 3307,
database:"veterinar"})