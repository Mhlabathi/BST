import { Node } from "./Node.js";
import { mergeSort } from "./mergeSort.js";

class Tree {
    root;

    constructor( array ) {
        this.makeTree( array, 0, array.length - 1 );
    }

    makeTree(arr) {
        const sorted = mergeSort(arr);
        this.root = this.buildTree(sorted, 0, sorted.length - 1 );
    }

    buildTree( array, start, end ) {

        if ( start > end ) {
            return null;
        }
        
        const mid = Math.floor(( start + end ) / 2);

        const newRoot = new Node( array[mid] );

        newRoot.left = this.buildTree( array, start, mid-1 );

        newRoot.right = this.buildTree( array, mid + 1, end );

        return newRoot;
    }

    printTree( node = this.root, level = 0 ) {
        if ( node !== null ) {
            this.printTree( node.right, level + 1 );
            console.log(" ".repeat(level * 4) + node.data);
            this.printTree(node.left, level + 1);
        }
    }

    insert( value, root = this.root ) {
        if( root === null )
            return new Node( value );


        if( root.data > value )
            root.left = this.insert( value, root.left );
        else if ( root.data < value )
            root.right = this.insert( value, root.right);

        return root;
    }

    getSuccessor( curr ) {
        curr = curr.right;
        while ( curr !== null && curr.left !== null ) {
            curr = curr.left;
        }
        return curr;
    }

    delete( value, root = this.root ) {
        if ( root === null ) {
            return root;
        }

        if (root.data > value) {
            root.left = this.delete(value, root.left);
        } else if ( root.data < value ) {
            root.right = this.delete( value, root.right );
        } else {

            if ( root.left === null )
                return root.right;

            if ( root.right === null )
                return root.left;

            let succesor = this.getSuccessor( root );
            root.data = succesor.data;
            root.right = this.delete(succesor.data, root.right );
        }
        return root;
    }

    find( value, root = this.root ) {
        let curr = root;
        if ( curr.data === value ) {
            return curr;
        } else {
            if ( curr.data > value )
                curr = this.find( value, curr.left )
            if ( curr.data < value )
                curr =  this.find( value, curr.right )

            return curr;
        }
    }

    //Traverse the tree in level order and use callback on each node
    traverseLevelOrder( queue = [this.root] , callback ) {
        let curr = queue[0];

        if ( curr.left !== null && curr.right !== null ){
            queue.push( curr.left );
            queue.push( curr.right );
            callback( curr.data );
            queue.shift();
            this.traverseLevelOrder( queue, callback );

        } else if ( curr.left !== null && curr.right === null ) {
            queue.push( curr.left );
            callback( curr.data );
            queue.shift();
            this.traverseLevelOrder( queue, callback );

        } else if ( curr.left === null && curr.right !== null ) {
            queue.push( curr.right );
            callback( curr.data );
            queue.shift();
            this.traverseLevelOrder( queue, callback );

        } else if ( curr.left === null && curr.right === null ) {
            callback( curr.data );
            queue.shift();
            return;
        }

        while ( queue.length !== 0 ) {
            this.traverseLevelOrder( queue, callback );
        }

        return;
    }

    //Receives callback and passes the callback to traverseLevelOrder
    levelOrder( callback ) {
        const queue = [this.root];
        this.traverseLevelOrder( queue, callback);
        return;
    }

    //InOrder traversal
    traverseInOrder( curr, callback ) {
        if ( curr === null ) {
            return;
        }
        this.traverseInOrder( curr.left, callback );
        callback( curr.data );
        this.traverseInOrder( curr.right, callback );
    }

    inOrder( callback ) {
        this.traverseInOrder(this.root, callback);
    }

    //preOrder traversal
    traversePreOrder( curr, callback ) {
        if ( curr === null )
            return;

        callback( curr.data );
        this.traversePreOrder( curr.left, callback );
        this.traversePreOrder( curr.right, callback );
    }

    preOrder( callback ) {
        this.traversePreOrder( this.root, callback );
    }

    //postOrder traversal
    traversePostOrder( curr, callback ) {
        if ( curr === null )
            return;

        this.traversePostOrder( curr.left, callback );
        this.traversePostOrder( curr.right, callback );
        callback( curr.data );
    }

    postOrder( callback ) {
        this.traversePostOrder( this.root, callback );
    }
    
    //Calculate height from previous node passed by height fn
    increaseHeight( left, right, height ) {
        if (left === null && right === null )                                       //Last node we return height
            return height; 
        else if (left !== null && right === null )                                  //right node over, continue to count left
            return this.increaseHeight(left.left, left.right, height + 1 );
        else if (right !== null && left === null )                                  //left node over, continue counting right
            return this.increaseHeight( right.left, right.right, height + 1 );
        else {                                                                      //else continue counting left and right and compare their height
            let leftHeight = this.increaseHeight( left.left, left.right, height + 1 );
            let rightHeight = this.increaseHeight( right.left, right.right, height + 1 );

            return leftHeight > rightHeight ? leftHeight : rightHeight;
        }
    }

    height( node ) {
        let height = 0;
        return  this.increaseHeight( node.left, node.right, height );
    }

    depth( node ) {
        let curr = this.root;
        let depth = 0;
        while ( curr !== node ) {
            if( curr.data > node.data ){
                curr = curr.left;
            } else {
                curr = curr.right;
            }

            depth++;
        }

        return depth;
    }

    //Check if tree is balanced
    isBalanced() {
        let left = this.root.left;
        let right = this.root.right;
        if( left !== null && right !== null ) {
            let leftHeight = this.increaseHeight( left.left, left.right, 0);
            let rightHeight = this.increaseHeight( right.left, right.right, 0);

            if ( Math.abs( leftHeight - rightHeight ) > 1 )
                return false;
            else return true;
        } else if ( left !== null && right === null ) {
            let heightDiff = this.increaseHeight( left.left, left.right, 1 );
            return heightDiff > 1 ? false : true; 
        } else if ( left === null && right !== null ) {
            let heightDiff = this.increaseHeight( right.left, right.right, 1 );
            return heightDiff > 1 ? false : true; 
        }
    }

    addToArray(node , array = []) {
        array.push(node);
    }

    rebalance() {
        const newTreeArray = [];
        this.inOrder( (element) => this.addToArray(element, newTreeArray));
        console.log(newTreeArray);
        this.makeTree(newTreeArray);
    }

    
}

export { Tree }