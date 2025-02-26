
// function Node(root) {

//     return {
//         data: root,
//         leftChild: null,
//         rightChild: null,
//         setLeft(num) {
//             leftChild = num;
//         },

//         setRight(num) {
//             rightChild = num;
//         },

//         get left(){
//             return this.leftChild;
//         },

//         get rigth() {
//             return this.rightChild;
//         },
//     };
// }

class Node {
    constructor( root ) {
        this.data = root;
        this.left = null;
        this.right = null;

    }

    // getData() {
    //     return this.data;
    // }

    // setRight(node) {
    //     this.right = node;
    // }

    // setLeft(node) {
    //     this.left = node;
    // }

    // getRight() {
    //     return this.right;
    // }

    // getLeft() {
    //     return this.left;
    // }
}

export { Node }