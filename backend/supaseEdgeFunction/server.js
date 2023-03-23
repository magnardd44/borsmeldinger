const express = require('express');
const puppeteer = require('puppeteer');
const { createClient } = require('@supabase/supabase-js');

//const supabaseUrl = 'SUPABASE_URL';
//const supabaseKey = 'SUPABASE_KEY';

//const client = createClient(supabaseUrl, supabaseKey);

const app = express();



const targetURL = "https://newsweb.oslobors.no/";



app.get('/', async (req, res) => {
    try {
        const browser = await puppeteer.connect({
            browserWSEndpoint: 'BROWSERLESS_ENDPOINT',
        });
        const page = await browser.newPage();
        await page.goto(targetURL);

        await page.waitForSelector("table");
    
        const html = await page.content();

        await browser.close();


        const $ = cheerio.load(html);

        const elem = $("tbody").children('tr').first();

        const event = {};

        event.time = $(elem).find(".kzwcbj").text();
        event.utst_id = $(elem).find(".hlFPFz").text();
        event.title = $(elem).find(".jzDNAp span span:first").text();
        event.vedlegg = $(elem).find(".edoIV").text();
        event.kategori = $(elem).find(".ePJIxm span span:first").text();
        event.url = `${targetURL}${$(elem).find(".gguAuF").attr('href')}`;  
  
        res.send(event);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred during scraping');
    }
  });
  
  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });