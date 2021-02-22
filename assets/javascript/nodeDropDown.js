function createDropDownNode(content, child = null){
    const list = document.createElement('li');
    list.classList.add('node-dropdown__item');
    list.innerHTML = `<a href="#" class="node-dropdown__link">${content}</a>`;
    if (child != null) list.append(child);

    return list;
}

function createChildDropDownMenu(list, parent, event){
    const ul = document.createElement('ul');
    ul.classList.add('node-dropdown');

    list.forEach(edge => {
        const temp = createDropDownNode(edge);

        temp.onclick = () => event(parent, edge);

        ul.append(temp);
    });

    return ul;
}

