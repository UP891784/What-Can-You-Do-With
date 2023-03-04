// Define the keywords to look for and the URL to use for the links
const keywords = ["apple", "pineapple", "guava", "pear"];
const linkURL = "http://en.wikipedia.org/wiki/";

// Walk the DOM tree and replace instances of the keywords with links
function walk() {
  // Get the root element to start the tree walk from
  const root = document.body;
  
  // Create a tree walker to iterate over all the text nodes in the tree
  const treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  
  // Iterate over each text node and replace any instances of the keywords
  while (treeWalker.nextNode()) {
    const node = treeWalker.currentNode;
    
    // Check if the text node contains any of the keywords
    const regex = new RegExp(keywords.join("|"), "ig");
    if (!regex.test(node.nodeValue)) {
      continue;
    }
    
    // Split the text node into an array of substrings that contain the keywords
    const parts = node.nodeValue.split(regex);
    
    // Create an array of nodes to replace the text node with
    const nodes = parts.flatMap((part, i) => {
      const isKeyword = i % 2 === 1;
      if (isKeyword) {
        const keyword = part.toLowerCase();
        const link = document.createElement("a");
        link.href = linkURL + keyword;
        link.textContent = part;
        return [link];
      } else {
        return [document.createTextNode(part)];
      }
    });
    
    // Replace the text node with the new nodes
    node.replaceWith(...nodes);
  }
}

// Call the walk function when the page is loaded
window.addEventListener("load", walk);

function makeLink(word) {
    const a = document.createElement("a");
    a.href = `popup.html?noun=${encodeURIComponent(word)}`;
    a.textContent = word;
    a.target = '_blank';
    return a;
  }