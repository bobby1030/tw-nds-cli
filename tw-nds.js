const rp = require('request-promise');
const cheerio = require('cheerio');
const cheerioTableParser = require('cheerio-tableparser');
const replaceLocationToISO = require('./replaceLocationToISO');

var fetchData = function () {
    rp('http://www.dgpa.gov.tw/nds.html')
        .then(function (res) {
            parseHTML(res);
        })
        .catch(function (err) {
            console.error('Error when fetching data');
        });
};

var parseHTML = function (rawHTMl) {
    var $ = cheerio.load(rawHTMl);
    cheerioTableParser($);

    var data = $('table[bgcolor="#cdfad9"]').parsetable(false, false, true);

    var cities = data[0].slice(1);
    var status = data[1].slice(1);

    result = mergeArray(cities, status);
    resultHandler(result);
};

var mergeArray = function (column, data) {
    var obj = {};
    for (var i = 0; i < column.length; i++) {
        obj[replaceLocationToISO(column[i])] = data[i].replace('  ', '\n');
    };
    return obj;
};

var resultHandler = function (result) {
    if (result[process.argv[2]]) {
        console.log(result[process.argv[2]]);
    } else if (process.argv[2]) {
        console.error('Please use a City Code that match ISO 3166-2:TW format.');
    } else {
        console.error('Please specify a city with ISO 3166-2:TW format.');
    };
};

fetchData();
