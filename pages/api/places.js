import { queryPublished } from '../../lib/notion';

export default async function handler(req, res) {
  try {
    const lang = (req.query.lang || '').toString();
    const items = await queryPublished(lang);
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=600');
    res.status(200).json({ items });
  } catch (e) {
    res.status(500).json({ error: e?.message || 'Internal Error' });
  }
}
