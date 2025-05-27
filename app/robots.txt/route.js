const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export async function GET() {
  const content = `
User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
  `.trim();

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}