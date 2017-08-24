const grasp = require('grasp');

function search(query, code) {
    const nodes = grasp.search('squery', query, code) || [];
    return nodes;
}

function count(query, code) {
    const nodes = search(query, code);
    return nodes.length;
}

module.exports = {
    search,
    count
}
