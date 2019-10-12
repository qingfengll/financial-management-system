var staffPositionModel = {
    staffPosition:{
        select_all:"select * from staff_position",
        select_count:"select count(*) as count from staff_position",
        add: 'INSERT INTO staff_position (position_id,position_name,base_pay,remark,overtime_hourly_wage) VALUES (?,?,?,?,?)',
        update_position: 'UPDATE staff_position SET position_name=?, base_pay=?,remark=?,overtime_hourly_wage=? WHERE (position_id=?)',
        delete: 'DELETE FROM staff_position WHERE position_id = ?',
    }
}
module.exports = staffPositionModel;
