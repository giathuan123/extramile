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
  removeData(data){
    this.indexContainer.forEach(index=>{
      if(index.removeData(data) == -1){
        console.log(`[ERROR] Error removing ${Object.keys(data)[0]} from ${index.indexName}`);
      }
    })
  }
  addData(data){
    this.indexContainer.forEach(index=>{
      if(index.addData(data) == -1){
        console.log(`[ERROR] Error adding ${Object.keys(data)[0]} to ${index.indexName}`);
      }
    })
  }
  updateData(oldData, newData){
    this.indexContainer.forEach(index=>{
      if(index.updateData(oldData, newData) == -1){
        console.log(`[ERROR] Error updating ${Object.keys(data)[0]} to ${index.indexName}`);
      }
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
    if(this.index[this.fieldGetter(data)] != undefined){
      console.log(`[INFO] Removing ${Object.keys(data)[0]} to ${this.fieldGetter(data)} in ${this.indexName}`);
      var indexArray = this.index[this.fieldGetter(data)];
      var position = indexArray.findIndex(id => id == Object.keys(data)[0]);
      indexArray.splice(position, 1);
      return position;
    }
    return -1;
  }
  addData(data){
    let [key, value] = Object.entries(data)[0];
    console.log(key, value);
    if(this.fieldGetter(value) == undefined){
      console.log("[ERROR] undefined data field " + key + " can't add to " + this.indexName);
      return -1;
    }
    console.log(`[INFO] Adding ${Object.keys(data)[0]} to ${this.fieldGetter(value)} in ${this.indexName}`);
    if(this.index[this.fieldGetter(value)] != undefined){
      this.index[this.fieldGetter(value)].push(key);
    }else{
      this.index[this.fieldGetter(data)] = [key];
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
      if(index[fieldGetter(value)] == undefined){
        index[fieldGetter(value)] = [key];
      }else{
        index[fieldGetter(value)].push(key);
      }
    }
    console.log(`[INFO] Index ${this.indexName} has ${Object.keys(index).length} records`);
    
    return index;
  }
}
module.exports = {
  Index: Index,
  IndexContainer: IndexContainer,
}
