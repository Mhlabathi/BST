import { Tree } from "./Tree.js";

const array = [1, 5, 7];
const node = new Tree(array);
node.printTree();
console.log(`My Tree: ${node.root.data}`);

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  prettyPrint(node.root);
  node.insert(10);
  node.insert(2);
  node.insert(6);
  node.insert(23);
  prettyPrint(node.root);
  const found = node.find(7);
  console.log(found);
  prettyPrint(node.root);
  node.levelOrder( element => console.log( element) );
  node.inOrder( element => console.log( element ) );
  node.preOrder( element => console.log( element ) );
  node.postOrder( element => console.log( element ) );
  console.log(`Height from given node: ${node.height(node.root.left)}` );
  console.log(`Depth from root: ${node.depth(node.root.right.left)}` );
  console.log(`is Tree Balanced?: ${node.isBalanced()}`);
  node.insert(30);
  node.insert(40);
  node.insert(100);
  console.log(`is Tree Balanced?: ${node.isBalanced()}`);
  node.rebalance();
  prettyPrint(node.root);
  console.log(`is Tree reBalanced?: ${node.isBalanced()}`);
