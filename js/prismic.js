
const apiUrl = 'https://thedesignden.prismic.io/api/v2/'

const months = [
    'January', 
    'February', 
    'March', 
    'April', 
    'May', 
    'June', 
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

async function getPrismicMasterRef(){
    // Get the master API reference number in order to pull latest documents from Prismic.
    let response = await fetch(apiUrl)
    let data = await response.json();
    return data.refs.filter(reference => reference.id === 'master')[0].ref;
}

async function getArtciles(masterRef, month, year, firstRun){
    let response;
    if(firstRun){
        response = await fetch(`${apiUrl}documents/search?ref=${masterRef}&q=[[at(document.type, "article")]]`);
    }else{
        response = await fetch(`${apiUrl}documents/search?ref=${masterRef}&q=[[at(document.type, "article")][date.month(document.first_publication_date, "${months[month]}")][date.year(document.first_publication_date, ${year})]]`);
    }
    // Fetch all articles using the  master reference number
    // let response = await fetch(`${apiUrl}documents/search?ref=${masterRef}&q=[[date.year(document.last_publication_date, 2021)]]`);
    let data = await response.json();

    return data.results;
}



async function getSingleArticle(masterRef, articleSlug){
 
    let response = await fetch(`${apiUrl}documents/search?ref=${masterRef}&q=[[at(my.article.uid, "${articleSlug}")]]`);
    let data = await response.json();
  
    return data;
}

