import { execSync } from 'child_process';
execSync('node ./node_modules/tailwindcss/lib/cli.js init -p', { stdio: 'inherit' });
