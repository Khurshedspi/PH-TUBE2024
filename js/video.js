// timefunction
function getTimeString(time) {
  // get hour and rest seconds
  const hour = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  const minutes = parseInt(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;
  return `${hour} hour ${minutes} minute ${remainingSecond} second ago`;
}

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};

// fetch, load and show categories on html

// create loadCategories
const loadCategories = () => {
  //    fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log("eRror:", error));
};
// create loadVideos
const loadVideos = () => {
  //    fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log("eRror:", error));
};

const loadCategoryVideos = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(activeBtn);
      // active class remove
      removeActiveClass();

      // id er class active
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
      displayVideos(data.category);
    })
    .catch((error) => console.log(error));
};

const loadDetails = async (videoId) => {
    const url =`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.video);

};

const displayDetails = async (video) =>{
console.log(video);
};

// create displayVideos
const displayVideos = (videos) => {
  const videosContainer = document.getElementById("videos");
  videosContainer.innerHTML = "";

  if (videos.length == 0) {
    videosContainer.classList.remove("grid");
    videosContainer.innerHTML = `
        
        <div class = "min-h-[300px] w-full flex flex-col gap-5 justify-center items-center">
        <img src ="../images/Icon.png" />
        <h1 class ="text-center font-bold text-xl"> Oops!! Sorry, There is no content here
        </h1>
        </div>

        `;
    return;
  } else {
    videosContainer.classList.add("grid");
  }
  videos.forEach((video) => {
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
    
 <figure class ="h-[200px] relative">
    <img
      src= ${video.thumbnail}
      class ="h-full w-full object-cover"
      alt="video" />
${
  video.others.posted_date?.length === 0
    ? ""
    : `<span class ="absolute right-2 bottom-2 text-white text-xs bg-black rounded p-1">${getTimeString(
        video.others.posted_date
      )}</span>`
}

      
  </figure>
  <div class="px-0 py-3 flex gap-2">

  <div>
  <img class ="w-10 h-10 rounded-full object-cover" src ="${
    video.authors[0].profile_picture
  }" />
  </div>
  <div>
<h2 class ="font-bold">${video.title}</h2>
<div class ="flex items-center gap-2">
<p class ="text-gray-500">${video.authors[0].profile_name}</p>
${
  video.authors[0].verified === true
    ? `<img class ="h-4 w-4 " src ="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000" />`
    : ""
}
</div>
<p class ="text-gray-500">Views: ${video.others.views}  </p>
  </div>
  
  </div>
  <p> <button onclick = "loadDetails('${video.video_id}')" class = "btn btn-sm btn-error">Details</button></p>
    
    `;
    videosContainer.append(card);
  });
};
// create displayCategories

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");
  categories.forEach((item) => {
    // create a button
    const buttonContainer = document.createElement("button");
    // button.classList = 'btn';
    // button.innerText = item.category;
    buttonContainer.innerHTML = `
        
        <button id ="btn-${item.category_id}" onclick ="loadCategoryVideos(${item.category_id})" class ="btn category-btn">
        ${item.category}
        </button>
        
        `;
    // add buttonContainer to category container
    categoryContainer.append(buttonContainer);
  });
};

loadCategories();
loadVideos();
