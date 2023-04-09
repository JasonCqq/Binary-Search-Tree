class Node {
  constructor(value, leftChild = null, rightChild = null) {
    this.value = value;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
  }
}

class Tree {
  constructor(array) {
    this.root = buildTree(filterArray(array));
  }
}

//helper function to remove dupes and sort numbers
function filterArray(arr) {
  let duplicateFilter = [];
  arr.forEach((num) => {
    if (!duplicateFilter.includes(num)) {
      duplicateFilter.push(num);
    }
  });
  let sortedArray = duplicateFilter.sort(function (a, b) {
    return a - b;
  });
  return sortedArray;
}

function buildTree(array, start = 0, end = array.length - 1) {
  //turn it into a balanced binary tree full of Node objects appropriately placed
  //Node objects have (value, leftChild, rightChild);
  //The buildTree function should return the level-0 root node(midpoint).
  let midPoint = Math.floor((start + end) / 2);
  //recursion
  if (start > end) {
    return null;
  }
  let newNode = new Node(array[midPoint], null, null);
  newNode.leftChild = buildTree(array, start, midPoint - 1);
  newNode.rightChild = buildTree(array, midPoint + 1, end);
  return newNode;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.rightChild !== null) {
    prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.leftChild !== null) {
    prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const testArray = [2, 2, 2, 1, 3, 5, 6, 2, 7, 5, 6];
const tree = new Tree(testArray);
prettyPrint(tree.root);
