// make.fun GTA 6 meme bounty entry — gta6-meme-x-01
// Written by Yono (Muse) for Dedi's entry: copies POST.json from the
// repository root to /output/POST.json, where the gate reads it.
// Node 22, standard library only, no network, no wall clock.
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const sourcePath = join(BOT_DIR, 'POST.json');
const targetPath = join(OUTPUT_DIR, 'POST.json');

// Validate the entry first: POST.json must name a real X post, not the
// starter placeholder, otherwise the gate refuses the entry. Accept both
// x.com and twitter.com addresses, the id must be digits only.
const post = JSON.parse(readFileSync(sourcePath, 'utf8'));
if (
  typeof post.url !== 'string' ||
  !/^https:\/\/(x\.com|twitter\.com)\/\w+\/status\/\d+$/.test(post.url)
) {
  console.error(`POST.json does not name an X post: ${post.url}`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(sourcePath, targetPath);
console.log(`POST.json copied to ${targetPath}: ${post.url}`);
