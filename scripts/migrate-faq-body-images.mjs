import crypto from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const projectRoot = process.cwd();
const faqContentPath = path.join(projectRoot, 'src', 'data', 'faq-content.json');
const dutchRichArticlesPath = path.join(projectRoot, 'src', 'lib', 'faq', 'dutch-rich-articles.ts');
const uploadDirectory = path.join(projectRoot, 'public', 'uploads', 'faq');
const odooBaseUrl = (process.env.ODOO_BASE_URL?.trim() || 'https://vesalius.odoo.com').replace(/\/$/, '');

const REMOTE_IMAGE_PATTERN = /https:\/\/www\.vesalius\.ai\/web\/image\/[^\s"'<>\\]+/g;

function sanitizeFileName(fileName) {
  return fileName.replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/-+/g, '-');
}

function buildLocalFileName(remoteUrl) {
  const parsed = new URL(normalizeRemoteUrl(remoteUrl));
  const pathname = parsed.pathname.split('/').filter(Boolean);
  const attachmentSegment = pathname.at(-2) ?? 'faq-image';
  const originalName = pathname.at(-1) ?? 'image';
  const normalizedName = sanitizeFileName(decodeURIComponent(originalName));
  const extension = path.extname(normalizedName) || '.bin';
  const baseName = path.basename(normalizedName, extension) || 'image';
  const shortHash = crypto.createHash('sha1').update(remoteUrl).digest('hex').slice(0, 8);

  return `${attachmentSegment}-${baseName}-${shortHash}${extension}`;
}

function normalizeRemoteUrl(remoteUrl) {
  return remoteUrl
    .replace(/\\+$/g, '')
    .replace('https://www.vesalius.ai/web/image', `${odooBaseUrl}/web/image`)
    .replace('https://vesalius.ai/web/image', `${odooBaseUrl}/web/image`);
}

async function downloadFile(remoteUrl, targetPath) {
  const response = await fetch(normalizeRemoteUrl(remoteUrl), {
    headers: {
      'User-Agent': 'vesalius-faq-image-migrator/1.0',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to download ${remoteUrl}: ${response.status} ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  await writeFile(targetPath, Buffer.from(arrayBuffer));
}

function replaceRemoteUrls(input, replacements) {
  let output = input;

  for (const [remoteUrl, localUrl] of replacements.entries()) {
    output = output.replaceAll(remoteUrl, localUrl);
  }

  return output;
}

async function main() {
  await mkdir(uploadDirectory, { recursive: true });

  const faqContent = await readFile(faqContentPath, 'utf8');
  const dutchRichArticles = await readFile(dutchRichArticlesPath, 'utf8');
  const joinedSource = `${faqContent}\n${dutchRichArticles}`;
  const originalRemoteUrls = [...new Set(joinedSource.match(REMOTE_IMAGE_PATTERN) ?? [])];

  if (originalRemoteUrls.length === 0) {
    console.log('No remote FAQ body images found.');
    return;
  }

  const replacements = new Map();

  for (const originalRemoteUrl of originalRemoteUrls) {
    const remoteUrl = normalizeRemoteUrl(originalRemoteUrl);
    const localFileName = buildLocalFileName(remoteUrl);
    const localRelativeUrl = `/uploads/faq/${localFileName}`;
    const localAbsolutePath = path.join(uploadDirectory, localFileName);

    await downloadFile(remoteUrl, localAbsolutePath);
    replacements.set(originalRemoteUrl, localRelativeUrl);
    replacements.set(remoteUrl, localRelativeUrl);
    console.log(`Downloaded ${remoteUrl} -> ${localRelativeUrl}`);
  }

  await writeFile(faqContentPath, replaceRemoteUrls(faqContent, replacements));
  await writeFile(dutchRichArticlesPath, replaceRemoteUrls(dutchRichArticles, replacements));

  console.log(`Migrated ${originalRemoteUrls.length} FAQ body images to local uploads.`);
}

await main();
