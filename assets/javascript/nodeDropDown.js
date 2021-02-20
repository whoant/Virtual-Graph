function createDropDownNode(content, child = null){
    const list = document.createElement('li');
    list.classList.add('node-dropdown__item');
    list.innerHTML = `<a href="#" class="node-dropdown__link">${content}</a>`;
    if (child != null) list.appendChild(child);

    return list;
}