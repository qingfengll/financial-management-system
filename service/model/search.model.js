module.exports = {
    slect_pages(sqlSelect,params){
        let select_page = sqlSelect;
        params.conditions = JSON.parse(params.conditions);
        params.pages = JSON.parse(params.pages);
        if(params.conditions){
            Object.keys(params.conditions).forEach((item,index) => {
                if(params.conditions[item] != ""){
                    if(index == 0){
                        select_page += " where " + " instr(" + item + ",\"" +  params.conditions[item] + "\")";
                    }else{
                        select_page += " and " + "instr(" + item + ",\"" +  params.conditions[item] + "\")";
                    }
                }
            });
        }
        select_page += " limit " + (params.pages.currentPage - 1) * params.pages.pageSize + " , " + params.pages.pageSize + ";";
        console.log(select_page);
        return select_page;
    }
}