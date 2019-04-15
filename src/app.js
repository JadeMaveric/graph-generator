var graphNumber = 0;

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

sigma.classes.graph.addMethod('neighbors', function(nodeId) {
  var k,
  neighbors = {},
  index = this.allNeighborsIndex[nodeId] || {};
  
  for (k in index)
  neighbors[k] = this.nodesIndex[k];
  
  return neighbors;
});

function makeGraph() {
    s.graph.clear();
    s.refresh();

    let numOfNodes = document.getElementById("num-nodes").value;
    let numOfEdges = document.getElementById("num-edges").value;

    let graph = {
      nodes: [],
      edges: []
    };

    for (i = 0; i < numOfNodes; i++)
      graph.nodes.push({ 
        id:   i + graphNumber.toString(),
        x: Math.random(),
        y: Math.random(),
        size: 1,
        color: '#ec5148'
      });

    for (i = 0; i < numOfEdges; i++) {
      let src  = '' + (Math.random() * numOfNodes | 0) + graphNumber.toString();
      let dest = '' + (Math.random() * numOfNodes | 0) + graphNumber.toString();
      graph.edges.push({ 
        id: i + graphNumber.toString(), 
        source: src, 
        target: dest,
        type: src==dest?"curvedArrow":"arrow"
      });
    }

    s.graph.read(graph);
    
    s.graph.nodes().forEach(function(n) {
      n.originalColor = n.color;
    });
    s.graph.edges().forEach(function(e) {
      e.originalColor = e.color;
    });

    graphNumber++;

    s.refresh();

    s.startForceAtlas2({
      gravity: 2
    });
    window.setTimeout( ()=>s.killForceAtlas2(), 500 );

}
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