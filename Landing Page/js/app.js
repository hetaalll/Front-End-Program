const navBar = () => {
    let fragment = new DocumentFragment();
    const navBar = document.getElementById('navbar_list');
    // console.log(navBar);
    const sectionList = document.querySelectorAll('section');
    // console.log(sectionList);
    let navItems = [];
    sectionList.forEach((element) => {
        // console.log(element.attributes[1].value);
        let item = element.attributes[1].value;
        navItems.push(item);
    })
    // console.log(navItems);
    navItems.forEach((element) => {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.setAttribute('href', '#');
        a.innerHTML = element;
        li.appendChild(a);
        fragment.appendChild(li);
    })
    navBar.appendChild(fragment);
}

navBar();