# Intro

## Basic Requirments links
Since our code relies on NodeJS, please download NodeJS from this link: https://nodejs.org/en/download/ for your respective OS.

Download the CSV file that contains the data from this link : https://www.kaggle.com/sobhanmoosavi/us-accidents

We recommend using Visual Studio Code, however most other code editor should work but instructions would be written Visual Studio Code.

Visual studio Code: https://code.visualstudio.com/


## Downloading the GitHub Repository
To start off, download or clone the repository by clicking the green "CODE" button to bring down a drop down menu. 
### Git Clone Instructions
 1) Decide on a code editor you would like to use (we recommend Visual Studio Code).
 2) Copy the HTTPS repository link from the green "CODE" drop down menu.
 3) Open up a new folder in your code editor and go into it.
 4) Open up a terminal in that folder and type the following command.
 5) ``` git clone https://github.com/ucr-cs180-fall21/cs180project-021-extramile.git ``` 

Once that is finished, there should be a folder in the folder you originially created called ``` cs180project-021-extramile ```

### Zip Download Instructions
 1) Decide on a code editor you would like to use (we recommend Visual Studio Code).
 2) Download the ZIP from the green "CODE" drop down menu.
 3) Open up a new folder in your code editor and go into it.
 4) Extract the contents (folder) from the ZIP and move it into the new folder that was created.

Once that is finished, there should be a folder in the folder you originially created called ``` cs180project-021-extramile ```

## Initial Setup
Once the repository has been downloaded or cloned into the code editor. Open up the terminal and type ``` cd cs180project-021-extramile ```. This will bring you into our project folder.
 1) From here, cd into the server folder ``` cd server ```.
 2) Run the command ``` npm install ``` and wait for it to finish.
 3) Run the command ``` cd.. ``` (to go back into the main project folder) 
 4) Run the command ``` cd extramile-react ``` (to move into our front-end folder)
 5) Run the command in terminal  ``` npm install ``` and wait for it to finish.

Note: If there is an error called ``` npm ERR! code EINTEGRITY ``` in the terminal when doing step 5. Please delete the ``` package-lock.json ``` (PATH: cs180project-021-extramile/extramile-react/package-lock.json) and run this command in the terminal : ``` npm install --legacy-peer-deps ```.

## Preparing Data
Since the data is too big we must repackage into smaller junks, get the fields we are interested in and recombine them back into a single json file.

1) Grab the .csv file that was downloaded in the beginning and rename it to <data.csv> 
2) Move the file into PATH: cs180project-021-extramile/server/csvParser

3) To segment the data into junks.
   Run

   ``` node segment.js < data.csv ```

   This will produce around 6 outFiles.json labeled "outFile1.json,outFile2.json...outFile6.json"

4) On each of the outFiles

   Type in this command 6 times for all 6 outFile

   ``` node repackage.js outFile[N].json > repacked[N].json```

   ``` ie.(node repackage.js outFile1.json > repacked1.json, node repackage.js outFile2.json > repacked2.json ... etc) ```

   to repackage each segment to the desired data representation.

5) Now combine all the segments

   Move all the repacked[N].json files into the folder /repackedData by selecting all the repacked files and dragging them into  the repackedData folder. Or use the command ``` mv repacked*.json /repackedData ```\. Proccede into the /repackedData folder by doing ```cd repackedData ``` in the terminal.
   
   Run this command:

   ``` node combine.js  > data.json ```

   ` data.json ` is the final data file.
   
   Move the ` data.json ` file into the data folder which is located at (PATH:cs180project-021-extramile/server/db/data). The loader will load from this data file.
   
   **Delete all outFile[N].json, repacked[n].json, and data.csv from /csvParser**

## Running our Website
Once all the setup has been completed, our website can be ran by doing the following steps
 1) Go to (PATH: cs180-project-021-extramile/server) in the terminal and run `npm start `
 2) Go back to the repository head by running the command `cd .. `
 3) Go to (PATH: cs180-project-021-extramile/extramile-react) in the terminal and run `npm start ` 

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

## Unit Tests
1) install jest (npm i jest)
2) Add this to package.json
 "scripts": {
    "test": "jest",
    "start": "node server.js"
  },
3) run npm test in test directory
 
#Update node

1)command -v nvm (checks if you have nvm)
2)source ~/.nvm/nvm.sh
3)nvm install node


