const fs = require('fs');
const path = require('path');

const dirname = path.resolve(__dirname, '../data/backups')

function setup() {

    const currData = getMostRecentBackup(dirname);
    
    if ( typeof currData !== 'undefined' && currData) {
        // check if file is valid json, if not warn the user and exit
        // load data from file
    }
    else {
        // attempt to load from csv file
        console.log("Attempting to load data from csv file...");
    }

    // if the csv file does not exist, give an error
}

function backup(newData) {
    console.log("Backup in progress...")
    let data = JSON.stringify(newData);
    fs.writeFileSync(path.resolve(__dirname, '../data/testData.json'), data), function(err, result) {
        if(err) console.log('error', err);
    };
    console.log("Backup successful...");
}

function getMostRecentBackup(dir) {
    const files = orderBackups(dir);
    return files.length ? files[0] : undefined;
}

function orderBackups(dir) {
    return fs.readdirSync(dir)
        .filter( (file) => fs.lstatSync(path.join(dir, file)).isFile())
        .map( (file) => ({
            file, mtime: fs.lstatSync(path.join(dir,file)).mtime
        }))
        .sort((a,b) => b.mtime.getTime() - a.mtime.getTime());
}

module.exports = {backup, setup};
