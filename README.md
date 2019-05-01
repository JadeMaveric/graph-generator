# Graph Generator
A web app to dynamically generate graphs for DSA practicals
![sample image](https://i.ibb.co/0tWh162/Capture1.png "Graph Generator Sample")

### Install and usage instructions
- Clone this repo and open `index.html`
- Alternatively, use [the online version](https://jademaveric.github.io/graph-generator/)
- Specify the number of nodes and edges
- Hit generate (hit it again if you don't like what you see)
- Drag any nodes to manually adjust (careful, this a fidgety feature)
- Press download to save an image of the graph

_The project is essentially a webpage running web workers in the background. While running a local web server would be ideal. The project uses a local (frozen) version of [sigma.js](sigmajs.org "Sigma.js Home") to display graphs. So directly opening `index.html` works fine too._

### Features
- Generate graphs with a prerequisite number of nodes and edges.
- Automatically and aesthetically arrange nodes
- Drag and drop nodes for manual adjustment
- Save the graph as an image file for further use

### Abstract Algorithm
1. The program pseudorandomly generates nodes and edges based on parameters given to it and information it already knows.
2. These nodes and edges are then passed to a Sigma instance which handles visualisation.
3. A (physics simulation)[https://en.wikipedia.org/wiki/Force-directed_graph_drawing "Force-directed Graph Drawing"] is then run to achieve an aesthetic layout.

#### Todo
- Change label type (display each node as an encircled number)
- Modify layout algorithm so that graphs are arranged on a grid (easier for humans to copy)
- Let common algorithms (BFS, DFS...) be run on the generated graph
