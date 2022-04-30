const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.node = null;
  }

  root() {
    return this.node;
  }

  add(data) {
    const addNode = (data, node) => {
      if (!node) {
        return new Node(data);
      }
      if (data === node.data) {
        return node;
      }
      if (data < node.data) {
        node.left = addNode(data, node.left);
      } else {
        node.right = addNode(data, node.right);
      }
      return node;
    };
    this.node = addNode(data, this.node);
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    const findNode = (data, node) => {
      if (!node || node.data === data) {
        return node;
      }
      if (data < node.data) {
        return findNode(data, node.left);
      } else {
        return findNode(data, node.right);
      }
    };
    return findNode(data, this.node);
  }

  remove(data) {
    const removeNode = (data, node) => {
      if (!node) {
        return null;
      }
      if (data === node.data) {
        if (!node.right && !node.left) {
          return null;
        }
        if (!node.left) {
          return node.right;
        }
        if (!node.right) {
          return node.left;
        }
        let prevNode = null;
        let minRight = node.right;
        while (minRight.left) {
          prevNode = minRight;
          minRight = minRight.left;
        }
        node.data = minRight.data;
        if (prevNode) {
          prevNode.left = minRight.right ? minRight.right : null;
        } else {
          node.right = node.right.right ? node.right.right : null;
        }
        return node;
      }
      if (data < node.data) {
        node.left = removeNode(data, node.left);
      } else {
        node.right = removeNode(data, node.right);
      }
      return node;
    };
    this.node = removeNode(data, this.node);
  }

  min() {
    const minNode = (node) => {
      if (!node || !node.left) {
        return node ? node.data : null;
      } else {
        return minNode(node.left);
      }
    };
    return minNode(this.node);
  }

  max() {
    const maxNode = (node) => {
      if (!node || !node.right) {
        return node ? node.data : null;
      } else {
        return maxNode(node.right);
      }
    };
    return maxNode(this.node);
  }
}

module.exports = {
  BinarySearchTree
};