const RADIUS = 25;
const DIAMETER = RADIUS * 2;

const heightDraw = 500;
const heightNode = 72; // height Node

let listNode = [];
let curNode = 1;

const startX = document.querySelector('.group').offsetWidth; // 
const startY = document.querySelector('.header').offsetHeight;


document.getElementById('canvas').style.height = `${heightDraw}px`;


canvas.addEventListener('contextmenu', function(event){
    
    createDropSelect(event.x - startX, event.y - startY);
});

canvas.addEventListener('click', function(event){
    removeDropSelect();
});


function drawCircle(x, y){
    
    const newNode = new Node(x, y, curNode);
    newNode.draw();
    listNode.push(newNode);
    curNode++;
        

}

function createDropSelect(x, y){

    if (checkDuplicate(x - RADIUS, y - RADIUS) === false) return;

    removeDropSelect();
    const dropDown = document.createElement('ul');
    dropDown.setAttribute('id', 'dropdown');
    dropDown.style.left = `${x}px`;
    dropDown.style.top = `${y}px`;
    dropDown.classList.add('node-dropdown');

    //Add Node

    const addNode = createDropDownNode('Add node');

    addNode.onclick = function(){
        drawCircle(x - RADIUS, y - RADIUS);
        renderSelectNode();
        removeDropSelect();
    }

    dropDown.appendChild(addNode);

    //Remove Canvas

    const removeCanvas = createDropDownNode('Clear screen');

    removeCanvas.onclick = function(){
        document.getElementById('canvas').innerHTML = '';
        curNode = 1;
        listNode.length = 0;
        renderSelectNode();
        removeDropSelect();
    }

    dropDown.appendChild(removeCanvas);

    document.getElementById('draw').appendChild(dropDown);
}


function checkDuplicate(x, y){
    let resuft = listNode.every(item => {
        let a = Math.pow((item.x - x), 2);
        let b = Math.pow((item.y - y), 2);

        let ab = Math.sqrt(a + b);
        return ab > DIAMETER;
    });
    return resuft;
    
}

function removeDropSelect(){
    const checked = document.getElementById('dropdown');
    if (checked) checked.remove();

    listNode.forEach(element => {
        if (element.nodeDropDown != null) element.removeDropmenuNode();
    });
    
}

function renderSelectNode(){
    const pathStart = document.getElementById('path-start');
    const pathEnd = document.getElementById('path-end');
    let listRender = listNode.map(node => `<option value="${node.index}">${node.index}</option>`);
    pathStart.innerHTML = listRender.join('');
    pathEnd.innerHTML = listRender.join('');
    
    
}
