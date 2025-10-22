import Head from 'next/head';
import useSWR from 'swr';

const fetcher = (u) => fetch(u).then((r) => r.json());

export default function Home() {
  const { data } = useSWR('/api/places?lang=ko', fetcher);
  const items = data?.items || [];

  return (
    <>
      <Head>
        <title>PACRYLIC · Korea Guide</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main style={{ maxWidth: 960, margin: '0 auto', padding: 16 }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h1 style={{ margin: 0 }}>PACRYLIC · Korea Guide</h1>
          <nav style={{ display: 'flex', gap: 10 }}>
            <a href="/guide" style={{ fontWeight: 700, textDecoration: 'none' }}>/guide</a>
            <a
              href="https://adventurous-dimple-927.notion.site/NFC-Korean-Travel-Guide-Smart-Digital-Keyring-272d0cb30566808a9077c65aaeb5b829"
              target="_blank" rel="noopener" style={{ fontWeight: 700, textDecoration: 'none' }}
            >
              Notion
            </a>
          </nav>
        </header>

        <section>
          <h2>추천 장소</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 12 }}>
            {items.map((p) => (
              <article key={p.id} style={{ background: '#fff', borderRadius: 14, padding: 12, boxShadow: '0 6px 18px rgba(0,0,0,.07)' }}>
                {p.image && <img src={p.image} alt={p.name} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 12, marginBottom: 8 }} />}
                <h3 style={{ margin: '4px 0' }}>{p.name}</h3>
                {p.category && <div style={{ color: '#0f7a7a', fontWeight: 700, fontSize: 12 }}>{p.category}</div>}
                {p.address && <div style={{ color: '#6b7280', fontSize: 12 }}>{p.address}</div>}
                {p.url && (
                  <a href={p.url} target="_blank" rel="noopener" style={{ color: '#0f7a7a', fontWeight: 700, textDecoration: 'none' }}>
                    지도 열기
                  </a>
                )}
              </article>
            ))}
          </div>
          {items.length === 0 && <p style={{ color: '#6b7280' }}>노션 DB에서 Published가 체크된 데이터가 없습니다.</p>}
        </section>
      </main>
    </>
  );
}
