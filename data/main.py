
import pandas as pd;
import sqlite3;

def find_id_of_stock_market(stock_markets, name):
    for market in stock_markets:
        if (market[2] == name):
            return market[0];
    return -1;
    

def main():
    data = pd.read_csv("listing_status.csv");
    d = dict();
    print(data.columns);
    for exchange in data.exchange:
        d[exchange] = d.get(exchange, 0) + 1;

    print(d);

    conn = sqlite3.connect("../database.db");
    cursor = conn.cursor();

    cursor.execute("SELECT * FROM stock_markets;");
    stock_markets = cursor.fetchall();

    name = "";
    symbol = "";
    market_id = -1;
    index = -1;
    try:

        for i in range(0, data.shape[0]):
            index = i;
            symbol = data.iloc[i]['symbol'].strip();
            name = data.iloc[i]['name'].strip() if pd.notnull(data.iloc[i]['name']) else symbol;
            market_id = find_id_of_stock_market(stock_markets, data.iloc[i]['exchange']);
            cursor.execute("INSERT INTO stocks (abbreviation, name, stock_market_id) VALUES(\"{}\", \"{}\", {});".format(name, symbol, market_id));

        conn.commit();

    except:
        print("STUFF\n\n\n{}\n\nname '{}'\nsymbol '{}'\nmarket_id '{}'".format(data.iloc[index], name, symbol, market_id));
        



    conn.close();

if (__name__=="__main__"):
    main();
