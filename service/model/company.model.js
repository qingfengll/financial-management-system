var companyModel = {
    company: {
        add: 'INSERT INTO company (company_id,name,phone,address,remark) VALUES (?,?,?,?,?)',
        select_all:'select * from company',
        select_fromID: 'select * from company where company_id = ?',
        select_fromName: 'select * from company where name = ?',
        update_company: 'UPDATE company SET name=?, phone=?, address=?, remark=? WHERE (company_id=?)',
    }
}

module.exports = companyModel;
