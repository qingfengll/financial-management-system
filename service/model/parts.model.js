var partsModel = {
    parts: {
        select_all:'select * from parts',
        delete:'DELETE FROM `parts` WHERE (`parts_id`=?)',
        update:'UPDATE parts SET parts_id=?,name=?,specifications=?,unit=?,remark=? WHERE (parts_id=?);',
        add: 'INSERT INTO `parts` (`parts_id`, `name`, `specifications`, `unit`, `remark`) VALUES (?,?,?,?,?)',
    },
    material_parts:{
    }
}

module.exports = partsModel;
