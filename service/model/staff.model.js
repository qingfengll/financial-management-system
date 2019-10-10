var staffModel = {
    staff:{
        select_all:"select * from staff",
        select_count:"select count(*) as count from staff",
        add: 'INSERT INTO staff (staff_id,name,phone,position_id,sex,birthday,id_card,remark) VALUES (?,?,?,?,?,?,?,?)',
        select_fromID: 'select * from staff where staff_id = ?',
        update_staff: 'UPDATE staff SET name=?, phone=?,position_id=?, sex=?,birthday=?,id_card=?,remark=? WHERE (staff_id=?)',
        delete: 'DELETE FROM staff WHERE staff_id = ?',
    }
}
module.exports = staffModel;


