const Chrome = require('puppeteer');
const {spawn} = require('child_process');
const ports = require('port-authority');

async function setup(context) {

    console.log('Launching test server...');
	if(!(await ports.check(7000))) throw new Error("Port 7000 already in use, can't launch test server.")
    context.srv = spawn('node',['esbuild', '--test']);
    process.on("exit", () => context.srv.kill());
    await ports.wait(7000);

    console.log('Launching Chrome...');
	context.browser = await Chrome.launch({ headless: true });
	context.page = await context.browser.newPage();
  
    context.page.setDefaultTimeout('15000');


    context.page.innerText = async selector => {
        try{
            return await context.page.$eval(selector, e => e.innerText);
        }catch{
            return null;
        }
    }

    await context.page.goto('http://localhost:7000/')
}

async function cleanup(context) {
    console.log('Done ✅')
    console.log('Stopping Chrome...');
	await context.page.close();
	await context.browser.close();

    console.log('Stopping test server...');
    context.srv.kill();
}

module.exports = {
    setup,
    cleanup
}
