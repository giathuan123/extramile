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
    var answer = null;
    if(this.update != undefined){
      for(const change of this.changeArray){
        answer = this.update(change);
      }
    }else{
      answer = this.computation();
    }
    this.changeArray = [];
    return answer;
  }
  setUpdate(update){
    this.update = update;
  }
  getAnswer(){
    var time = 0;
    if(this.answer == null){
      [time, this.answer] = getPerformance(this.computation);
      this.changeArray = [];
    }
    else if(this.changeArray.length > 0){
      console.log("[INFO] recalculating with " + this.changeArray.length + " changes");
      var recal = this.recalculate.bind(this);
      [time,this.answer] = getPerformance(recal);
    }
    console.log(`[INFO] Time taken for ${this.url}: ${time} ms`);
    return this.answer;
  }
}
function updateStateInfo([action, newData]){
  var state = newData.State;
  var stateInAnswerPosition = this.answer.findIndex(entry=>entry.name == state);
  switch(action) {
    case 'INSERT':
      if(stateInAnswerPosition != -1){
        this.answer[stateInAnswerPosition].accidents++;
        var [{name, accidents}] = this.answer.splice(stateInAnswerPosition, 1);
        var newPosition = this.answer.findIndex(ans=>ans.accidents < accidents);
        this.answer.splice(newPosition, 0, {name: name, accidents: accidents});
      }else{
        var newPosition = this.answer.findIndex(ans=>ans.accidents < 1);
        this.answer.splice(newPosition, 0, {name: state, accidents: 1});
      }
      break;
    case 'DELETE':
      this.answer[stateInAnswerPosition].accidents--;
      var [{name, accidents}] = this.answer.splice(stateInAnswerPosition, 1);
      var newPosition = this.answer.findIndex(ans=>ans.accidents < accidents);
      this.answer.splice(newPosition, 0, {name: name, accidents: accidents});
      break;
  }
  return this.answer;
}
function updateBarInfo([action, newData]){
  var city = newData.City + ", " + newData.State;
  var cityInAnswerPosition = this.answer.findIndex(entry=>entry.name == city);
  switch(action) {
    case 'INSERT':
      if(cityInAnswerPosition != -1){
        this.answer[cityInAnswerPosition].accidents++;
        var [{name, accidents}] = this.answer.splice(cityInAnswerPosition, 1);
        var newPosition = this.answer.findIndex(ans=>ans.accidents < accidents);
        this.answer.splice(newPosition, 0, {name: name, accidents: accidents});
      }else{
        var newPosition = this.answer.findIndex(ans=>ans.accidents < 1);
        this.answer.splice(newPosition, 0, {name: city, accidents: 1});
      }
      break;
    case 'DELETE':
      this.answer[cityInAnswerPosition].accidents--;
      var [{name, accidents}] = this.answer.splice(cityInAnswerPosition, 1);
      var newPosition = this.answer.findIndex(ans=>ans.accidents < accidents);
      this.answer.splice(newPosition, 0, {name: name, accidents: accidents});
      break;
  }
  console.log(this.answer);
  return this.answer;
}
function initResults(){
  console.log("[INFO] Generating results cache");
  var barinfo = new Result('/barinfo', tenAccCities);
  barinfo.setUpdate(updateBarInfo);
  var mostaccstateResults = new Result('/mostaccstates', MostAccStates);
  mostaccstateResults.setUpdate(updateStateInfo);
  var acccounties = new Result('/mostcounty', AccCounties);
  var getdailyacc = new Result('/dailystats', getDailyAccidents);
  var visgraph = new Result('/visibility', getSwarmPlotStats);
  var severityChart = new Result('/pieinfo', SeverityChart);
  // update feature to do next
}

initResults();

module.exports = {
  Result: Result
}
