import puppeteer from "puppeteer";


function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

(async () => {
    const DELAY = 1.3 //! in hours
    const PROFILE_NAME = 'Default' //! профиль гугл хром с аккаунтом тг

    const browser = await puppeteer.launch({
        headless:true,
        userDataDir:'C:/Users/Administrator/AppData/Local/Google/Chrome/User Data/',
        args:['--profile-directory='+PROFILE_NAME,'--no-sandbox']//название профиля
    });

    let counter = 0

    while (true) {

        const page = await browser.newPage();
        await page.setViewport({width:1920,height:1080})

        await page.goto('https://web.telegram.org/a/#6739011720',{waitUntil:'networkidle2'})

        const btn  = await page.waitForSelector('::-p-xpath(//button/*[contains(text(),"Open Wallet")])');

        await btn.click({delay:500})
        await btn.click({delay:500})
        
        
        await delay(4000)
        
        await page.mouse.click(1100,700)
        await delay(4000)

        await page.mouse.click(1150,650)
        await page.mouse.click(1150,650)

        
        await delay(30000)
        browser.close()
        counter= counter+1
        console.log('OK',counter);

        await delay(DELAY*3600*1000+getRndInteger(1,5000))
    }

    

})();