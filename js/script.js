
    'use strict';
        function titleClickHandler(event) {
            event.preventDefault();
        /* remove class 'active' from all article links */
        const activeLinks = document.querySelectorAll(" .titles a.active ");
        for (let activeLink of activeLinks) {
            activeLink.classList.remove("active");
        }    
        /* add class 'active' to the clicked link */
        const clickedElement = this;
        clickedElement.classList.add ("active");

        }
}