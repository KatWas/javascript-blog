'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector("#template-article-link").innerHTML),
  articleTag: Handlebars.compile(document.querySelector("#template-article-tag").innerHTML),
  articleAuthor: Handlebars.compile(document.querySelector("#template-article-author").innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector("#template-tag-cloud-link").innerHTML),
  tagLinkRight: Handlebars.compile(document.querySelector("#template-article-author-tag").innerHTML),
};

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

/* nowa funkcja */

const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles",
  optArticleTagsSelector = ".post-tags .list",
  optArticleAuthorSelector = ".post-author",
  optTagsListSelector = ".tags.list",
  optCloudClassCount = 5,
  optCloudClassPrefix = "tag-size-",
  optAuthorsListSelector = ".authors.list";

function generateTitleLinks(customSelector = "") {

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = "";

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = "";
  for (let article of articles) {

    /* get the article id */
    const articleId = article.getAttribute("id");

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
    const linkHtml = '<li><a href="#' + articleId + '"><span>' + articleTitle + "</span></a></li>";

    /* insert link into titleList */
    html = html + linkHtml;
  }
  titleList.innerHTML = html;

  /*links */
  const links = document.querySelectorAll('.titles a');
  for (const link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

function calculateTagsParams(tags) {
  const params = { max: 0, min: 999 };
  for (let tag in tags) {
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

  return optCloudClassPrefix + classNumber;
}

function generateTags() {

  /* [NEW] create a new variable allTags with an empty object */
  const allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = "";

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute("data-tags");
    console.log(articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(" ");
    console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log(tag);

      /* generate HTML of the link */
      const linkHTMLData = { id: tag, title: tag };
      const linkHTML = templates.articleTag(linkHTMLData);

      /* insert link into html variable */
      html = html + "" + linkHTML;
      /* add generated code to html variable */

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper tagWrapper = tagsList */
    tagWrapper.innerHTML = html;

    /* END LOOP: for every article: */
  }

  const tagsList = document.querySelector(optTagsListSelector);
  const params = calculateTagsParams(allTags)
  const allTagsData = [];

  for(const tag in allTags) {
    allTagsData.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], params)
    });
  }

  tagsList.innerHTML = templates.tagCloudLink({ tags: allTagsData });

}

function tagClickHandler(event) {
  console.log("Function tagClickHandler has been run");

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log("cliked tag");

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");
  console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace("#tag-", "");

  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="tag-"]');

  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {

    /* remove class active */
    activeTagLink.classList.remove("active");

    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {

    /* add class active */
    tagLink.classList.add("active");

    /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {

    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener("click", tagClickHandler);

    /* END LOOP: for each link */
  }
}

function generateAuthors() {

  /* [NEW] create a new variable allTags with empty OBJECT*/
  const allAuthors = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find  tags wrapper*/
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    console.log(authorWrapper);
    /* gets tags from data-tags atribute */
    const author = article.getAttribute("data-author");

    /* generate HTML of the link */
    /* const linkHTML = '<a href= "#author-' + authorNames + '"><span>'+ author + " </span></a>";*/
    const linkHTMLData = { id: author, title: author };
    const linkHTML = templates.articleAuthor(linkHTMLData);

    /* [NEW] check if this link is NOT already in allTags */
    if (!allAuthors.hasOwnProperty(author)) {
      /* [NEW] add generated code to allTags array */
      allAuthors[author] = true;
    }

    /* insert HTML of all the links into the tags wrapper tagWrapper = tagsList */
    authorWrapper.innerHTML = linkHTML;
  }

  /* [NEW] find list of tags in right column */
  const authorTagsList = document.querySelector(optAuthorsListSelector);

  const allAuthorsData = [];

  for (let author in allAuthors) {
    allAuthorsData.push(author)
  }

  //authorTagsList.innerHTML = allAuthorsHTML;
  authorTagsList.innerHTML = templates.tagLinkRight({ authors: allAuthorsData });
}

function authorClickHandler(event) {
  event.preventDefault();
  const clikedElement = this;
  console.log("autor klikni??ty");
  const href = clikedElement.getAttribute("href");
  console.log(href);
  const author = href.replace("#author-", "");
  const authorActives = document.querySelectorAll('a.active[href^="#author"]');
  for (let authorActive of authorActives) {
    /*remove active class*/
    authorActive.classList.remove("active");
    /*END LOOP: for each active tag link*/
  }
  /*find all tag links with "href" attribute equal to the "href" constant*/
  const findAllAuthors = document.querySelectorAll('a[href="' + href + '"]');
  console.log(findAllAuthors);

  /*START LOOP: for each found tag link*/
  for (let findAllAuthor of findAllAuthors) {
    /*add class active */
    findAllAuthor.classList.add("active");
    /*END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument*/
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){

/*find all links to tags*/
  const links = document.querySelectorAll('a[href^="#author-"]');

  /*START LOOP: for each link*/
  for (let link of links){

  /*add tagClickHandler as event listener for taht link */
      link.addEventListener("click", authorClickHandler);

      /*END LOOP: for each link*/
    }
  }

  generateTitleLinks();
  generateTags();
  addClickListenersToTags();
  generateAuthors();
  addClickListenersToAuthors();

