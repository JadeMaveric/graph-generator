componentType = ["Line", "Polygon"];

/**
 * Components are a collection of nodes and edges that build up a graph
 */
class Component {
/*    constructor() {
        this.node = [];
        this.edge = [];
        this.refX = 0.5;
        this.refY = 0.5;
    }
    
    constructor( nodes, edges ) {
        this.node = nodes;
        this.edge = edges;
        this.refX = 0.5;
        this.refY = 0.5;
    }
*/
    constructor( type, numOfNodes, refNode, refId ) {
        this.type = type,
        this.nodes = new Array();
        this.edges = new Array();
        this.refX = refNode.x;
        this.refY = refNode.y;
        this.edgeThreshold = 0.5;

        // Generate nodes based on type
        switch( type ) {
            case "Line":
                let m = Math.random();
                let stepSize = Math.random();
                for(let i = 0; i < numOfNodes; i++) {
                    let x = stepSize * i;
                    let y = m*x;
                    
                    this.nodes.push({
                        id: refId + 'n' + i,
                        label: i,
                        x: x + this.refX,
                        y: y + this.refY,
                        size: nodeSize,
                        color: "#ec5148"
                    });
                }
                break;
            case "Polygon":
                let vertices = calcVertices(this.refX, this.refY, numOfNodes, Math.random()*0.1);
                vertices.forEach( (vertex, i) => {
                    this.nodes.push({
                        id: refId + 'n' + i,
                        label: i,
                        x: vertex.x,
                        y: vertex.y,
                        size: nodeSize,
                        color: "#ec5148"
                    });
                });
                break;
        }

        // Generate edges
        this.nodes.forEach( src => {
            this.nodes.forEach( trg=> {
                let generateEdge = Math.random() > this.edgeThreshold;
                if( generateEdge ) {
                    this.edges.push({
                        id: src.id + 'to' + trg.id,
                        source: src.id,
                        target: trg.id,
                        type: "arrow",
                        size: arrowSize 
                    });
                }
            })
        });
    }

    
}

