

class Node {
    constructor(x, y, index){
        this.x = x;
        this.y = y;
        this.index = index;
        this.nodeDropDown = null;

        this.edges = [];

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

        newNode.oncontextmenu = (event) => {
            
            if (this.nodeDropDown != null) return;
            this.nodeDropDown = document.createElement('ul');
            this.nodeDropDown.classList.add('node-dropdown');
            this.nodeDropDown.style.left = `${RADIUS}px`;
            this.nodeDropDown.style.top = `${RADIUS}px`;

            //Delete btn
            const deleteNode = createDropDownNode('Delete node');

            deleteNode.onclick = () => {
                let index = listNode.findIndex(item => item.index === this.index);
                listNode.splice(index, 1);
                renderSelectNode();
                this.removeDropmenuNode();
                newNode.remove();
            }
            this.nodeDropDown.appendChild(deleteNode);

            const deleteEdge = createDropDownNode('Delete edge');

            this.nodeDropDown.appendChild(deleteEdge);
            
            const addUndirected = createDropDownNode('Add undirected edge');

            this.nodeDropDown.appendChild(addUndirected);

            const addDirected = createDropDownNode('Add directed edge');
            this.nodeDropDown.appendChild(addDirected);
            
            newNode.appendChild(this.nodeDropDown);
        }

        const childNode = document.createElement('div');
        childNode.setAttribute('draggable', true);
        childNode.setAttribute('style', `--radius: ${RADIUS * 2}px`);
        childNode.classList.add('draw__board-circle');
        childNode.textContent = this.index;

        newNode.appendChild(childNode);

        newNode.innerHTML += `<p class="draw__board-des">PREV: 10</p>`;
        document.getElementById('canvas').appendChild(newNode);
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