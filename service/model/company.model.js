var companyModel = {
    company: {
        add: 'INSERT INTO company (company_id,name,phone,landline,address,remark) VALUES (?,?,?,?,?,?)',
        delete: 'DELETE FROM company WHERE company_id = ?',
        select_all:'select * from company',
        select_fromID: 'select * from company where company_id = ?',
        select_fromName: 'select * from company where name = ?',
        update_company: 'UPDATE company SET name=?, phone=?,landLine=?, address=?, remark=? WHERE (company_id=?)',
    }
}

module.exports = companyModel;
