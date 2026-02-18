import Parser from "rss-parser";
import promptModule from 'prompt-sync';

const prompt = promptModule({sigint: true});
const parser = new Parser();

const customItems = [];
const urls = [ 
    "https://www.bonappetit.com/feed/recipes-rss-feed/rss",
    // "https://www.specialtyfood.com/rss/featured-articles/category/lunch/",
    // "https://www.reddit.com/r/recipes/.rss"
];

function aggregate(responses) {
    const feedItems = [];
    for (let {items} of responses) {
        for (let {title, link} of items) {
            if (title.toLowerCase().includes('year')) {
                feedItems.push({title, link});
            }
        }
    }

    return feedItems;
};

function print(feedItems) {
    const response = prompt("Add item: ");
    const [title, link] = response.split(',');
    if (![title, link].includes(undefined)) {
        customItems.push({title, link})
    }
    console.clear();
    console.table(feedItems.concat(customItems));
    console.log('Last Updated ', (new Date()).toUTCString());
};

async function main() {
    const awaittableRequests = urls.map(url => parser.parseURL(url));
    const responses = await Promise.all(awaittableRequests);
    const feedItems = aggregate(responses);
    print(feedItems);
};

setInterval(main, 2000);