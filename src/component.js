componentType = ["Line", "Polygon"];
componentColor = ["#EC5148", "#1EEE6D", "#C85AE5", "#E1EA28", "#842EEB", "#EB2E2E"];

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
    constructor( refId, type, numOfNodes, refNode, color ) {
        this.type = type,
        this.nodeCount = numOfNodes;
        this.nodes = new Array();
        this.edges = new Array();
        this.refX = refNode.x;
        this.refY = refNode.y;
        this.index = refId;
        this.color = color;
        this.edgeThreshold = 0.3;

        // Generate nodes based on type
        switch( type ) {
            case "Line":
                let m = Math.random() * 2 - 1;
                let stepSize = Math.random() * maxDistanceBetweenNodes;
                for(let i = 0; i < numOfNodes; i++) {
                    let x = stepSize * i;
                    let y = m*x;
                    
                    this.nodes.push({
                        id: refId + 'n' + i,
                        label: i,
                        x: x + this.refX,
                        y: y + this.refY,
                        size: nodeSize,
                        color: this.color
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
                        color: this.color
                    });
                });
                break;
        }

        // Generate edges
        this.nodes.forEach( src => {
            this.nodes.forEach( trg=> {
                let generateEdge = Math.random() < this.edgeThreshold;
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

