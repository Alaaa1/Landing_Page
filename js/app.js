/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
//create list of sections
let sections = document.querySelectorAll('section');
//select the nav menu
let navMenu = document.querySelector('ul');

let hideNavMenu = 0;
//create the scroll to top button
const scrollToTopButton = navMenu.appendChild(document.createElement('button'));
scrollToTopButton.textContent = 'Scroll to Top';
scrollToTopButton.style.display = 'none';
scrollToTopButton.onclick = toTop;

function toTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// generate <a> tag for each section
function generateLinks(sectionID, sectionElement) {
    const link = document.createElement('a');
    link.textContent = sectionElement.dataset.nav;
    link.href = '#'+sectionID;
    link.addEventListener('click', (event) => {
        // smoothly scroll to the section instead of jumping
        event.preventDefault();
        sectionElement.scrollIntoView({
            behavior: 'smooth'
        })
    });
    return link;
}

//check if element is in view port
function isInViewPort(section) {
    const rect = section.querySelector('h2').getBoundingClientRect();
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        return true;
    }
}

function showButton() {
    scrollToTopButton.style.display = 'inline-block';
}

function hideButton() {
    scrollToTopButton.style.display = 'none';
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildMenu() {
    // for each section, create an <li> and append it to the list, then append the generated <a> to the <li>
    for (const section of sections) {
        const listElement = document.createElement('li');
        listElement.className = 'menu__link';
        listElement.appendChild(generateLinks(section.id, section));
        navMenu.appendChild(listElement);
    }

}

// Add class 'active' to section when near top of viewport
function setActive() {
    for (const section of sections) {
        isInViewPort(section) ? section.className = 'active' : section.className = '';
    }
}

//This function will call setActive() and will toggle nav menu visibility
function handleScrolling() {

    //prevent the menu from disappearing while scrolling
    window.clearTimeout(hideNavMenu);

    setActive();

    //toggle visibility
    navMenu.style.display = 'block';
    hideNavMenu = setTimeout( ()=> {
        navMenu.style.display = 'none'
    }, 1200)
    if (document.body.scrollTop > window.innerHeight) showButton();
    else if (document.body.scrollTop <= window.innerHeight) hideButton();
    return hideNavMenu;
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

//check active elements and toggle nav menu visibility and toggle scroll to top button
document.addEventListener('scroll', handleScrolling);
/**
 * End Events
 */


// Build menu
buildMenu();

// Set sections as active
setActive();
