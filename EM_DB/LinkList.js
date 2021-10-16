const Node  = require('./ListNode.js') 

class LinkedList{
  constructor(comparator){
    this.size = 0;
    this.rootNode = null;
    this.lastNode = null;
    this.comparator = comparator ? comparator : (curr, next) => curr > next;
  }
  insert(newNode){
    var currNode = this.rootNode;
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
    var currNode = this.rootNode;
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
function print(content){
  process.stdout.write(content.toString());
}
function printList(list){
  var currNode = list.rootNode;
  while(currNode){
    print(currNode.key);
    currNode = currNode.next;
    if(currNode)
      print("->");
  }
  console.log(); // last new line
}

var linkList = new LinkedList();
console.log("Inserting 5, 1, 6, 4, 3, 2")
linkList.insert(makeNode(5));
printList(linkList);
linkList.insert(makeNode(1));
printList(linkList);
linkList.insert(makeNode(6));
printList(linkList);
linkList.insert(makeNode(4));
printList(linkList);
linkList.insert(makeNode(3));
printList(linkList);
linkList.insert(makeNode(2));
printList(linkList);

console.log("Deleting 5, 1, 6, 4, 3, 2")
linkList.delete((5));
printList(linkList);
linkList.delete((1));
printList(linkList);
linkList.delete((6));
printList(linkList);
linkList.delete((4));
printList(linkList);
linkList.delete((3));
printList(linkList);
linkList.delete((2));
printList(linkList);

module.exports = LinkedList;
