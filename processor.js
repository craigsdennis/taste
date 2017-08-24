const fs = require('fs');
const glob = require('glob');
const path = require('path');

const tasterRegistry = {};

function tasterForFlavor(flavor) {
    // Check for memoized value
    if (flavor._taster) {
        return flavor._taster;
    } else {
        const key = flavor.taster || 'javascript/squery';
        let taster = tasterRegistry[key];
        if (taster === undefined) {
            // TODO: Hello injection and need more ways in
            const requirePath = `./tasters/${key}`;
            console.log("Require path", requirePath);
            taster = require(requirePath);
            tasterRegistry[key] = taster;
        }
        flavor._taster = taster;
        return taster;
    }
}

function processFlavor(code, flavor) {
    const results = {};
    const taster = tasterForFlavor(flavor);
    if (flavor.counts) {
        results.counts = flavor.counts.reduce((profiles, def) => {
            profiles[def.name] = taster.count(def.query, code);
            return profiles;
        }, {});
    }
    if (flavor.values) {
        results.values = flavor.values.reduce((profiles, def) => {
            const nodes = taster.search(def.query, code);
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

function taste(root, flavors) {
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

module.exports = {
    taste
};