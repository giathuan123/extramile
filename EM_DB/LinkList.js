const Node  = require("./ListNode.js");
const util = require("util");

class LinkedList{
  constructor(comparator){
    this.size = 0;
    this.rootNode = null;
    this.lastNode = null;
    this.comparator = comparator ? comparator : (curr, next) => curr > next;
  }
  insert(newNode){
    let currNode = this.rootNode;
    // reset new node, assume that newnode pointers are null;
    newNode.prev = null;
    newNode.next = null;
    if(currNode == null){
      this.rootNode = newNode;
      this.lastNode = newNode;
    }else if(this.comparator(this.rootNode.key, newNode.key)){
      newNode.next = this.rootNode;
      this.rootNode.prev = newNode;
      this.rootNode = newNode;
    }else if(!this.comparator(this.lastNode.key, newNode.key)){
      newNode.prev = this.lastNode;
      this.lastNode.next = newNode;
      this.lastNode = newNode;
    }else{
      while(currNode != null){
        if(this.comparator(currNode.key, newNode.key)){
          currNode.prev.next = newNode;
          newNode.next = currNode;
          newNode.prev = currNode.prev;
          currNode.prev = newNode;
          break;
        }
        currNode = currNode.next;
      }
    }
    this.size++;
    return newNode;
  }
  delete(key){
    if(this.size == 0)
      return null;
    let currNode = this.rootNode;
    while(currNode != null){
      if(currNode.key == key){
        // deletetion
        if(currNode == this.rootNode)
          this.rootNode = currNode.next;
        if(currNode == this.lastNode)
          this.lastNode = currNode.prev;
        remove(currNode);
        break;
      }
      currNode = currNode.next;
    }
    this.size--;
    return currNode; 
  }
  [util.inspect.custom](){
    let currNode = this.rootNode;
    let str = "";
    while(currNode){
      str += currNode.key.toString(); 
      currNode = currNode.next;
      if(currNode)
        str += ("->");
    }
    return str;
  }
  
}
function remove(currNode){
  
  if(currNode.prev){
    if(currNode.next == null)
      currNode.prev.next = null;
    else
      currNode.prev.next = currNode.next;
  }
  
  if(currNode.next){
    if(currNode.prev == null)
      currNode.next.prev = null;
    else
      currNode.next.prev = currNode.prev;
  }
  
}
function makeNode(key){
  newNode = new Node();
  newNode.key = key;
  return newNode;
}

var linkList = new LinkedList();
console.log("Inserting 5, 1, 6, 4, 3, 2")
linkList.insert(makeNode(5));
console.log(linkList);
linkList.insert(makeNode(1));
console.log(linkList);
linkList.insert(makeNode(6));
console.log(linkList);
linkList.insert(makeNode(4));
console.log(linkList);
linkList.insert(makeNode(3));
console.log(linkList);
linkList.insert(makeNode(2));
console.log(linkList);

console.log("Deleting 5, 1, 6, 4, 3, 2")
linkList.delete((5));
console.log(linkList);
linkList.delete((1));
console.log(linkList);
linkList.delete((6));
console.log(linkList);
linkList.delete((4));
console.log(linkList);
linkList.delete((3));
console.log(linkList);
linkList.delete((2));
console.log(linkList);

module.exports = LinkedList;
