const path = require('path');
const processor = require('./processor');
const es6Flavor = require('./flavor_profiles/javascript/es6.json');
const importsFlavor = require('./flavor_profiles/javascript/imports.json');

// EXAMPLE USAGE
const flavors = [es6Flavor, importsFlavor];
// Get a known module
const root = path.join(process.cwd(), 'node_modules', 'glob');
const results = processor.taste(root, flavors);
console.log(JSON.stringify(results, null, 2));