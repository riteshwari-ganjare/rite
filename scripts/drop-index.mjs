// Run once: node scripts/drop-index.mjs
import mongoose from 'mongoose';
import { readFileSync } from 'fs';
const env = Object.fromEntries(
  readFileSync('.env.local', 'utf8').split('\n')
    .filter(l => l.includes('='))
    .map(l => l.split('=').map(s => s.trim()))
    .map(([k, ...v]) => [k, v.join('=')])
);
const MONGODB_URI = env.MONGODB_URI;
if (!MONGODB_URI) { console.error('MONGODB_URI not set in .env.local'); process.exit(1); }

await mongoose.connect(MONGODB_URI);
const collection = mongoose.connection.db.collection('dailymenus');

try {
  await collection.dropIndex('userEmail_1_date_1');
  console.log('✅ Old index dropped. Saving will now work.');
} catch (e) {
  console.log(e.codeName === 'IndexNotFound' ? 'ℹ️ Index already gone.' : '❌ ' + e.message);
}

await mongoose.disconnect();
process.exit(0);
