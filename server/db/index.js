class IndexContainer{
  addIndex(index){
    this.indexContainer.push(index);
  }
  removeIndex(indexName){
    var position = this.indexContainer.findIndex(index => index.indexName == indexName);
    this.indexContainer.splice(position, 1);
  }
  getIndex(indexName){
    return this.indexContainer.find(index=>index.indexName==indexName);
  }
  queryIndex(data){
    var results = [];
    var indexName = "";
    for(const index of this.indexContainer){
      let currResult = [];
      let field = index.fieldGetter(data);
      if(field){
        if((currResult = index.get(field))){
          if(results.length == 0){
            results = currResult;
            indexName = index.indexName;
          }else if(currResult.length < results.length){
            results = currResult;
            indexName = index.indexName;
          }
        }
      }
    }
    if(results.length != 0){
      console.log(`[INFO] Found query in ${indexName} with ${results.length} records`);
      return results;
    }else{
      console.log("[INFO] Query is not in index. Searching main data");
      return -1;
    }
  }; 
  removeData(data){
    this.indexContainer.forEach(index=>{
      index.removeData(data);
    })
  }
  addData(data){
    this.indexContainer.forEach(index=>{
      index.addData(data);
    })
  }
  updateData(oldData, newData){
    this.indexContainer.forEach(index=>{
      index.updateData(oldData, newData);
    })
  }
  constructor(){
    this.indexContainer = [];
  }
}

class Index{
  static data = {};
  static setData(data){
    Index.data = data;
  }
  get(field){
    if(Array.isArray(field)){
      var results = [];
      for(const f of field){
        for(const id of this.index[f])
          results.push(id);
      }
      return results;
    }
    return this.index[field];
  }
  constructor(indexName, fieldGetter){
    this.indexName = indexName;
    this.index = this.createIndex(fieldGetter);
    if(this.index == -1){
      throw Error("[ERROR] Index not created");
    }
  }
  removeData(data){
    let [key, value] = Object.entries(data)[0];
    let indexKey = this.fieldGetter(value);
    if(!indexKey){
      console.log("[ERROR] undefined data field in " + key + " can't remove from " + this.indexName);
      return -1;
    }
    if(this.index[indexKey]){
      console.log(`[INFO] Removing ${key} from ${indexKey} in ${this.indexName}`);
      var indexArray = this.index[indexKey];
      var position = indexArray.findIndex(id => id == key);
      indexArray.splice(position, 1);
      if(indexArray.length == 0){
        delete this.index[indexKey];
      }
      return position;
    }
  }
  addData(data){
    let [key, value] = Object.entries(data)[0];
    let indexKey = this.fieldGetter(value);
    if(!indexKey){
      console.log("[ERROR] undefined data field " + key + " can't add to " + this.indexName);
      return -1;
    }
    console.log(`[INFO] Adding ${key} to ${indexKey} in ${this.indexName}`);
    // if(this.index[indexKey] != undefined){
    //   this.index[indexKey].push(key);
    // }else{
    //   this.index[indexKey] = [key];
    // }
    function getInt(id){
      return parseInt(id.split('-')[1]);
    }
    var array = undefined;
    if((array = this.index[indexKey]) != undefined){
      // find correct position to be added
      var keyInt = getInt(key);
      var newPosition = array.findIndex((id)=> getInt(id) > keyInt );
      array.splice(newPosition, 0, key);
    }else{
      this.index[indexKey] = [key];
    }
  }
  updateData(oldData, newData){
    this.removeData(oldData);
    this.addData(newData);
  }
  createIndex(fieldGetter){
    this.fieldGetter = fieldGetter;
    var index = {};
    if(Object.keys(Index.data).length == 0){
      console.log("[ERROR] Can't create index data is not set");
      return -1;
    }
    console.log(`[INFO] Creating new index: ${this.indexName}`);
    for(const [key, value] of Object.entries(Index.data)){
      var indexKey = fieldGetter(value);
      index[indexKey]?.push(key) || (index[indexKey] = [key]);
      // if(index[fieldGetter(value)] == undefined){
      //   index[fieldGetter(value)] = [key];
      // }else{
      //   index[fieldGetter(value)].push(key);
      // }
    }
    console.log(`[INFO] Index ${this.indexName} has ${Object.keys(index).length} records`);
    
    return index;
  }
}
module.exports = {
  Index: Index,
  IndexContainer: IndexContainer,
}
