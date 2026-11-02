import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.resolve(__dirname, '../artifacts/cruzeiro-do-sul/public/assets-reference');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const assets = [
  { name: 'logo.png', url: 'https://apometria-fraternity-hub.lovable.app/__l5e/assets-v1/0669ad8f-89eb-493f-a170-aaf1c4dba823/fraternidade.png' },
  { name: 'favicon.png', url: 'https://apometria-fraternity-hub.lovable.app/favicon.png' },
  { name: 'hero.png', url: 'https://apometria-fraternity-hub.lovable.app/__l5e/assets-v1/09954440-8f67-4c19-95bb-51678b21853d/hero-new.png' },
  { name: 'session-inside.png', url: 'https://apometria-fraternity-hub.lovable.app/__l5e/assets-v1/c5fc8e57-5e91-4aea-a3c1-afcbad352e24/session-inside-new.png' },
  { name: 'portas-abertas.png', url: 'https://apometria-fraternity-hub.lovable.app/__l5e/assets-v1/7118acb4-74c7-47a2-8695-2003e95cded6/portas-abertas-new.png' },
  { name: 'rubens.png', url: 'https://apometria-fraternity-hub.lovable.app/__l5e/assets-v1/46b1bef3-ff9e-48ff-9e12-d07a3e2b4f30/rubens.png' },
  { name: 'marcilene.png', url: 'https://apometria-fraternity-hub.lovable.app/__l5e/assets-v1/c60cdcdf-3318-4ea3-a323-bcc2f0cacb22/marcilene.png' },
  { name: 'elton.png', url: 'https://apometria-fraternity-hub.lovable.app/__l5e/assets-v1/afce57b2-a534-4c93-9330-085f6274e4e8/elton.png' },
  { name: 'denise.png', url: 'https://apometria-fraternity-hub.lovable.app/__l5e/assets-v1/45493dfd-406b-4728-bcaa-420ad084c38b/denise.png' },
  { name: 'cristiane.png', url: 'https://apometria-fraternity-hub.lovable.app/__l5e/assets-v1/8e601334-7fdd-4239-9c13-a25f02b4c8ff/cristiane.png' },
  { name: 'walquiria.png', url: 'https://apometria-fraternity-hub.lovable.app/__l5e/assets-v1/70d7a573-7ff5-4792-9727-9a615cffe15d/walquiria.png' },
  { name: 'sergio.png', url: 'https://apometria-fraternity-hub.lovable.app/__l5e/assets-v1/22fb2411-2fde-4b6d-86fb-22ad9bc762bc/sergio.png' }
];

async function downloadAll() {
  console.log('Downloading assets to', targetDir);
  for (const asset of assets) {
    try {
      const res = await fetch(asset.url);
      if (!res.ok) {
        console.error(`Failed to download ${asset.name}: status ${res.status}`);
        continue;
      }
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const dest = path.join(targetDir, asset.name);
      fs.writeFileSync(dest, buffer);
      console.log(`Saved ${asset.name} (${buffer.length} bytes)`);
    } catch (err) {
      console.error(`Error downloading ${asset.name}:`, err.message);
    }
  }
}

downloadAll();
