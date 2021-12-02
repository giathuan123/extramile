# Intro
## Preparing Data
Since the data is too big we must repackage into smaller junks, get the fields we are interested in and recombine them back into a single json file.
Firstly to segment the data into junks.
Run

``` node segment.js < <data.csv> ```

This will produce around 6 outFiles.json.

On each of the outFiles.json run

``` node repackage.js outFile[N].json > repacked[N].json```

to repackage each segment to the desired data representation.

Lastly, you must combine back all the segments.

``` mv repacked*.json repackedData ```\
``` node combine.js  > data.json ```\

` data.json ` is the final data file.\
Make a `data` folder in `db`. The loader will load from this data file.

## Indexes
When the loader pulls in the data it will automatically build the index for that data. To use the index just do\
``` const { indexes } = require(".pathto/dbloader.js")```
### How indexes work?
`indexes` is a container for multiple index. For example, I have built the TimeIndex and the CityIndex if you wish to create your own index like a StateIndex or a SeverityIndex you can do so as well. An index at its core is just an object with the keys being the field of interest and the value being an array of accident ids that have that field. For example, one entry in the TimeIndex is:\
``` {'2016-09-20': ['A-2039410', ...]} ``` 

An index also have a fieldGetter. fieldGetter is a function that is used to get the field of interest from the data. This is implemented this way because with a fieldGetter you can use any arbritrary data format that has that field of interest to do query, add, delete in the index. You just have to save the original fieldGetter, implement your own. Now you can add data to the index, delete from the index, query the index with that data format. After the operations, you must restore the original fieldGetter so the default fieldGetter can be used with the original data format. An example is in the query route.
## Querying the indexes.
To query the indexes.
``` indexes.queryIndex(data) ```. Data is an object with the field of interest. indexes will query all the index in the container and return an array of accident id that matches that field of interest.
## Deleting from and adding to the indexes.
When deleteing from or adding to an index you must provide an object in this format.
``` {<accident-id>: <data> } ```
You only need to do
``` indexes.addData(data) or indexes.removeData(data) ``` and the index container will ensure consistency amongst all its indexes.
##Unit Tests
1) install jest (npm i jest)
2) Add this to package.json
 "scripts": {
    "test": "jest",
    "start": "node server.js"
  },
3) run npm test in test directory
 
##Update node

1)command -v nvm (checks if you have nvm)
2)source ~/.nvm/nvm.sh
3)nvm install node


