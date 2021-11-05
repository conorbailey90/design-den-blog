const articlesContainer = document.querySelector('.articles');
const landing = document.querySelector('.landing');
const title = document.querySelector('.landing-title ');
const monthSelector = document.getElementById('month');

let date = new Date();
monthSelector.value = `${date.getFullYear()}-${date.getMonth()+1}`

monthSelector.addEventListener('change', (e) => {
    articlesContainer.innerHTML = '';

    let month = +monthSelector.value.slice(5,7);
    let year = +monthSelector.value.slice(0,4);

    if(monthSelector.value === ''){
        return run(date.getMonth(), date.getFullYear(), true)
    }

    run(month - 1, year, false);
})

class Article{
    constructor(id, title, date, description, content, thumbnail, images, video ){
        this.id = id;
        this.title = title;
        this.date = date;
        this.description = description;
        this.content = content;
        this.thumbnail = thumbnail;
        this.images = images;
        this.video = video;
        this.createArticle();
    }

    createArticle(){
        let containerDiv = document.createElement('div');
        containerDiv.classList.add('article');
    
        let infoDiv = document.createElement('div');
        infoDiv.classList.add('article-info');
    
        let title = document.createElement('h2');
        title.innerText = this.title;
        title.classList.add('title');
        infoDiv.appendChild(title);
    
        let articleDate = document.createElement('h');
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
    for(let i = articles.length-1; i >= 0; i--){
        console.log(i)
        let article = articles[i];
        console.log(article)
        let id = article.uid;
        let title = article.data.article_title[0].text;
        let date = article.data.article_date;
        let description = article.data.article_description[0].text;
        let content = article.data.content[0].text;
        let thumbnail = article.data.thumbnail.url;
        let images = [];
        let video = '';
        console.log(article)
        console.log(id, title, date, description, content, thumbnail,images,video);
        let newArticle = new Article(id, title, date, description, content, thumbnail, images, video);
    }
}

let articles = []

async function run(month, year, firstRun){
    // functions in prismic.js file
    let masterRef = await getPrismicMasterRef();
    articles = await getArtciles(masterRef, month, year, firstRun );
    console.log(articles)
    appendArticles();
}

run(date.getMonth(), date.getFullYear(), true);

setTimeout(() => {
    title.classList.add('active');   
    setTimeout(() => {
        landing.classList.add('active');
    }, 1500)       
}, 500)