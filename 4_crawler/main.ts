import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-native.ts";

interface Hyperlink {
  url: string;
  alive: boolean;
  hyperlinks: Hyperlink[];
}

async function main(args: string[]) {
  const startingUrl = args[0];
  const tree = await crawl(startingUrl, []);

  const flat = flattenHyperlinks(tree);
  console.log(flat);

}

function flattenHyperlinks(tree: Hyperlink | null) {
  if (!tree) return [];
  const flat: Hyperlink[] = [];
  for (const link of tree.hyperlinks) {
    flat.push(...flattenHyperlinks(link));
  }
  tree.hyperlinks = [];
  flat.push(tree);
  return flat;
}

async function crawl(url: string, crawled: string[]): Promise<Hyperlink | null> {
  if (!isHyperlink(url) || crawled.includes(url)) return null
  
  const response = await fetch(url);
  if (!response.ok) return null;

  crawled.push(url);
  const hyperlinks: Hyperlink[] = [];
  const links = getLinks(await response.text()) || [];
  for await (const link of links) {
    const hyperlink = await crawl(link, crawled)
    if (hyperlink) hyperlinks.push(hyperlink)
  }
  return {
    url: url,
    alive: response.ok,
    hyperlinks: hyperlinks
  } as Hyperlink;
}

function isHyperlink(url: string) {
  return url.startsWith('http://'); 
}

function toFullUrl(url: string) {
  // must start with host
  url = url.startsWith('/')
    ? `${Deno.args[0]}${url}`
    : url;
  // must end with /
  url = url.endsWith('/')
    ? url
    : `${url}/`
  return url;
}

function getLinks(html: string) {
  const dom = new DOMParser()
    .parseFromString(html, "text/html");
  const anchors = dom?.getElementsByTagName("a");
  const urls = anchors?.map( e => e.getAttribute("href") || "");
  return urls?.map(url => toFullUrl(url)) || [];
}

await main(Deno.args);
