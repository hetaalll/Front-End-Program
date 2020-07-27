/**
* @description scrolls to the appropriate section
* @param {event} e
*/
const scrollTo = (e) => {
    var name = e.srcElement.attributes.class.value;
    document.getElementById(name).scrollIntoView();
    e.target.setAttribute("href", `#${name}`);
}

/**
* @description builds the navbar
*/
const navBar = () => {
    let fragment = new DocumentFragment();
    const navBar = document.getElementById('navbar_list');
    const sectionList = document.querySelectorAll('section');
    let navItems = [];
    sectionList.forEach((element) => {
        let item = element.attributes[1].value;
        navItems.push(item);
    })
    var i = 1;
    var name = "";
    navItems.forEach((element) => {
        let li = document.createElement('li');
        let a = document.createElement('a');
        name = "section" + i;
        a.setAttribute('href', '#');
        a.setAttribute("class", name);
        a.innerHTML = element;
        a.addEventListener('click', scrollTo);
        li.appendChild(a);
        fragment.appendChild(li);
        i++;
    })
    navBar.appendChild(fragment);
}

/**
* @description checks if the given element is in viewport
* @param {element} element
* @returns {number} true if in viewport, else false
*/
function inViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
* @description if the element is in viewport, change it to active class
*/
function checkInViewport() {
    const sectionList = document.querySelectorAll('section');

    window.addEventListener("scroll", function () {
        sectionList.forEach((element) => {
            if (inViewport(element)) {
                var active = document.getElementsByClassName('your-active-class');
                active[0].classList.remove('your-active-class');

                element.setAttribute("class", "your-active-class");
            }
        })
    })
}


navBar();
checkInViewport();