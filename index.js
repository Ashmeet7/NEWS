const apikey = "970b592d542b4c71a760a804ff89b403";
const blogcontainer = document.getElementById('blog-container');
const searchfield = document.getElementById('search-input');
const searchbutton = document.getElementById('search-button');

randomnews = async () => {
  try{
    const apiurl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apikey}`
    const response = await fetch(apiurl);
    const data = await response.json();
    return data.articles;
  }
  catch(error){
    console.log(`error occured while fetching new ${error}`)
    return []
  }
}

const randomnewsquerry = async (query) => {
   try{
    const apiurl = `https://newsapi.org/v2/top-headlines?country=us&q=${query}&pageSize=10&apikey=${apikey}`
    const response = await fetch(apiurl);
    const data = await response.json();
    return data.articles;
  }
  catch(error){
    console.log(`error occured while fetching new ${error}`)
    return []
  } 
}

searchbutton.addEventListener('click', async () => {
  const query = searchfield.value.trim();
  if(query!==""){
    try{
      const artciles = await randomnewsquerry(query);
      displayblog(artciles);
    }
    catch(error){
      console.log("error occured while fetching ", error);
    }
  }
})

const displayblog = (articles) => {
  console.log(articles);
  articles.forEach((article)=> {
    const blogcard = document.createElement('div');
    blogcard.classList.add('blog-card');
    const img = document.createElement('img'); 
    img.src = article.urlToImage;
    img.alt = article.title;
    const title = document.createElement('h1');
    const articletitle = article.title.length > 30 ? article.title.slice(0,30) + '....' : article.title;
    title.textContent = articletitle; 
    const description = document.createElement('p');
    const articledescription = article.description.length > 170 ? article.description.slice(0,170) + '....' : article.description;
    description.textContent = articledescription;

    blogcard.appendChild(img);
    blogcard.appendChild(title);
    blogcard.appendChild(description);
    blogcontainer.appendChild(blogcard);
    blogcard.addEventListener('click', () => {
      window.open(article.url, "_blank");
    });
  });
}

(async () => {
  try{
    const articles = await randomnews();
    displayblog(articles);
  }
  catch(error){
    console.log(`an error occoured while fetching news the error is ${error}`);
  }
})();
