import Database from "better-sqlite3";

const g_db = new Database("test.db", { verbose: (a) => console.log("db exec: "+a)});

module.exports.db = g_db;
