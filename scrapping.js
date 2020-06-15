const request = require('request');
const cheerio = require('cheerio');
const url = "https://namu.wiki/w/%EC%95%84%EC%9D%B4%EC%96%B8%EB%A7%A8(%EC%98%81%ED%99%94)";

request(url, (error, response, body) => {
    if (error) throw error;
    
    let $ = cheerio.load(body);
    try {
        let director = [];
        let casting = [];
        let year = 0;
        let runningTime = 0;
        let data = $("table.wiki-table").html();
        console.log(data);
    } catch (error) {
        console.log(error);
    }

});