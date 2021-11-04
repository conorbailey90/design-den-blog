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
    console.log(data)
    articleTitle.innerText = data.data.article_title[0].text
    articleContent.innerText = data.data.content[0].text;
    if(videoHTML !== undefined){
        videoContainer.innerHTML = videoHTML;
    }else{
        videoContainer.remove();
    }
    
    let colOneHeight = 0
    let colTwoHeight = 0
    console.log(Object.keys(images[0].image).length === 0)
    if(Object.keys(images[0].image).length > 0){
        images.forEach((img, idx) => {
            console.log(img)
            let imageEl = document.createElement('img');
            imageEl.classList.add('image-item')
            imageEl.src = `${img.image.url}`;
            if(idx === 0){
                imgColOne.appendChild(imageEl);
                colOneHeight += img.image.dimensions.height;
            }else if(colOneHeight > colTwoHeight){
                imgColTwo.appendChild(imageEl);
                colTwoHeight += img.image.dimensions.height;
            }
            else{
                imgColOne.appendChild(imageEl);
                colOneHeight += img.image.dimensions.height;
            }
    
            imageEl.addEventListener('click', () => {
               let {width, height} = imageEl.getBoundingClientRect()
                console.log(width, height)
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