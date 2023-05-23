"use strict";
//////////////////////////////////
//////// Declare variables:
const newsNav = document.querySelector(".navigation .news-nav");
const newsList = document.querySelector(".news-list");
const directPageContainer = document.querySelector(".direct-pages");
const nextBtn = document.querySelector(".direct-pages i.fa-chevron-right");
const prevBtn = document.querySelector(".direct-pages i.fa-chevron-left");
const pagesNumber = document.querySelector(".direct-pages .pages-number");
const searchInput = document.querySelector(".input-search");
const searchBtn = document.querySelector(".btn-search");
//////////////////////////////////
//////// Functions:
// Active news navigator:
newsNav.classList.add("active");

// get currentUser instance:
const currentUser = parseUser(JSON.parse(localStorage.getItem("currentUser")));
console.log(currentUser);
const currentUserData = getData("currentUser");
console.log(currentUserData);

// User class function to get API and render News :
User.prototype.getAPI = async function (link) {
    try {
        const res = await fetch(link);
        const newsData = await res.json();
        console.log(newsData);
        if (newsData.totalResults === 0) {
            directPageContainer.classList.add("hidden");
            newsList.innerHTML = '<p class="no-result">No result!</p>';
        } else {
            directPageContainer.classList.remove("hidden");
            newsList.innerHTML = "";
            newsData.articles.forEach((element) => {
                newsList.insertAdjacentHTML(
                    "beforeend",
                    `
                <div class="news">
                    <div class = "news-img">
                        <img src=${element.urlToImage} alt="news-thumb" />
                    </div>
                    <div class="news-details">
                        <h2 class="news-title">${element.title}</h2>
                        <p class="news-content">
                        ${element.description}
                        </p>
                        <a href="${element.url}"class = "news-view">View</a>
                    </div>
                </div>
                `
                );
            });
        }
        return newsData.totalResults;
    } catch (error) {
        console.error(new Error(error));
    }
};

// News Object:
const newsObject = {
    pageSize: currentUserData.newsPerPage ?? 5,
    page: 1,
    category: currentUserData.category ?? "",
    urlNews: "",
    searchInputValue: "",
    // create urlNews:
    createUrlNews: function () {
        return (this.urlNews =
            "https://newsapi.org/v2/top-headlines?" +
            `country=us` +
            `${this.searchInputValue ? "&q=" + this.searchInputValue : ""}` +
            `${this.category ? "&category=" + this.category : ""}` +
            `&pageSize=${this.pageSize}` +
            `&page=${this.page}` +
            `&apiKey=7376fa7f72f6449c8819aee9a945fdc9`);
    },
};

// Change Pages:
async function handleChangePage() {
    try {
        const totalNews = await currentUser.getAPI(newsObject.createUrlNews());
        const totalPages =
            totalNews % newsObject.pageSize === 0
                ? totalNews / newsObject.pageSize
                : Math.trunc(totalNews / newsObject.pageSize) + 1;
        console.log(totalPages);

        // When user click previous btn:
        prevBtn.addEventListener("click", () => {
            if (newsObject.page > 1) {
                console.log(totalPages);
                newsObject.page--;
                console.log(newsObject.page);
                currentUser.getAPI(newsObject.createUrlNews());
                console.log(newsObject.createUrlNews());
                changePagesNumber();
                nextBtn.classList.remove("hidden");
            }
            if (newsObject.page === 1) {
                prevBtn.classList.add("hidden");
            }
        });

        // When user click next btn:
        nextBtn.addEventListener("click", () => {
            if (newsObject.page < totalPages) {
                console.log(totalPages);
                newsObject.page++;
                console.log(newsObject.page);
                currentUser.getAPI(newsObject.createUrlNews());
                changePagesNumber();
                prevBtn.classList.remove("hidden");
            }
            if (newsObject.page === totalPages) {
                nextBtn.classList.add("hidden");
            }
        });
    } catch (error) {
        console.error(new Error(error));
    }
}
handleChangePage();

function changePagesNumber() {
    pagesNumber.textContent = `${newsObject.page}`;
}
changePagesNumber();

// Search function:
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    newsObject.page = 1;
    newsObject.searchInputValue = searchInput.value;
    prevBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
    currentUser.getAPI(newsObject.createUrlNews());
});
