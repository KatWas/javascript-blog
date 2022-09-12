{
    'use strict';
                const titleClickHandler = function(event){
                event.preventDefault();
                const clickedElement = this;
                console.log('Link was clicked!');
        
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
        
        /* nowa funkcja */

        const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles';

       
        function generateTitleLinks(customSelector = "") {

            /* remove contents of titleList */
            const titleList = document.querySelector(optTitleListSelector);
            titleList.innerHTML = '' ;

            /* for each article */
            const article = document.querySelectorAll(optArticleSelector + customSelector);
            let html = "" ;
            for (let article of articles);

            /* get the article id */
            const article id = article.getAttribute("id");


            /* find the title element */
            const articleTitle = article.querySelector(optTitleListSelector).innerHTML; 

            /* create HTML of the link */
            const linkHtml =  '<li><a href="# ' + articleId + '"><span>' + articleTitle + "</span></a></li>";
      

            /* insert link into titleList */
            html = html + linkHtml;
        
          /*links */
         const links = document.querySelectorAll( '.titles a');
         for (const link of links) {
             link.addEventListener('click', titleClickHandler);
            }
}

generateTitleLinks();

}