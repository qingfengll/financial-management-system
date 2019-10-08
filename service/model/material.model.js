var meterialModel = {
    materila: {
        select_all:'select * from material',
        delete:'DELETE FROM `material` WHERE (`material_id`=?)',
        update:'UPDATE `material` SET `width`=?, `height`=?, `thick`=?, `count`=?, `name`=?, `price`=? WHERE (`material_id`=?)',
        add: ' INSERT INTO `material` (`material_id`,`width`,`height`,`thick`,`count`,`name`,`price`)VALUES(?,?,?,?,?,?,?)',
    }
}

module.exports = meterialModel;
