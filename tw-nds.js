const rp = require('request-promise');
const cheerio = require('cheerio');
const cheerioTableParser = require('cheerio-tableparser');
const replaceLocationToISO = require('./replaceLocationToISO');

var fetchData = function () {
    rp('http://www.dgpa.gov.tw/nds.html')
        .then(function (res) {
            parseHTML(res);
        })
        .catch(function () {
            console.error('Error when fetching data');
        });
};

var parseHTML = function (rawHTMl) {
    var $ = cheerio.load(rawHTMl);
    cheerioTableParser($);

    var data = $('table[bgcolor="#cdfad9"]').parsetable(false, false, true);
    var cities = data[1].slice(1);
    var status = data[2].slice(1);

    var result = null;

    if (!cities[0].match('無停班停課訊息')) {
        result = mergeArray(cities, status);
        resultHandler(result);
    } else {
        console.log('無停班停課訊息');
    }

};

var mergeArray = function (column, data) {
    var obj = {};
    for (var i = 0; i < column.length; i++) {
        obj[replaceLocationToISO(column[i])] = data[i].replace('  ', '\n');
    }
    return obj;
};

var resultHandler = function (result) {
    var msg = result[process.argv[2]];
    if (msg) {
        if (msg.match('已達') || msg.match(/.*停止上班.*、/g) || msg.match(/、.*停止上課.*/g)) {
            // add a warning color + bold
            msg = '\033[01m\033[31m' + msg + '\033[0m';
        }
        console.log(msg);
    } else if (process.argv[2]) {
        console.error('Please use a City Code that match ISO 3166-2:TW format.');
    } else {
        console.error('Please specify a city with ISO 3166-2:TW format.');
    }
};

fetchData();
