import { Component } from "react";

class TreeNode {
    val: number;
    left?: TreeNode | null;
    right?: TreeNode | null;

    constructor(val: number) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class BalancedBinaryTree {
    root: TreeNode | null;

    constructor() {
        this.root = null;
    }

    insert(val: number) {
        const newNode = new TreeNode(val);
        if (!this.root) {
            this.root = newNode;
            return;
        }

        this.insertNode(this.root, newNode);
    }

    private insertNode(node: TreeNode, newNode: TreeNode) {
        if (newNode.val < node.val) {
            if (!node.left) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (!node.right) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    // Other methods for tree operations like balance, search, etc. can be added here
}

interface TreeNode {
    val: number;
    left?: TreeNode | null;
    right?: TreeNode | null;
}

interface TreeProps {
    data: TreeNode;
}

class TreeNodeComponent extends Component<TreeProps> {
    renderTree(node: TreeNode | undefined) {
        if (!node) return null;

        return (
            <div className="flex">
                <div>
                    <li>{node.val}</li>
                </div>
                <div>
                    <ul className="flex space-x-2">
                        <div>{node.left && <li>{this.renderTree(node.left)}</li>}</div>
                        <div>{node.right && <li>{this.renderTree(node.right)}</li>}</div>
                    </ul>
                </div>
            </div>
            // <ul>
            //     <li>{node.val}</li>
            //     <ul>
            //         {node.left && <li>{this.renderTree(node.left)}</li>}
            //         {node.right && <li>{this.renderTree(node.right)}</li>}
            //     </ul>
            // </ul>
        );
    }

    render() {
        const { data } = this.props;
        return (
            <div>
                <h2>Binary Tree</h2>
                {this.renderTree(data)}
            </div>
        );
    }
}

const AVL2 = () => {
    const treeValues = [10, 20, 30, 50, 44, 55, 34, 22]
    const avlTree = new BalancedBinaryTree();
    treeValues.map((el) => { avlTree.insert(el) })
    return (
        <>
            <TreeNodeComponent data={avlTree.root as TreeNode} />
        </>
    )
}
export default AVL2