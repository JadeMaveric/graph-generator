/**
 * @algorithm
 * 1. Generate a high level graph with approximately `numOfNodes/4` nodes
 * 2. Generate a component in each graph
 * 3. Connect Components using pythogorean minDist function
 */

var numOfNodes = 4;
var density = 1;
var nodeSize = 2;
var arrowSize =  20;
var edgeThreshold = 0.5;
var nodes = [];
var edges = [];

for(var i = 0; i < numOfNodes; i++) {
    nodes[i] = {
        id: 'n' + i,
        label: i,
        x: Math.random(),
        y: Math.random(),
        size: nodeSize,
        color: "#ec5148" //#eeeeee
    }
}

for( var i = 0; i < numOfNodes; i++) {
    for( var j = 0; j < numOfNodes; j++) {
        let generateEdge = Math.random() > edgeThreshold;
        console.log("%d to %d: ", i, j, generateEdge );
        if( generateEdge ) {
            edges[j + i * numOfNodes] = {
                id: 'e' + i + 'to' + j,
                source: 'n' + i,
                target: 'n' + j,
                type: "arrow",
                size: arrowSize 
            }
        }
    }
}

sigma.classes.graph.addMethod('neighbors', function(nodeId) {
    var k,
        neighbors = {},
        index = this.allNeighborsIndex[nodeId] || {};

    for (k in index)
      neighbors[k] = this.nodesIndex[k];

    return neighbors;
});


var s = new sigma('container');

nodes.forEach( node => s.graph.addNode(node) );
edges.forEach( edge => s.graph.addEdge(edge) );

s.refresh();

s.graph.nodes().forEach( node => node.originalColor = node.color );
s.graph.edges().forEach( edge => edge.originalColor = edge.color );

s.bind('clickNode', function(e) {
    var nodeId = e.data.node.id
    var toKeep = s.graph.neighbors(nodeId);
    toKeep[nodeId] = e.data.node;

    s.graph.nodes().forEach(function(n) {
      if (toKeep[n.id])
        n.color = n.originalColor;
      else
        n.color = '#eee';
    });

    s.graph.edges().forEach(function(e) {
      if (toKeep[e.source] && toKeep[e.target])
        e.color = e.originalColor;
      else
        e.color = '#eee';
    });

    s.refresh();
});

s.bind('clickStage', function(e) {
    s.graph.nodes().forEach(function(n) {
      n.color = n.originalColor;
    });

    s.graph.edges().forEach(function(e) {
      e.color = e.originalColor;
    });

    s.refresh();
});
