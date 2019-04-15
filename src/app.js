let s = new sigma({
    renderer: {
        container: document.getElementById('container'),
        type: 'canvas'
    },
    settings: {
        minArrowSize: 10
    }
});

let dragNodesListener = sigma.plugins.dragNodes(s, s.renderers[0]);

let canvas = document.getElementsByClassName("sigma-scene")[0];
let button = document.getElementById("download-button");

button.addEventListener( 'click', e => {
    let dataURL = canvas.toDataURL('image/png');
    button.href  = dataURL;
});

function makeGraph() {
    let numOfNodes = document.getElementById("num-nodes").value;
    let numOfEdges = document.getElementById("num-edges").value;
    let simulationTimeout = document.getElementById("sim-timeout").value;

    s.graph.clear();
    s.refresh();

    let graph = {
        nodes: [],
        edges: []
    };

    for (i = 0; i < numOfNodes; i++) {
        graph.nodes.push({ 
            id:   i,
            x: Math.random(),
            y: Math.random(),
            size: 0.3,
            color: '#ec5148'
        });
    }

    for (i = 0; i < numOfEdges; i++) {
        let src  = '' + (Math.random() * numOfNodes | 0);
        let dest = '' + (Math.random() * numOfNodes | 0);
        let isCurved = src==dest;

        graph.edges.forEach( e => {
            // Prevent Multiple edges - NAIVE IMPLEMENTATION
            while ( (e.source == src) && (e.target == dest) ) {
                src  = '' + (Math.random() * numOfNodes | 0);
                dest = '' + (Math.random() * numOfNodes | 0);
            }

            // Curve Bidirectional Edges
            if( (e.source == dest) && (e.target == src) ) {
                isCurved = true;
                e.type = "curvedArrow";
            }
        });

        graph.edges.push({ 
            id: i, 
            source: src, 
            target: dest,
            type: isCurved?"curvedArrow":"arrow"
        });
    }
    
    s.graph.read(graph);
    s.refresh();

    s.startForceAtlas2({ gravity: 2 });
    window.setTimeout( ()=>s.killForceAtlas2(), simulationTimeout );

}


