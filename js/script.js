{
    'use strict';
        function titleClickHandler(event) {
            event.preventDefault();
        
        /* remove class 'active' from all article links */
        const activeLinks = document.querySelectorAll('.titles a.active ');
        for (let activeLink of activeLinks) {
            activeLink.classList.remove("active");
        }    
        
        /* add class 'active' to the clicked link */
        const clickedElement = this;
        clickedElement.classList.add("active");
        
        /* remove class 'active' from all articles */
        const activeArticles = document.querySelectorAll(" .post ");
        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove("active");
        }
        /* get 'href' attribute from the cliked link */
        const articleSelector = clickedElement.getAttribute("href");

        /* find the correct article using the selector (value of 'href' attribute) */
        const targetArticle = document.querySelector(articleSelector);

        /* add class 'active' to the correct article */
        targetArticle.classList.add("active");
        }
        
        /*links */
        const links = document.querySelectorAll( '.titles a');
        for (const link of links) {
            link.addEventListener('click', titleClickHandler);
        }

}