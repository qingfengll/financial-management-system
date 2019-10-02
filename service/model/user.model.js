var userModel = {
    user: {
        add: 'insert into user (name, password, phone) values (?,?,?)',
        select_all:'select * from user',
        select_name: 'select * from user where name = ?' ,
        update_user: 'update user set'
    }
}

module.exports = userModel;
