const { tenAccCities, 
        SeverityChart, 
        MostAccStates,
        AccCounties,
        getDailyAccidents,
        getSwarmPlotStats } = require("./userFunctions.js");

class ResultCache{
  static resultsArray = [];
  recalculate(data){
    ResultCache.resultsArray.forEach(result=>{
      if(result.stale){
        result.recalculate(data);
      }
    })
  }
  setStale(){
    ResultCache.resultsArray.forEach(result=>result.stale = true);
  }
  getResult(url){
    var result = ResultCache.resultsArray.find(result=>result.url == url);
    return result.getAnswer();
  }
  push(result){
    ResultCache.resultsArray.push(result);
  }
}
class Result{
  static cache = new ResultCache();
  constructor(url, computation){
    this.stale = false;
    this.url = url;
    this.answer = computation();
    this.update = undefined;
    Result.cache.push(this);
  } 
  recalculate(data){
    console.log("[INFO] recalculating stale result for url", this.url, "with new data", this.data);
    if(this.update == undefined){
      console.log("[ERROR] update for result for url", this.url, "is undefined");
      return;
    }
    this.answer = this.update(data);
    this.stale = false;
  }
  setUpdate(update){
    this.update = update;
  }
  getAnswer(){
    if(!this.stale){
      return this.answer;
    }
    throw '[ERROR] Getting stale result in ' + this.url;
  }
}
function initResults(){
  console.log("[INFO] Generating results cache");
  var barinfo = new Result('/barinfo', tenAccCities);
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
