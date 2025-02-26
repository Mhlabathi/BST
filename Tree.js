//import { Node } from "./Node.js";

class Node {
    constructor( root ) {
        this.data = root;
        this.left = null;
        this.right = null;

    }

}

class Tree {
    root;
    data;
    left = null;
    rigth = null;

    constructor( array ) {
        this.makeTree( array, 0, array.length - 1 );
    }

    makeTree(arr) {
        const sorted = arr.sort();
        this.root = this.buildTree(sorted, 0, sorted.length - 1 );
    }

    async buildTree( array, start, end ) {
        const sorted = array.sort();
        console.log(sorted);

        if ( start > end ) {
            return null;
        }
        
        const mid = Math.floor(( start + end ) / 2);
        console.log(mid);

        const newRoot = new Node( sorted[mid] );
        console.log(`root: ${newRoot.data}`);

        newRoot.left = this.buildTree( sorted, start, mid-1 );
        console.log(`left: ${newRoot.left.data}`);

        newRoot.right = this.buildTree( sorted, mid + 1, end );
        console.log(`right: ${newRoot.right.data}`);

        return newRoot;
    }

    
}

export { Tree }