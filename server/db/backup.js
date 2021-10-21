const fs = require('fs');
const path = require('path');

function backup(newData) {
    let data = JSON.stringify(newData);
    fs.writeFileSync(path.resolve(__dirname, '../data/testData.json'), data), function(err, result) {
        if(err) console.log('error', err);
    };
    // console.log("backup in progress");
}

exports.backup = backup;