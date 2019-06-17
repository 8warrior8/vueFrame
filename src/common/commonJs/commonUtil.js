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
};
