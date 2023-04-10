class Tree {
  constructor(array) {
    this.root = buildTree(filterArray(array));
  }

  insert(value) {
    let currentRoot = this.root;
    //doesn't allow duplicates
    if (value === currentRoot.value) {
      return null;
    }

    while (currentRoot.leftChild !== null || currentRoot.rightChild !== null) {
      if (value < currentRoot.value) {
        //keeps setting the new root until the root has no left/right child
        currentRoot.leftChild === null
          ? (currentRoot.leftChild = new Node(value))
          : (currentRoot = currentRoot.leftChild);
      } else if (value > currentRoot.value) {
        currentRoot.rightChild === null
          ? (currentRoot.rightChild = new Node(value))
          : (currentRoot = currentRoot.rightChild);
      }
    }

    if (value < currentRoot.value) {
      currentRoot.leftChild = new Node(value);
    } else if (value > currentRoot.value) {
      currentRoot.rightChild = new Node(value);
    }
  }

  delete(value) {
    //traverses through the tree and sets the currentRoot to the right root
    let currentRoot = this.root;
    let previousRoot = null;
    while (value !== currentRoot.value && currentRoot !== null) {
      previousRoot = currentRoot;
      if (value < currentRoot.value) {
        currentRoot = currentRoot.leftChild;
      } else if (value > currentRoot.value) {
        currentRoot = currentRoot.rightChild;
      }
    }

    //2 children
    if (currentRoot.leftChild !== null && currentRoot.rightChild !== null) {
      let rootToReplace = currentRoot;
      currentRoot = currentRoot.rightChild;
      while (currentRoot.leftChild !== null) {
        currentRoot = currentRoot.leftChild;
      }
      rootToReplace.value = currentRoot.value;
      rootToReplace.rightChild = currentRoot.rightChild;

      //1 children
    } else if (
      currentRoot.leftChild !== null ||
      currentRoot.rightChild !== null
    ) {
      currentRoot.leftChild !== null
        ? (previousRoot.leftChild = currentRoot.leftChild)
        : (previousRoot.rightChild = currentRoot.rightChild);
      //0 children
    } else if (
      currentRoot.leftChild === null &&
      currentRoot.rightChild === null
    ) {
      currentRoot.value < previousRoot.value
        ? (previousRoot.leftChild = null)
        : (previousRoot.rightChild = null);
    }
  }
}

class Node {
  constructor(value, leftChild = null, rightChild = null) {
    this.value = value;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
  }
}

//turns an array into a balanced BST
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

//helper functions
//remove dupes and sort numbers
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
//visualize tree
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
tree.insert(4);
tree.insert(0);
tree.insert(9);
tree.insert(2.5);
tree.insert(12);

tree.delete(1);
prettyPrint(tree.root);
