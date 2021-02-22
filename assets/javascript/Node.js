

class Node {
    constructor(x, y, index){
        this.x = x;
        this.y = y;
        this.index = index;
        this.nodeDropDown = null;
        this.edges = [];

    }

    pushEdge(edge){
        this.edges.push(edge);
    }

    deleteEdge(edge){
        const indexDege = this.edges.indexOf(edge);
        this.edges.splice(indexDege, 1);
    }

    getEdgeNotConnect(){
        let arrEdge = [];
        listNode.forEach(node => arrEdge.push(node.index));
        let res = arrEdge.filter(edge => this.edges.includes(edge) === false && edge != this.index);
        return res;
    }

    draw(){
        const newNode = document.createElement('div');
        newNode.classList.add('draw__board-node');
        
        this.setNewCoordinates(newNode);

        
        newNode.ondragend = (event) => {
            if (this.nodeDropDown != null) this.removeDropmenuNode();
            // if (event.x === 0 || event.y === 0) return;
            let x = event.x - startX - RADIUS;
            let y = event.y - startY - RADIUS;
            
            if (x < 0 || y < 0 || y > heightDraw - startY) return;
            this.x = x;
            this.y = y;

            this.setNewCoordinates(newNode);
            
        }

        // Click right newNode
        newNode.oncontextmenu = (event) => {
            
            if (this.nodeDropDown != null) return;
            this.nodeDropDown = document.createElement('ul');
            this.nodeDropDown.classList.add('node-dropdown');
            this.nodeDropDown.style.left = `${RADIUS}px`;
            this.nodeDropDown.style.top = `${RADIUS}px`;

            //Delete btn
            const deleteNode = createDropDownNode('Delete node');

            deleteNode.onclick = () => {

                listNode.delete(this.index);
                renderSelectNode();
                this.removeDropmenuNode();
                newNode.remove();
            }
            this.nodeDropDown.append(deleteNode);

            // Delete edge

            const elemDelEdge = createChildDropDownMenu(this.edges, this, this.eventDeleteEdge);

            const deleteEdge = createDropDownNode('Delete edge', elemDelEdge);
            this.nodeDropDown.append(deleteEdge);
            
            //render edge not connect
            const edgeNotConnect = this.getEdgeNotConnect();

            
            // Add undirected edge
            const elemEdge = createChildDropDownMenu(edgeNotConnect, this, this.eventPushUndiretedEdge);
            const addUndirected = createDropDownNode('Add undirected edge', elemEdge);
            
            this.nodeDropDown.append(addUndirected);
            
            
            // Add dircted edge
            const cloneElemEdge = createChildDropDownMenu(edgeNotConnect, this, this.eventPushEdge);
            const addDirected = createDropDownNode('Add directed edge', cloneElemEdge);
            
            this.nodeDropDown.append(addDirected);
            
            newNode.append(this.nodeDropDown);
        }

        const childNode = document.createElement('div');
        childNode.setAttribute('draggable', true);
        childNode.setAttribute('style', `--radius: ${RADIUS * 2}px`);
        childNode.classList.add('draw__board-circle');
        childNode.textContent = this.index;

        newNode.append(childNode);

        newNode.innerHTML += `<p class="draw__board-des">PREV: 10</p>`;
        document.getElementById('canvas').append(newNode);
    }

    eventPushEdge(parent, edge){
        parent.pushEdge(edge);
        parent.edges.sort();
    }
    
    eventDeleteEdge(parent, edge){
        parent.deleteEdge(edge);
        parent.edges.sort();
        
    }

    eventPushUndiretedEdge(parent, edge){
        parent.pushEdge(edge);
        parent.edges.sort();

        let tempNode = listNode.get(edge);
        tempNode.pushEdge(parent.index);
        tempNode.edges.sort();

    }


    


    setNewCoordinates(newNode){
        newNode.style.left = `${this.x}px`;
        newNode.style.top = `${this.y}px`;
    }

    removeDropmenuNode(){
        this.nodeDropDown.remove();
        this.nodeDropDown = null;
    }

}