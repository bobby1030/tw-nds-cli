var replaceLocationToISO = function(location){
    switch(location){
        case '基隆市':
            return 'KEE'
            break;
        case '臺北市':
            return 'TPE'
            break;
        case '新北市':
            return 'NWT'
            break;
        case '桃園市':
            return 'TAO'
            break;
        case '新竹市':
            return 'HSZ'
            break;
        case '新竹縣':
            return 'HSQ'
            break;
        case '苗栗縣':
            return 'MIA'
            break;
        case '臺中市':
            return 'TXG'
            break;
        case '彰化縣':
            return 'CHA'
            break;
        case '雲林縣':
            return 'YUN'
            break;
        case '南投縣':
            return 'NAN'
            break;
        case '嘉義市':
            return 'CYI'
            break;
        case '嘉義縣':
            return 'CYQ'
            break;
        case '臺南市':
            return 'TNN'
            break;
        case '高雄市':
            return 'KHH'
            break;
        case '屏東縣':
            return 'PIF'
            break;
        case '宜蘭縣':
            return 'ILA'
            break;
        case '花蓮縣':
            return 'HUA'
            break;
        case '臺東縣':
            return 'TTT'
            break;
        case '澎湖縣':
            return 'PEN'
            break;
        case '連江縣':
            return 'LIE'
            break;
        case '金門縣':
            return 'KIN'
            break;
    }
}

module.exports = replaceLocationToISO
