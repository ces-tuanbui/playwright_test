// Add import of CheerioCrawler
const { RequestQueue, CheerioCrawler } = require("crawlee");

const urls = [];
const crawData = async () => {
  const requestQueue = await RequestQueue.open();
  await requestQueue.addRequest({
    url: "https://www.veracode.com/sitemap.xml",
  });

  const crawler = new CheerioCrawler({
    requestQueue,
    async requestHandler({ $, request }) {
      $("loc").each((index, elemnet) => {
        const url = $(elemnet).text();
        urls.push(url);
      });
      console.log("urls", urls.length);
    },
  });
  await crawler.run();
};

crawData();
