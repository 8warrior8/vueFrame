export default {
    isCheckRouterByList: function (menuList, menuName) {
        if (menuName && menuList && menuList.length > 0) {
            var tempName = menuName;
            if(menuName.indexOf("/") === 0){
                tempName = menuName.substr(1);
            }
            if (menuList.includes(tempName)) {
                return true;
            } else {
                return false;
            }
        }
        return true;
    },

//根据变化获取趋势图对应的颜色值
    getColorByIndex:function(index){
        var colorList = ['#2ec7c9', '#b6a2de', '#336666', '#549265', '#468890', '#7e5876', '#2ec7c9', '#2ec7c9', '#b6a2de', '#40d0ad', '#2ec7c9', '#b6a2de'];
        if(index < colorList.length) {
            return colorList[index];
           }
       return 'transparent';
    },
};
