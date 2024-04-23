import { Component } from "react";

// 平衡二叉树  balanced binary trees
type Props = {}

interface TreeProps {
    data: TreeNode;
}

class TreeNode {
    value: number;
    left: TreeNode|null;
    right: TreeNode|null;
    height: number;
    // val: ReactNode;

    constructor(value: number) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree {
    root: TreeNode | null; //根
    rootHeight: number | null;
    constructor() {
        this.root = null;
        this.rootHeight = null;
    }
    getHeight(node: TreeNode | null): number { // 获取树高
        return node ? node.height : 0;
    }
    updateHeight(node: TreeNode) { // 更新树高 
        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    }
    getBalanceFactor(node: TreeNode | null): number { // 获取平衡因子 左高减右高
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }

    rotateRight(y: TreeNode): TreeNode { // 右旋
        const x = y.left!;
        const T2 = x.right;
        // Perform rotation（执行旋转）
        x.right = y;
        y.left = T2;
        // Update heights
        this.updateHeight(y);
        this.updateHeight(x);
        return x;
    }

    rotateLeft(x: TreeNode): TreeNode { // 左旋
        const y = x.right!;
        const T2 = y.left;
        // Perform rotation
        y.left = x;
        x.right = T2;
        // Update heights
        this.updateHeight(x);
        this.updateHeight(y);
        return y;
    }

    insert(value: number): void { // 插值
        this.root = this.insertRecursive(this.root, value);
    }

    insertRecursive(node: TreeNode | null, value: number): TreeNode { // 插值且 递归检查调整平衡树
        if (node === null) {
            return new TreeNode(value);
        }

        if (value < node.value) {
            node.left = this.insertRecursive(node.left, value);
        } else if (value > node.value) {
            node.right = this.insertRecursive(node.right, value);
        } else {
            // Duplicate keys not allowed 避免重复
            return node;
        }

        // Update height of this ancestor node（更新该祖先节点的高度）
        this.updateHeight(node);

        // Get the balance factor to check whether this node became unbalanced（获取平衡因子检查平衡）
        const balance = this.getBalanceFactor(node);

        // Left Left Case 左高且插值小于原左值 => 右旋
        if (balance > 1 && value < node.left!.value) {
            return this.rotateRight(node);
        }
        // Right Right Case 右高且插值大于原右值 => 左旋
        if (balance < -1 && value > node.right!.value) {
            return this.rotateLeft(node);
        }
        // Left Right Case 左高且插值大过原左值 => 先左旋后右旋
        if (balance > 1 && value > node.left!.value) { // 先左旋后右旋
            node.left = this.rotateLeft(node.left!);
            return this.rotateRight(node);
        }
        // Right Left Case 右高且插值小于原右值 => 先右旋后左旋
        if (balance < -1 && value < node.right!.value) {
            node.right = this.rotateRight(node.right!);
            return this.rotateLeft(node);
        }

        // Tree is balanced
        return node;
    }

    // Utility function to print preorder traversal of the tree
    preOrder(node: TreeNode | null) {
        if (node !== null) {
            console.log(`${node.value} and ${node.height} --right: ${node.right} --left: ${node.left}`);
            this.preOrder(node.left);
            this.preOrder(node.right);
        }
    }

    printPreOrder() {
        this.preOrder(this.root);
    }
}


const AVL = ({ }: Props) => {
    //    const orderTree: number[] = []
    const treeValues = [10, 20, 30, 50, 44, 55, 34, 22]
    // Example usage
    const avlTree = new AVLTree();
    treeValues.map((el) => { avlTree.insert(el) })

    console.log("Preorder traversal of constructed AVL tree:");
    avlTree.printPreOrder();


    // Assuming 'tree' is the instance of BalancedBinaryTree
    // const treeContainer = document.getElementById('tree');


    class TreeNodeComponent extends Component<TreeProps> {
        renderTree(node: TreeNode | undefined) {
            if (!node) return null;
            console.log(` node value ${node.value}--height: ${node.height}--left:${node.left}--right: ${node.right}`)


            return (
                <div >
                  {/*<ul>
                        <li>{node.value}</li>
                        <ul>
                            {node.left && <li>{this.renderTree(node.left)}</li>}
                            {node.right && <li>{this.renderTree(node.right)}</li>}
                        </ul>
                    </ul>
                       <li>{node.val}</li> */}
                    <div>
                        {node.value}
                    </div>
                    <div className="flex space-x-1">
                        <div className="flex"> {node.left && <p>{this.renderTree(node.left)}</p>}</div>
                        <div className="flex">{node.right && <p>{this.renderTree(node.right)}</p>}</div>
                    </div>
                </div>
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




    return (

        < >

            <TreeNodeComponent data = {avlTree.root as TreeNode} />

        </>
    )
}

export default AVL;