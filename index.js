const fs = require('fs');
const glob = require('glob');
const grasp = require('grasp');
const path = require('path');
const es6Flavor = require('./flavor_profiles/javascript/es6.json');
const importsFlavor = require('./flavor_profiles/javascript/imports.json');

function search(query, code) {
    // TODO: squery the way to go?
    return grasp.search('squery', query, code);
}

function count(query, code) {
    return search(query, code).length;
}

function processFlavor(code, flavor) {
    const results = {};
    if (flavor.counts) {
        results.counts = flavor.counts.reduce((profiles, def) => {
            profiles[def.name] = count(def.query, code);
            return profiles;
        }, {});
    }
    if (flavor.values) {
        results.values = flavor.values.reduce((profiles, def) => {
            const nodes = search(def.query, code);
            profiles[def.name] = nodes.map(node => node.value);
            return profiles;
        }, {});
    }
    return results;
}

function processFlavors(code, flavors) {
    return flavors.reduce((profiles, flavor) => {
        profiles[flavor.name] = processFlavor(code, flavor);
        return profiles;
    }, {});
}

function processFilePath(filePath, flavors) {
    const code = fs.readFileSync(filePath, 'utf-8');
    return processFlavors(code, flavors);
}

function combineFilePathResults(filePathResults) {
    return Object.keys(filePathResults).reduce((results, filePath) => {
        if (Object.keys(results).length == 0) {
            results = Object.assign({}, filePathResults[filePath]);
        } else {
            const current = filePathResults[filePath];
            Object.keys(results).forEach(flavorKey => {
                if (results[flavorKey].counts) {
                    Object.keys(results[flavorKey].counts).forEach(countKey => {
                        results[flavorKey].counts[countKey] += current[flavorKey].counts[countKey];
                    });
                }
                if (results[flavorKey].values) {
                    Object.keys(results[flavorKey].values).forEach(valueKey => {
                        const uniq = new Set(results[flavorKey].values[valueKey].concat(current[flavorKey].values[valueKey]));
                        results[flavorKey].values[valueKey] = Array.from(uniq).sort();
                    })
                }

            });
        }
        return results;
    }, {})
}



function processCodeBase(root, flavors) {
    console.log("Processing root", root);
    const options = {
        ignore: ['**/node_modules/**'],
        cwd: root
    }
    const relativeFilePaths = glob.sync('**/*.js', options);
    console.log("Relative file paths", relativeFilePaths);
    const byFilePath = relativeFilePaths.reduce((results, filePath) => {
        results[filePath] = processFilePath(path.join(root, filePath), flavors);
        return results;
    }, {});
    return combineFilePathResults(byFilePath);
}

// EXAMPLE USAGE
const flavors = [es6Flavor, importsFlavor];
// Get a known module
const root = path.join(process.cwd(), 'node_modules', 'glob');
const results = processCodeBase(root, flavors);
console.log(JSON.stringify(results, null, 4));