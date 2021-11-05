const articleSlug = window.location.href.split('?')[1];
const imgColOne = document.querySelector('.col-one');
const imgColTwo = document.querySelector('.col-two');
const videoContainer = document.querySelector('.video-container');
const pictureModal = document.querySelector('.picture-modal');
const mainImage = document.querySelector('.main-image');
const articleTitle = document.querySelector('.article-title')
const articleContent = document.querySelector('.article-content');

async function run(){
    let masterRef = await getPrismicMasterRef();
    let article = await getSingleArticle(masterRef, articleSlug);
    let data = article.results[0];
    let images = data.data.images;
    let videoHTML = data.data.video.html;
    articleTitle.innerText = data.data.article_title[0].text

    for(let i = 0; i < data.data.content.length; i++){
        let p = document.createElement('p');
        p.innerText = data.data.content[i].text;
        articleContent.appendChild(p);
        console.log(p.innerText.length)
        if(p.innerText.length > 0){
            let br = document.createElement('br');
            articleContent.appendChild(br)
        }
        
    }

    if(videoHTML !== undefined){
        videoContainer.innerHTML = videoHTML;
    }else{
        videoContainer.remove();
    }
    
    let colOneHeight = 0;
    let colTwoHeight = 0;

    if(Object.keys(images[0].article_image).length > 0){
        images.forEach((img, idx) => {
            let imageEl = document.createElement('img');
            imageEl.classList.add('image-item')
            imageEl.src = `${img.article_image.url}`;
            if(idx === 0){
                imgColOne.appendChild(imageEl);
                colOneHeight += img.article_image.dimensions.height;
            }else if(colOneHeight > colTwoHeight){
                imgColTwo.appendChild(imageEl);
                colTwoHeight += img.article_image.dimensions.height;
            }
            else{
                imgColOne.appendChild(imageEl);
                colOneHeight += img.article_image.dimensions.height;
            }

            imageEl.addEventListener('click', () => {
               let {width, height} = imageEl.getBoundingClientRect();
                mainImage.src = imageEl.src;
                if(height > width){
                    mainImage.style.height = '80%';
                    mainImage.style.width = 'auto';
                }
                else if(width > height){
                    mainImage.style.width = '80%';
                    mainImage.style.height = 'auto';
                }else{
                    mainImage.style.width = '80%';
                    mainImage.style.height = 'auto';
                }
                pictureModal.classList.add('active');
            })
        })
    }   
}

pictureModal.addEventListener('click', () => {
    pictureModal.classList.remove('active');
})

run()