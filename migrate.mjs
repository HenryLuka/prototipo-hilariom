import fs from 'fs';
import { obras } from './src/data/obras.js';
import { produtos } from './src/data/produtos.js';

if (!fs.existsSync('./src/data/obras')) fs.mkdirSync('./src/data/obras', { recursive: true });
if (!fs.existsSync('./src/data/produtos')) fs.mkdirSync('./src/data/produtos', { recursive: true });
if (!fs.existsSync('./src/data/parcerias')) fs.mkdirSync('./src/data/parcerias', { recursive: true });

obras.forEach(o => {
  fs.writeFileSync(`./src/data/obras/${o.id}.json`, JSON.stringify(o, null, 2));
});

produtos.forEach(p => {
  fs.writeFileSync(`./src/data/produtos/${p.id}.json`, JSON.stringify(p, null, 2));
});

const parceiros = [
  { name: 'Votorantim Cimentos', time: '15 anos', logo: 'https://placehold.co/300x120/fcfcfc/1a1a1a?text=Votorantim\nCimentos&font=montserrat' },
  { name: 'Gerdau', time: '12 anos', logo: 'https://placehold.co/300x120/fcfcfc/1a1a1a?text=Gerdau&font=montserrat' },
  { name: 'ArcelorMittal', time: '10 anos', logo: 'https://placehold.co/300x120/fcfcfc/1a1a1a?text=ArcelorMittal&font=montserrat' },
  { name: 'Tigre', time: '8 anos', logo: 'https://placehold.co/300x120/fcfcfc/1a1a1a?text=Tigre&font=montserrat' },
];

parceiros.forEach(p => {
  const id = p.name.toLowerCase().replace(/\s+/g, '-');
  fs.writeFileSync(`./src/data/parcerias/${id}.json`, JSON.stringify(p, null, 2));
});

console.log('Migration to JSON completed!');
