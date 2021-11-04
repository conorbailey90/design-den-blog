const apiUrl = 'https://thedesigndenblog.prismic.io/api/v2/'

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
    console.log(firstRun)
    let response;
    if(firstRun){
        console.log('yo')
        response = await fetch(`${apiUrl}documents/search?ref=${masterRef}&q=[[at(document.type, "articl")][date.year(document.first_publication_date, ${year})]]`);
    }else{
        console.log('bitch')
        response = await fetch(`${apiUrl}documents/search?ref=${masterRef}&q=[[at(document.type, "articl")][date.month(document.first_publication_date, "${months[month]}")][date.year(document.first_publication_date, ${year})]]`);
    }
    // Fetch all articles using the  master reference number
    // let response = await fetch(`${apiUrl}documents/search?ref=${masterRef}&q=[[date.year(document.last_publication_date, 2021)]]`);
    let data = await response.json();
    return data.results;
}



async function getSingleArticle(masterRef, articleSlug){
    let response = await fetch(`${apiUrl}documents/search?ref=${masterRef}&q=[[at(my.articl.uid, "${articleSlug}")]]`);
    // console.log(response)
    let data = await response.json();
    // console.log(data)
    return data;
}

