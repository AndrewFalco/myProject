const fs = require('fs');

// eslint-disable-next-line no-console
fs.rmdir('node_modules/.cache', { recursive: true }, () => { console.log('\n\n>>>> cache has been removed <<<<\n\n'); });
