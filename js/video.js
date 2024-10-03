// fetch, load and show categories on html 

// create loadCategories
const loadCategories = () => {
//    fetch the data 
fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
.then(res => res.json())
.then(data => displayCategories(data.categories))
.catch(error => console.log('eRror:', error))
}
// create loadVideos
const loadVideos = () => {
//    fetch the data 
fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
.then(res => res.json())
.then(data => displayVideos(data.videos))
.catch(error => console.log('eRror:', error))
}

// create displayVideos 
const displayVideos = (videos) =>{
    const videosContainer = document.getElementById('videos');
   videos.forEach((video) =>{
   
    const card = document.createElement( 'div');
    card.classList = 'card card-compact';
    card.innerHTML = `
    
 <figure class ="h-[200px] relative">
    <img
      src= ${video.thumbnail}
      class ="h-full w-full object-cover"
      alt="video" />
      <span class ="absolute right-2 bottom-2 text-white bg-black rounded p-1">${video.others.posted_date}</span>
  </figure>
  <div class="px-0 py-3 flex gap-2">

  <div>
  <img class ="w-10 h-10 rounded-full object-cover" src ="${video.authors[0].profile_picture}" />
  </div>
  <div>
<h2 class ="font-bold">${video.title}</h2>
<div class ="flex items-center gap-2">
<p class ="text-gray-500">${video.authors[0].profile_name}</p>
${video.authors[0].verified === true ? `<img class ="h-4 w-4 " src ="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000" />`: ''}
</div>
<p class ="text-gray-500">Views: ${video.others.views}  </p>
  </div>
  
  </div>
    
    `
    videosContainer.append(card);
   })
}
// create displayCategories

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories');
    categories.forEach((item) => {
        // create a button
        const button = document.createElement('button');
        button.classList = 'btn';
        button.innerText = item.category;
        // add button to category container 
        categoryContainer.append(button);
    })
}




loadCategories()
loadVideos()