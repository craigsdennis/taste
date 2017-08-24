const grasp = require('grasp');

function search(query, code) {
    return grasp.search('squery', query, code);
}

function count(query, code) {
    return search(query, code).length;
}

module.exports = {
    search,
    count
}
