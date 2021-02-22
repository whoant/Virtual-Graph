const RADIUS = 25;
const DIAMETER = RADIUS * 2;

const heightDraw = 500;
const heightNode = 72; // height Node

let listNode = new Map();
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
    listNode.set(curNode++, newNode);  

}

function createDropSelect(x, y){

    if (isDuplicate(x - RADIUS, y - RADIUS) === true) return;

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

    dropDown.append(addNode);

    //Remove Canvas

    const removeCanvas = createDropDownNode('Clear screen');

    //Reset canvas
    removeCanvas.onclick = function(){
        document.getElementById('canvas').innerHTML = '';
        curNode = 1;
        listNode.clear();
        renderSelectNode();
        removeDropSelect();
    }

    dropDown.append(removeCanvas);

    document.getElementById('draw').append(dropDown);
}


function isDuplicate(x, y){
    let res = false;
    listNode.forEach(value => {
        let a = Math.pow((value.x - x), 2);
        let b = Math.pow((value.y - y), 2);

        let ab = Math.sqrt(a + b);
        if (ab < DIAMETER) res = true;
        
    });
    return res;
    
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

    let listRender = [];
    listNode.forEach(value => {
        listRender.push(`<option value="${value.index}">${value.index}</option>`);
    });

    pathStart.innerHTML = listRender.join('');
    pathEnd.innerHTML = listRender.join('');
    
    
}
