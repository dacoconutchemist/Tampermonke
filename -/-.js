console.log(`script by
  _|  _.  _  _   _  _  ._     _|_  _ |_   _  ._ _  o  _ _|_
 (_| (_| (_ (_) (_ (_) | | |_| |_ (_ | | (/_ | | | | _>  |_`);
Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}
function xpath(xp) { return document.evaluate(xp,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; }
function calculatePolygonCentroid(vertices) {
    let cx = 0;
    let cy = 0;
    let A = 0;
    for (let i = 0; i < vertices.length; i++) {
        const x1 = vertices[i][0];
        const y1 = vertices[i][1];
        const x2 = vertices[(i + 1) % vertices.length][0];
        const y2 = vertices[(i + 1) % vertices.length][1];
        const crossProduct = x1 * y2 - x2 * y1;
        A += crossProduct;
        cx += (x1 + x2) * crossProduct;
        cy += (y1 + y2) * crossProduct;
    }
    // чатгпт пішов нахуй, не треба доділювати
    //A /= 2; // The area should be halved
    cx /= (3 * A);
    cy /= (3 * A);
    return [cx, cy];
}
