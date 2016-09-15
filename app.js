const rp = require('request-promise')
const cheerio = require('cheerio');
const cheerioTableParser = require('cheerio-tableparser')

rp('http://www.dgpa.gov.tw/nds.html')
    .then(function(res){
        parseHTML(res)
    })
    .catch(function (err) {
        console.error('Error when fetching data')
    });

var parseHTML = function(rawHTMl){
    var $ = cheerio.load(rawHTMl)
    cheerioTableParser($);

    var data = $('table[bgcolor="#cdfad9"]').parsetable(false,false,true)

    var cities = data[0].slice(1)
    var status = data[1].slice(1)

    console.log(mergeArray(cities, status));
}

var mergeArray = function(column, data) {
    var obj = {}
    for(var i=0; i < column.length; i++){
        obj[column[i]] = data[i]
    }
    return obj
}
