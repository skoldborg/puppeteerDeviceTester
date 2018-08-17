const fs = require('fs');
const del = require('del');
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');

const URL = process.env.URL || 'https://www.google.com';
const OUTPUT_DIR = process.env.OUTPUT_DIR || `screenshots/${slugify(URL)}`;
const DEVICES = ['iPhone 6', 'iPhone 8', 'Galaxy S5', 'Nexus 10'];

function slugify(str) {
    return str.replace(/[\/:]/g, '_');
}

function mkdirSync(dirPath) {
    try {
        fs.mkdirSync(dirPath);
    } catch (err) {
        if (err.code !== 'EEXIST') {
            throw err;
        }
    }
}

(async () => {
    mkdirSync(OUTPUT_DIR); 
    await del([`${OUTPUT_DIR}/*`]);

    for (let i = 0; i < DEVICES.length; i++) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        await page.emulate(devices[DEVICES[i]]);
        
        await page.goto(URL, { waitUntil: ['domcontentloaded'] });
        
        await page.screenshot({ path: `${OUTPUT_DIR}/${DEVICES[i]}.png`, fullpage: true });
        await browser.close();
    }
})();