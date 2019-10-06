module.exports = {
    slect_pages(tableName,params){
        let select_page = "select * from " + tableName;
        params.conditions = JSON.parse(params.conditions);
        params.pages = JSON.parse(params.pages);
        if(params.conditions){
            Object.keys(params.conditions).forEach((item,index) => {
            
                if(index == 0){
                    select_page += " where " + item + " = " + params.conditions[item];
                }else{
                    select_page += " and " + item + " = " + params.conditions[item];
                }
            });
        }
        select_page += " limit " + (params.pages.currentPage - 1) * params.pages.pageSize + " , " + params.pages.pageSize + ";";
        return select_page;
    }
}