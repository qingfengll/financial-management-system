var suitModel = {
    suit: {
        select_all:'select * from suit',
        select_count:"select count(*) as count from suit",
        delete:'DELETE FROM suit WHERE suit_id=?',
        update:'UPDATE suit SET name=?, specifications=?, remark=? WHERE suit_id=?;',
        add: 'INSERT INTO suit (suit_id, name, specifications, remark, image) VALUES (?,?,?,?,?);',
    },
    parts_suit:{
        add:'INSERT INTO parts_suit(parts_suit_id,parts_id,suit_id,number,' +
        'price,pipe_cutting,weld,polish,drill,deep_tapping,' +
        'clipped_board,punching,bend,A_pillar,wage_cost,' +
        'material_loss,profit,other_cost)VALUES' +
        '(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        delete:'DELETE FROM parts_suit WHERE suit_id = ?;',
        getAllBySuitId:'SELECT parts.*, parts_suit.* FROM parts_suit INNER JOIN parts ON parts_suit.parts_id = parts.parts_id WHERE suit_id = ?;',
    }
}

module.exports = suitModel;
