const { Client } = require('@notionhq/client');

if (!process.env.NOTION_TOKEN) throw new Error('Missing NOTION_TOKEN');
if (!process.env.NOTION_DB_ID) throw new Error('Missing NOTION_DB_ID');

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DB_ID = process.env.NOTION_DB_ID;

async function queryPublished(lang) {
  const filter = { and: [{ property: 'Published', checkbox: { equals: true } }] };
  if (lang) filter.and.push({ property: 'Language', select: { equals: lang } });

  const resp = await notion.databases.query({
    database_id: DB_ID,
    filter,
    sorts: [{ property: 'Name', direction: 'ascending' }]
  });

  return resp.results.map((page) => {
    const p = page.properties || {};
    const name = p?.Name?.title?.[0]?.plain_text || 'Untitled';
    const category = p?.Category?.select?.name;
    const url = p?.URL?.url;
    const address = p?.Address?.rich_text?.[0]?.plain_text;
    let image;
    const files = p?.Image?.files || [];
    if (files.length) {
      const f = files[0];
      image = f?.external?.url || f?.file?.url;
    }
    const language = p?.Language?.select?.name;
    const featured = !!p?.Featured?.checkbox;
    return { id: page.id, name, category, url, address, image, language, featured };
  });
}

module.exports = { queryPublished };
