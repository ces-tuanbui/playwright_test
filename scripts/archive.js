const { chromium } = require("@playwright/test");
const { v2 } = require("cloudinary");

v2.config({
  cloud_name: "djmxwdjsz",
  api_key: "988461678932317",
  api_secret: "_3Jc5XHxAXDpI2W6AdbTJ1hchqA",
  secure: true,
});

const url = "https://www.veracode.com";
const date = new Date(Date.now());

const test = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const screenshotPath = `screenshots/${date.toISOString()}.png`;
  await page.goto(url);
  await page.screenshot({
    path: screenshotPath,
    fullPage: true,
  });

  const results = await v2.uploader.upload(screenshotPath);
  console.log(results);
  await browser.close();
};

test();
const archive = {
  url,
  date,
};
