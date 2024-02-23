// Menu data structure
var menuLinks = [
    { text: 'about', href: '/about' },
    { text: 'catalog', href: '/catalog' },
    { text: 'orders', href: '/orders' },
    { text: 'account', href: '/account' },
  ];

  var menuLinks = [
    {text: 'about', href: '/about'},
    {text: 'catalog', href: '#', subLinks: [
        {text: 'all', href: '/catalog/all'},
        {text: 'top selling', href: '/catalog/top'},
        {text: 'search', href: '/catalog/search'},
    ]},
    {text: 'orders', href: '#' , subLinks: [
        {text: 'new', href: '/orders/new'},
        {text: 'pending', href: '/orders/pending'},
        {text: 'history', href: '/orders/history'},
    ]},
    {text: 'account', href: '#', subLinks: [
        {text: 'profile', href: '/account/profile'},
        {text: 'sign out', href: '/account/signout'},
    ]},
];

const mainEl = document.querySelector('main');

// Set the background color of mainEl to the value stored in the --main-bg CSS custom property.
mainEl.style.backgroundColor = 'var(--main-bg)';

// Set the content of mainEl to <h1>DOM Manipulation</h1>.
mainEl.innerHTML = '<h1>DOM Manipulation</h1>';

// Add a class of flex-ctr to mainEl.
mainEl.classList.add('flex-ctr');

// Select and cache the <nav id="top-menu"> element in a variable named topMenuEl.
const topMenuEl = document.getElementById('top-menu');

// Set the height of the topMenuEl element to be 100%.
topMenuEl.style.height = '100%';

// Set the background color of topMenuEl to the value stored in the --top-menu-bg CSS custom property.
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';

// Add a class of flex-around to topMenuEl.
topMenuEl.classList.add('flex-around');




// Iterate over the entire menuLinks array and create menu buttons.
menuLinks.forEach(link => {
  // Create an <a> element.
  const linkElement = document.createElement('a');

  // Add an href attribute with its value set to the href property of the "link" object.
  linkElement.href = link.href;

  // Set the content of the new element to the value of the text property of the "link" object.
  linkElement.textContent = link.text;

  // Append the new element to the topMenuEl element.
  topMenuEl.appendChild(linkElement);
});



// Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl.
const subMenuEl = document.getElementById('sub-menu');

// Set the height of subMenuEl element to be "100%".
subMenuEl.style.height = '100%';

// Set the background color of subMenuEl to the value stored in the --sub-menu-bg CSS custom property.
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';

// Add the class of flex-around to the subMenuEl element.
subMenuEl.classList.add('flex-around');

// Set the CSS position property of subMenuEl to the value of absolute.
subMenuEl.style.position = 'absolute';

// Set the CSS top property of subMenuEl to the value of 0.
subMenuEl.style.top = '0';


// Select and cache all of the <a> elements inside topMenuEl in a variable named topMenuLinks.
const topMenuLinks = topMenuEl.querySelectorAll('a');

// Attach a delegated 'click' event listener to topMenuEl.
topMenuEl.addEventListener('click', function(event) {
    // Call the event object's preventDefault() method.
    event.preventDefault();

    // Immediately return if the element clicked was not an <a> element.
    if (!event.target.matches('a')) {
        return;
    }

    // Log the content of the <a> to verify the handler is working.
    console.log(event.target.textContent);
});




// Attach a delegated 'click' event listener to topMenuEl.
topMenuEl.addEventListener('click', function(event) {
    // Call the event object's preventDefault() method.
    event.preventDefault();

    // Immediately return if the element clicked was not an <a> element.
    if (!event.target.matches('a')) {
        return;
    }

    // Toggle the "active" class on the clicked <a> element.
    event.target.classList.toggle('active');

    // Show or hide the submenu based on the "active" class.
    if (event.target.classList.contains('active')) {
        // If the clicked <a> element does not have a class of "active" yet:
        const linkObject = menuLinks.find(link => link.text === event.target.textContent);

        if (linkObject.subLinks) {
            // If the "link" object within menuLinks has a subLinks property:
            subMenuEl.style.top = '100%';

            // Build the submenu based on the subLinks array.
            buildSubmenu(linkObject.subLinks);
        } else {
            // Otherwise, set the CSS top property of subMenuEl to 0.
            subMenuEl.style.top = '0';
        }
    } else {
        // If the clicked <a> element already has a class of "active":
        // Hide the submenu by setting the CSS top property of subMenuEl to 0.
        subMenuEl.style.top = '0';
    }
});

// Helper function to build the submenu dynamically.
function buildSubmenu(subLinks) {
    // Clear the current contents of subMenuEl.
    subMenuEl.innerHTML = '';

    // Iterate over the subLinks array and build the submenu.
    subLinks.forEach(link => {
        // Create an <a> element.
        const subLinkElement = document.createElement('a');

        // Add an href attribute to the <a>, with the value set by the href property of the "link" object.
        subLinkElement.href = link.href;

        // Set the element's content to the value of the text property of the "link" object.
        subLinkElement.textContent = link.text;

        // Append the new element to the subMenuEl.
        subMenuEl.appendChild(subLinkElement);
    });
}



// Attach a delegated 'click' event listener to subMenuEl.
subMenuEl.addEventListener('click', function(event) {
    // Call the event object's preventDefault() method.
    event.preventDefault();

    // Immediately return if the element clicked was not an <a> element.
    if (!event.target.matches('a')) {
        return;
    }

    // Log the content of the <a> to verify the handler is working.
    console.log(event.target.textContent);

    // Set the CSS top property of subMenuEl to 0.
    subMenuEl.style.top = '0';

    // Remove the "active" class from each <a> element in topMenuLinks.
    topMenuLinks.forEach(link => link.classList.remove('active'));

    // Update the contents of mainEl within an <h1> to the contents of the <a> element clicked within subMenuEl.
    mainEl.innerHTML = `<h1>${event.target.textContent}</h1>`;
});



