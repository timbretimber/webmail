import { createHmac } from 'crypto';

const CAMO_HOST = process.env.CAMO_HOST || '';
const CAMO_KEY = process.env.CAMO_KEY || '';
const camoUrl = URL.parse(CAMO_HOST)


export function getCamoUrl(url: URL): string {
  if (!camoUrl || !CAMO_KEY) throw new Error("Missing host or key");

  if (!camoUrl) throw new Error(`Invalid camo url ${process.env.CAMO_HOST}`);

  if (url.origin === camoUrl.origin) return url.href

  const safeUrl = URL.parse(url)
  if (!safeUrl) throw new Error(`invalid url ${url}`)

  safeUrl.hash = ''
  const hexUrl = Buffer.from(safeUrl.href).toString('hex');
  const hmac = createHmac('sha1', CAMO_KEY);
  hmac.update(url.href);
  const digest = hmac.digest('hex');

  camoUrl.pathname = `${digest}/${hexUrl}`

  console.log(camoUrl)
  return camoUrl.href;
}
