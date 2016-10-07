const rq = require('request');
const cheerio = require('cheerio');
const cheerioTableParser = require('cheerio-tableparser');
const replaceLocationToISO = require('./replaceLocationToISO');

var fetchData = function () {
    rq.get({'url': 'http://www.dgpa.gov.tw/nds.html'}, function (err, res, body) {
        if (!err && res.statusCode === 200) {
            parseHTML(body);
        } else {
            console.error('Error when fetching data');
            console.error(err.code);
        }
    });
};

var parseHTML = function (rawHTMl) {
    var $ = cheerio.load(rawHTMl);
    cheerioTableParser($);

    var data = $('table[bgcolor="#cdfad9"]').parsetable(false, false, true);
    var lastUpdated = $('td > p > font[color="#000000"]').first().text();

    var cities = null;
    var status = null;

    if (data[2]) {
        // If there is an additional "area" column
        cities = data[1].slice(1);
        status = data[2].slice(1);
    } else {
        // There is no "area" column
        cities = data[0].slice(1);
        status = data[1].slice(1);
    }

    var result = null;

    if (cities[0].match('無停班停課訊息。') === null) {
        result = mergeArray(cities, status);
        resultHandler(result, lastUpdated);
    } else {
        console.log('No Information.');
    }

};

var mergeArray = function (column, data) {
    var obj = {};
    for (var i = 0; i < column.length; i++) {
        obj[replaceLocationToISO(column[i])] = data[i].replace('  ', '\n');
    }
    return obj;
};

var resultHandler = function (result, lastUpdatedTime) {
    var msg = result[process.argv[2]];
    if (msg) {
        if (msg.match('已達') || msg.match(/.*停止上班.*、/g) || msg.match(/、.*停止上課.*/g)) {
            // add a warning color + bold
            msg = '\033[01m\033[31m' + msg + '\033[0m';
        }
        console.log(msg);
        console.log(lastUpdatedTime);
    } else if (result && process.argv[2]) {
        console.error('No Information for specified city.');
        console.log(lastUpdatedTime);
    } else if (process.argv[2]) {
        console.error('Please use a City Code that match ISO 3166-2:TW format.');
    } else {
        console.error('Please specify a city with ISO 3166-2:TW format.');
    }
};

fetchData();
