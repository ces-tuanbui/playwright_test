import { test, expect } from "@playwright/test";
const { chromium } = require("@playwright/test");
import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";
import { promises as fs } from "fs";

dotenv.config();

cloudinary.config({
  cloud_name: "djmxwdjsz",
  api_key: "988461678932317",
  api_secret: "_3Jc5XHxAXDpI2W6AdbTJ1hchqA",
  secure: true,
});

const url = "https://www.veracode.com";
const date = new Date(Date.now());

test("take snapshot", async ({ page }) => {
  const screenshotPath = `screenshots/${date.toISOString()}.png`;
  await page.goto(url);
  await page.screenshot({
    path: screenshotPath,
    fullPage: true,
  });

  const results = await cloudinary.uploader.upload(screenshotPath);
  await page.close();

  const data = {
    url,
    date,
    image: {
      url: results.secure_url,
      width: results.width,
      height: results.height,
    },
  };
  console.log("data", data);
  // await fs.writeFile(
  //   `./archives/${date.toISOString()}.json`,
  //   JSON.stringify(data, null, 2)
  // );
});
