var numOfNodes = 10;
var edgeThreshold = 0.2;
var density = 1;
var nodeSize = 2;
var arrowSize =  20;
var nodes =  [];
var edges =  [];

for(var i = 0; i < numOfNodes; i++) {
    nodes[i] = {
        id: 'n' + i,
        label: i,
        x: Math.random(),
        y: Math.random(),
        size: 2,
        color: "#ec5148" //#eeeeee
    }
}

for( var i = 0; i < numOfNodes; i++) {
    for( var j = 0; j < numOfNodes; j++) {
        let generateEdge = Math.random() < edgeThreshold;
        if( i==j)
            console.log("%d to %d: ", i, j, generateEdge );
        if( generateEdge ) {
            edges[j + i * numOfNodes] = {
                id: 'e' + i + 'to' + j,
                source: 'n' + i,
                target: 'n' + j,
                type: i==j?"curvedArrow":"arrow"
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


var s = new sigma(
    {
      renderer: {
        container: document.getElementById('container'),
        type: 'canvas'
      },
      settings: {
        minArrowSize: 10
      }
    }
  );


for( nodeIndex in nodes ) { 
    s.graph.addNode(nodes[nodeIndex]);
}
for( edgeIndex in edges ) { 
    s.graph.addEdge(edges[edgeIndex]);
}

s.graph.nodes().forEach(function(n) {
    n.originalColor = n.color;
});
s.graph.edges().forEach(function(e) {
    e.originalColor = e.color;
});

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

s.refresh();

s.startForceAtlas2();
window.setTimeout( ()=>s.killForceAtlas2(), 500 );