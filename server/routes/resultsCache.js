const { tenAccCities, 
        SeverityChart, 
        MostAccStates,
        AccCounties,
        getDailyAccidents,
        getSwarmPlotStats } = require("./userFunctions.js");

function getPerformance(computation){
  var start = Date.now();
  var answer = computation();
  return [Date.now()-start ,answer];
}

class ResultCache{
  static resultsArray = [];
  static changeArray = [];
  recalculate(data){
    ResultCache.resultsArray.forEach(result=>{
          result.recalculate(data);
      })
  }
  
  getResult(url){
    var result = ResultCache.resultsArray.find(result=>result.url == url);
    return result.getAnswer();
  }
  pushChange(data){
    ResultCache.resultsArray.forEach(result=>result.changeArray.push(data));
  }
  push(result){
    ResultCache.resultsArray.push(result);
  }
}

class Result{
  static cache = new ResultCache();
  constructor(url, computation){
    this.url = url;
    this.answer = null;
    this.update = undefined;
    this.computation = computation;
    this.changeArray = [];
    Result.cache.push(this);
  } 
  recalculate(){
    if(this.update == undefined){
      console.log("[ERROR] update for result for url", this.url, "is undefined");
      return;
    }
    for(const change of this.changeArray){
      var answer = this.update(change);
    }
    this.changeArray = [];
    return answer;
  }
  setUpdate(update){
    this.update = update;
    console.log(this.update);
  }
  getAnswer(){
    var time = 0;
    console.log(this.answer);
    if(this.answer == null){
      [time, this.answer] = getPerformance(this.computation);
    }
    else if(this.changeArray.length > 0){
      console.log("[INFO[ recalculating with " + this.changeArray.length + "changes");
      var recal = this.recalculate.bind(this);
      [time,this.answer] = getPerformance(recal);
    }
    console.log(`[INFO] Time taken for ${this.url}: ${time} ms`);
    return this.answer;
  }
}
function updateBarInfo([action, newData]){
  console.log(newData);
  var city = newData["City"];
  var cityInAnswerPosition = this.answer.findIndex(entry=>entry.name == city);
  switch(action) {
    case 'INSERT':
      this.answer[cityInAnswerPosition].accidents++;
      var [{name, accidents}] = this.answer.splice(cityInAnswerPosition, 1);
      console.log(name, accidents);
      var newPosition = this.answer.findIndex(ans=>ans.accidents < accidents);
      this.answer.splice(newPosition, 0, {name: name, accidents: accidents});
      break;
    case 'DELETE':
      this.answer[cityInAnswerPosition].accidents++;
      var [{key, numAccidents}] = this.answer.splice(cityInAnswerPosition, 1);
      var newPosition = this.answer.findIndex(ans=>ans.accidents < numAccidents);
      this.answer.findIndex.splice(newPosition, 0, {name: key, accidents: numAccidents});
      break;
  }
  return this.answer;
}
function initResults(){
  console.log("[INFO] Generating results cache");
  var barinfo = new Result('/barinfo', tenAccCities);
  barinfo.setUpdate(updateBarInfo);
  var pieinfo = new Result('/pieinfo', SeverityChart);
  var mostaccstateResulst = new Result('/mostaccstates', MostAccStates);
  var acccounties = new Result('/mostcounty', AccCounties);
  var getdailyacc = new Result('/dailystats', getDailyAccidents);
  var visgraph = new Result('/visibility', getSwarmPlotStats);
  // update feature to do next
}

initResults();

module.exports = {
  Result: Result
}
