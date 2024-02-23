// Menu data structure
var menuLinks = [
    { text: 'about', href: '/about' },
    { text: 'catalog', href: '/catalog', subLinks: [
        { text: 'all', href: '/catalog/all' },
        { text: 'top selling', href: '/catalog/top' },
        { text: 'search', href: '/catalog/search' },
    ]},
    { text: 'orders', href: '#', subLinks: [
        { text: 'new', href: '/orders/new' },
        { text: 'pending', href: '/orders/pending' },
        { text: 'history', href: '/orders/history' },
    ]},
    { text: 'account', href: '#', subLinks: [
        { text: 'profile', href: '/account/profile' },
        { text: 'sign out', href: '/account/signout' },
    ]},
];

// Select main element
const mainEl = document.querySelector('main');

// Set main element styles and content
mainEl.style.backgroundColor = 'var(--main-bg)';
mainEl.innerHTML = '<h1>DOM Manipulation</h1>';
mainEl.classList.add('flex-ctr');

// Select and cache the top menu element
const topMenuEl = document.getElementById('top-menu');

// Set top menu element styles
topMenuEl.style.height = '100%';
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';
topMenuEl.classList.add('flex-around');

// Create menu buttons and append to topMenuEl
menuLinks.forEach(link => {
    const linkElement = document.createElement('a');
    linkElement.href = link.href;
    linkElement.textContent = link.text;
    topMenuEl.appendChild(linkElement);
});

// Select and cache the submenu element
const subMenuEl = document.getElementById('sub-menu');

// Set submenu element styles
subMenuEl.style.height = '100%';
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';
subMenuEl.classList.add('flex-around');
subMenuEl.style.position = 'absolute';
subMenuEl.style.top = '0';

// Select all <a> elements inside topMenuEl
const topMenuLinks = topMenuEl.querySelectorAll('a');

// Attach a delegated 'click' event listener to topMenuEl
topMenuEl.addEventListener('click', function (event) {
    // Prevent default behavior
    event.preventDefault();

    // Check if the clicked element is an <a> element
    if (!event.target.matches('a')) {
        return;
    }

    // Toggle the "active" class on the clicked <a> element
    event.target.classList.toggle('active');

    // Show or hide the submenu based on the "active" class
    if (event.target.classList.contains('active')) {
        // If the clicked <a> element does not have a class of "active" yet
        const linkObject = menuLinks.find(link => link.text === event.target.textContent);

        if (linkObject.subLinks) {
            // If the "link" object within menuLinks has a subLinks property
            subMenuEl.style.top = '100%';

            // Build the submenu based on the subLinks array
            buildSubmenu(linkObject.subLinks);
        } else {
            // Otherwise, set the CSS top property of subMenuEl to 0
            subMenuEl.style.top = '0';
        }
    } else {
        // If the clicked <a> element already has a class of "active"
        // Hide the submenu by setting the CSS top property of subMenuEl to 0
        subMenuEl.style.top = '0';
    }

    // Log the content of the <a> to verify the handler is working
    console.log(event.target.textContent);

    // Remove the "active" class from each <a> element in topMenuLinks
    topMenuLinks.forEach(link => {
        if (link !== event.target) {
            link.classList.remove('active');
        }
    });

    // Update the contents of mainEl within an <h1> to the contents of the <a> element clicked within subMenuEl
    mainEl.innerHTML = `<h1>${event.target.textContent}</h1>`;
});

// Attach a delegated 'click' event listener to subMenuEl
subMenuEl.addEventListener('click', function (event) {
    // Prevent default behavior
    event.preventDefault();

    // Check if the clicked element is an <a> element
    if (!event.target.matches('a')) {
        return;
    }

    // Log the content of the <a> to verify the handler is working
    console.log(event.target.textContent);

    // Set the CSS top property of subMenuEl to 0
    subMenuEl.style.top = '0';

    // Remove the "active" class from each <a> element in topMenuLinks
    topMenuLinks.forEach(link => link.classList.remove('active'));

    // Update the contents of mainEl within an <h1> to the contents of the <a> element clicked within subMenuEl
    mainEl.innerHTML = `<h1>${event.target.textContent}</h1>`;
});

// Helper function to build the submenu dynamically
function buildSubmenu(subLinks) {
    // Clear the current contents of subMenuEl
    subMenuEl.innerHTML = '';

    // Iterate over the subLinks array and build the submenu
    subLinks.forEach(link => {
        // Create an <a> element
        const subLinkElement = document.createElement('a');

        // Add an href attribute to the <a>, with the value set by the href property of the "link" object
        subLinkElement.href = link.href;

        // Set the element's content to the value of the text property of the "link" object
        subLinkElement.textContent = link.text;

        // Append the new element to the subMenuEl
        subMenuEl.appendChild(subLinkElement);
    });
}