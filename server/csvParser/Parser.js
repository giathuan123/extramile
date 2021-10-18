const readline = require("readline");

/*
 * Class Parser:
 * defaults to stdin if input is not given to constructor
 * readline is used to createInt
 *
 */
class Parser{
  static delimiter = ',';
  static init = () => {
    return readline.createInterface({
      input: process.stdin,
      output: process.stdout 
    });
  }
  parse(string){
    if(JSON.stringify(this.template) == "{}" ){
      string.split(Parser.delimiter).forEach(field=>this.template[field] = null);
      this.keys = Object.keys(this.template);
    }else{
      var object = {...this.template};
      string.split(Parser.delimiter).forEach((value, index)=>{
        if(index > this.keys.length - 1) 
          throw Error("Exceeded number of fields");
        object[this.keys[index]] = value; 
      });
      this.data.push(object);
    }
  }
  constructor(input){
    this.template = {};
    this.done = false;
    this.data = [],
    this.input = input || Parser.init();
    this.input.on('line', (str) => this.parse(str)); 
  }
  // string: line read from input
}

module.exports = {
  Parser: Parser
}
