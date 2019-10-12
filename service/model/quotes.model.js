var quotesModel = {
    quotes: {
        select_all:'SELECT quotes.*,company.`name` company_name\n' +
                    'FROM quotes,company\n' +
                    'WHERE company.company_id = quotes.company_id',
        select_count:"select count(*) as count from quotes",
        select_By_ID:'SELECT quotes.*,company.`name` company_name\n' +
                        'FROM quotes,company\n' +
                        'WHERE company.company_id = quotes.company_id;' +
                        'and quotes.quotes_id = ?',
        delete:'DELETE FROM quotes WHERE quotes_id=?',
        update:'UPDATE quotes SET ' +
                'company_id = ? end_time = ?, remark = ?, time = ?, receiving_address = ?,' +
                'receiving_name = ?, freight_company = ?, accounts_payable = ?,' +
                'WHERE quotes_id = ?;',
        add: 'INSERT INTO quotes(quotes_id,company_id,end_time,remark,' +
             'time,receiving_address,receiving_name,freight_company,accounts_payable)' +
             'VALUES(?,?,?,?,?,?,?,?,?);',
        select_count:"select count(*) as count from quotes",
        getQuotesAndPAY:'SELECT quotes.* FROM quotes WHERE quotes.company_id = ?',
    },
    suit_quotes:{
        add:'INSERT INTO suit_quotes (suit_id,quotes_id,number,price)\n' +
            'VALUES(?,?,?,?)',
        delete:'DELETE FROM suit_quotes WHERE suit_id = ?;',
        select_all_By_quotes_id:'SELECT suit_quotes.*,suit.* FROM suit_quotes,suit WHERE quotes_id = ?;',
    },
    account_statement:{
        getAccountStatements:'SELECT * FROM account_statement WHERE company_id = ? and quotes_id = ?; ',
        add:'INSERT INTO account_statement (account_statement_id, company_id, quotes_id, paid,time) VALUES (?, ?, ?, ?, ?)',
        delete:'DELETE FROM account_statement WHERE account_statement_id = ?;'
    }
}

module.exports = quotesModel;
