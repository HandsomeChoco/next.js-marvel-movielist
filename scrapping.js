const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');


const movie = "(%EC%98%81%ED%99%94)";
const urls = {
    //phase 1
    ironman: "https://namu.wiki/w/%EC%95%84%EC%9D%B4%EC%96%B8%EB%A7%A8"+movie,
    hulk: "https://namu.wiki/w/%EC%9D%B8%ED%81%AC%EB%A0%88%EB%8D%94%EB%B8%94%20%ED%97%90%ED%81%AC",
    ironman2: "https://namu.wiki/w/%EC%95%84%EC%9D%B4%EC%96%B8%EB%A7%A8%202",
    godOfThunder: "https://namu.wiki/w/%ED%86%A0%EB%A5%B4:%20%EC%B2%9C%EB%91%A5%EC%9D%98%20%EC%8B%A0",
    firstAvenger: "https://namu.wiki/w/%ED%8D%BC%EC%8A%A4%ED%8A%B8%20%EC%96%B4%EB%B2%A4%EC%A0%B8",
    avengers: "https://namu.wiki/w/%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%8A%A4"+movie,
    //phase 2
    ironman3: "https://namu.wiki/w/%EC%95%84%EC%9D%B4%EC%96%B8%EB%A7%A8%203",
    darkWorld: "https://namu.wiki/w/%ED%86%A0%EB%A5%B4:%20%EB%8B%A4%ED%81%AC%20%EC%9B%94%EB%93%9C",
    winterSoldier: "https://namu.wiki/w/%EC%BA%A1%ED%8B%B4%20%EC%95%84%EB%A9%94%EB%A6%AC%EC%B9%B4:%20%EC%9C%88%ED%84%B0%20%EC%86%94%EC%A0%B8",
    gog: "https://namu.wiki/w/%EA%B0%80%EB%94%94%EC%96%B8%EC%A6%88%20%EC%98%A4%EB%B8%8C%20%EA%B0%A4%EB%9F%AD%EC%8B%9C"+movie,
    ageOfUltron: "https://namu.wiki/w/%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%8A%A4:%20%EC%97%90%EC%9D%B4%EC%A7%80%20%EC%98%A4%EB%B8%8C%20%EC%9A%B8%ED%8A%B8%EB%A1%A0",
    antMan: "https://namu.wiki/w/%EC%95%A4%ED%8A%B8%EB%A7%A8"+movie,
    //phase 3
    civilWar: "https://namu.wiki/w/%EC%BA%A1%ED%8B%B4%20%EC%95%84%EB%A9%94%EB%A6%AC%EC%B9%B4:%20%EC%8B%9C%EB%B9%8C%20%EC%9B%8C",
    doctorStrange: "https://namu.wiki/w/%EB%8B%A5%ED%84%B0%20%EC%8A%A4%ED%8A%B8%EB%A0%88%EC%9D%B8%EC%A7%80"+movie,
    gogVol2: "https://namu.wiki/w/%EA%B0%80%EB%94%94%EC%96%B8%EC%A6%88%20%EC%98%A4%EB%B8%8C%20%EA%B0%A4%EB%9F%AD%EC%8B%9C%20VOL.2",
    homeComing: "https://namu.wiki/w/%EA%B0%80%EB%94%94%EC%96%B8%EC%A6%88%20%EC%98%A4%EB%B8%8C%20%EA%B0%A4%EB%9F%AD%EC%8B%9C%20VOL.2",
    ragnarok: "https://namu.wiki/w/%ED%86%A0%EB%A5%B4:%20%EB%9D%BC%EA%B7%B8%EB%82%98%EB%A1%9C%ED%81%AC",
    blackPanther: "https://namu.wiki/w/%EB%B8%94%EB%9E%99%20%ED%8C%AC%EC%84%9C"+movie,
    infinityWar: "https://namu.wiki/w/%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%8A%A4:%20%EC%9D%B8%ED%94%BC%EB%8B%88%ED%8B%B0%20%EC%9B%8C",
    antManAndWasp: "https://namu.wiki/w/%EC%95%A4%ED%8A%B8%EB%A7%A8%EA%B3%BC%20%EC%99%80%EC%8A%A4%ED%94%84",
    captainMarvel: "https://namu.wiki/w/%EC%BA%A1%ED%8B%B4%20%EB%A7%88%EB%B8%94"+movie,
    endGame: "https://namu.wiki/w/%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%8A%A4:%20%EC%97%94%EB%93%9C%EA%B2%8C%EC%9E%84",
    farFormHome: "https://namu.wiki/w/%EC%8A%A4%ED%8C%8C%EC%9D%B4%EB%8D%94%EB%A7%A8:%20%ED%8C%8C%20%ED%94%84%EB%A1%AC%20%ED%99%88",
    //phase 4
    blackWidow: "https://namu.wiki/w/%EB%B8%94%EB%9E%99%20%EC%9C%84%EB%8F%84%EC%9A%B0"+movie,

}
// for(let i in urls) {
    request(urls.ironman, (error, response, body) => {
        if (error)  {
            throw error;
        }
        let $ = cheerio.load(body);
    
        try {
            let director = [];
            let casting = [];
            let year = 0;
            let runningTime = 0;
            let data = $("div.wiki-table-wrap.table-center").eq(1)
            data.each(function(i, elem) {
                console.log(i, elem)
            })
            fs.writeFile('test.html', data.html(), (err) => {
                if(err) throw err;
            })
        } catch (error) {
            console.log(error);
        }
    });
// }
