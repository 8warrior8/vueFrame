export default {
    isCheckRouterByList: function (menuList, menuName) {
        if (menuName && menuList && menuList.length > 0) {
            var tempName = menuName;
            if (menuName.indexOf("/") === 0) {
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
    getColorByIndex: function (index) {
        var colorList = ['#2ec7c9', '#b6a2de', '#336666', '#549265', '#468890', '#7e5876', '#2ec7c9', '#2ec7c9', '#b6a2de', '#40d0ad', '#2ec7c9', '#b6a2de'];
        if (index < colorList.length) {
            return colorList[index];
        }
        return 'transparent';
    },

    //获取告警的文字颜色
    getAlarmFontColorByLevel: function (level) {
        if (Number(level) === 3) {
            return '#333';
        } else {
            return '';
        }
    },

    //获取告警的背景颜色
    getAlarmColorByLevel: function (level, defColor) {
        if (level === undefined || level === "") {
            return 'transparent';
        } else if (Number(level) === 1) {
            return 'red';
        } else if (Number(level) === 2) {
            return 'orange';
        } else if (Number(level) === 3) {
            return 'yellow';
        } else if (Number(level) === 4) {
            return 'blue';
        } else if (defColor) {
            return defColor;
        } else {
            return '';
        }
    },
};
