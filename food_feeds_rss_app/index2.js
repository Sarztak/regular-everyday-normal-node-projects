import Parser from "rss-parser";
import promptModule from 'prompt-sync';
const prompt = promptModule({sigint: true});
const parser = new Parser();

const url = "https://www.bonappetit.com/feed/recipes-rss-feed/rss";
const item = await parser.parseURL(url)
const keys = Object.keys(item)
const {items, title, language} = item;
const ele = items.map(({title, link}) => ({title, link})) 
function main() {
    console.log(title);
    console.table(ele);
    const response = prompt("Add item: ");
    const [_title, _link] = response.split(',');
    ele.push({title: _title, link: _link});
    console.clear();
    console.table(ele);
    main();
}

main();