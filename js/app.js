const articlesContainer = document.querySelector('.articles');
const landing = document.querySelector('.landing');
const title = document.querySelector('.landing-title ');
const monthSelector = document.getElementById('month');

let date = new Date();

// Set month selector to current month / year
monthSelector.value = `${date.getFullYear()}-${date.getMonth()+1}`

monthSelector.addEventListener('change', (e) => {
    articlesContainer.innerHTML = '';
    console.log(monthSelector.value)
    let month = +monthSelector.value.slice(5,7);
    let year = +monthSelector.value.slice(0,4);

    if(monthSelector.value === ''){
        // If date cleared return all articles
        return run(date.getMonth(), date.getFullYear(), true)
    }
    // Subtract 1 from month to account for zero indexing in months array in prismic.js
    run(month - 1, year, false);
})

class Article{
    constructor(id, title, date, description, thumbnail){
        this.id = id;
        this.title = title;
        this.date = date;
        this.description = description;
        this.thumbnail = thumbnail;
        this.createArticle();
    }

    createArticle(){
        let containerDiv = document.createElement('div');
        containerDiv.classList.add('article');
        let infoDiv = document.createElement('div');
        infoDiv.classList.add('article-info');
        let title = document.createElement('h3');
        title.innerText = this.title;
        title.classList.add('title');
        infoDiv.appendChild(title);
        let articleDate = document.createElement('h4');
        articleDate.innerText = `${this.date.slice(8, 10)}/${this.date.slice(5,7)}/${this.date.slice(0, 4)}`;
        infoDiv.appendChild(articleDate);
        let articleDescription = document.createElement('h4')
        articleDescription.innerText = this.description;
        infoDiv.appendChild(articleDescription);
        title.addEventListener('click', () => {
            window.location = `./article.html?${this.id}`
        })
        let imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
        let imageInner = document.createElement('div');
        imageInner.style.backgroundImage = `url(${this.thumbnail})`;
        imageInner.classList.add('image-inner');
        imageContainer.appendChild(imageInner);
        containerDiv.appendChild(infoDiv);
        containerDiv.appendChild(imageContainer);
        articlesContainer.appendChild(containerDiv);
    }
}

const appendArticles = () => {

    if(articles.length === 0){
        let message = document.createElement('h3');
        message.innerText = 'Sorry. No articles published this month.';
        message.classList.add('title');
        message.style.marginTop = '2rem';
        return articlesContainer.appendChild(message);
    }

    for(let i = 0; i < articles.length; i++){
        let article = articles[i];
      
        let id = article.uid;
        let title = article.data.article_title[0].text;
        let date = article.data.article_date;
        let description = article.data.article_description[0].text;

        let thumbnail = article.data.article_thumbnail.url;
        
        let newArticle = new Article(id, title, date, description, thumbnail);
    }
}

let articles = []

async function run(month, year, firstRun){
    // functions in prismic.js file
    let masterRef = await getPrismicMasterRef();
    articles = await getArtciles(masterRef, month, year, firstRun );

    appendArticles();
}

run(date.getMonth(), date.getFullYear(), true);

setTimeout(() => {
    title.classList.add('active');   
    setTimeout(() => {
        landing.classList.add('active');
    }, 1500)       
}, 500)