const functions = require("firebase-functions");
const cheerio = require('cheerio');
const puppeteer = require('puppeteer')

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started


const targetURL = "https://newsweb.oslobors.no";

async function scrapeAndReturn() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(targetURL);
  await page.waitForSelector("table");

  const html = await page.content();
  const $ = cheerio.load(html);

  const firstEvent = $("tbody").children('tr').first();

  const event = {};

  $(firstEvent).each((i, elem) => {

    event.time = $(elem).find(".kzwcbj").text();
    event.utst_id = $(elem).find(".hlFPFz").text();
    event.title = $(elem).find(".jzDNAp span span:first").text();
    event.vedlegg = $(elem).find(".edoIV").text();
    event.kategori = $(elem).find(".ePJIxm span span:first").text();
    event.url = `${targetURL}${$(elem).find(".gguAuF").attr('href')}`;  

  });

  await browser.close();

  return event;

}


exports.helloWorld = functions.https.onRequest(async(request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    
    const data = await scrapeAndReturn();
    response.send(data);
});



