var partsModel = {
    parts: {
        select_all:'select * from parts',
        select_count:"select count(*) as count from parts",
        delete:'DELETE FROM parts WHERE parts_id=?',
        update:'UPDATE parts SET name=?,specifications=?,unit=?,remark=? WHERE parts_id=?;',
        add: 'INSERT INTO `parts` (`parts_id`, `name`, `specifications`, `unit`, `remark`) VALUES (?,?,?,?,?)',
    },
    material_parts:{
        add:'INSERT INTO material_parts(material_parts_id,length,price,number,material_id,parts_id) VALUES (?,?,?,?,?,?)',
        delete:'DELETE FROM material_parts WHERE parts_id = ?;',
        getAllByPartsId:'SELECT material.*,material_parts.* FROM material_parts INNER JOIN material ON material_parts.material_id = material.material_id WHERE parts_id = ?',
    }
}

module.exports = partsModel;
