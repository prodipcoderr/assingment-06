const loadData = async (searchvalue) => {
  if (searchvalue) {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchvalue}`
    );
    const data = await response.json();
    const allPosts = data.posts;
    displayPosts(allPosts);
  } else {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/retro-forum/posts`
    );
    const data = await response.json();
    const allPosts = data.posts;
    displayPosts(allPosts);
  }
};

const displayPosts = (post) => {
  const postsContainer = document.getElementById('discuss-post');
  postsContainer.textContent = '';
  post.forEach((post) => {
    const postDive = document.createElement('div');
    postDive.classList = `posts-section bg-[#797DFC10] border rounded-md border-purple-400 p-9 flex gap-10 mb-4 w-full`;
    postDive.innerHTML = `
    <div class="author-image">
    <div class="avatar relative">
    <div id="${post.id}" class="absolute w-4 h-4 z-10 right-[-08px] top-[-05px] border-2 rounded-full"></div>
      <div class="w-24 rounded">
        <img src="${post.image}" />
      </div>
    </div>
  </div>

  <div class="post-info w-full space-y-4">
    <div class="catagory-author-info flex space-x-4">
      <div class="catagory">
        <h3 class="font-inter font-medium text-[14px]"># ${post.category}</h3>
      </div>
      <div class="author">
        <h3 class="font-inter font-medium text-[14px]">Author: ${post.author.name}</h3>
      </div>
    </div>
    <div class="post-title">
      <h3 id="title" class="font-mulish font-bold text-[20px]">${post.title}</h3>
    </div>
    <div class="post-info-text">
      <p class="font-inter font-normal text-[16px]">${post.description}</p>
    </div>
    <hr class="border border-dashed">
    <div class="post-viewers-list flex justify-between">
      <div class="side-one flex space-x-5">
        <div class="message flex space-x-5">
          <span><img src="./images/message-square.svg" alt=""></span>
          <h5>${post.comment_count}</h5>
        </div>
        <div class="watch flex space-x-5">
          <span><img src="./images/eye.svg" alt=""></span>
          <h5 id="view-count">${post.view_count}</h5>
        </div>
        <div class="time flex space-x-5">
          <span><img src="./images/clock.svg" alt=""></span>
          <h5>${post.posted_time}</h5>
        </div>
      </div>
      <div class="side-two bg-green-500 p-2 rounded-full">
        <span onclick= "showRead('${post.title}',${post.view_count})" class="cursor-pointer"><img src="./images/mail.svg" alt=""></span>
      </div >
    </div >
  </div > `;
    postsContainer.appendChild(postDive);

    const postActive = post.isActive;
    activePost(postActive, post.id);
  });
};

const showRead = (title, views) => {
  const readTitle = title;
  const readViewCount = views;

  const readBoxContainer = document.getElementById('read-post-section');
  const readDivBox = document.createElement('div');

  readDivBox.classList = `flex justify-between p-4 bg-gray-200 mt-2 rounded-xl`;
  readDivBox.innerHTML = `
  <div class="read-title">
    <h5 class="font-mulish font-[700]">${readTitle}</h5>
  </div>
    <div class="read-view-acount flex space-x-1">
    <img src="./images/eye.svg" alt=""></span> 
    <h5>${readViewCount}</h5></div>
  `;
  readBoxContainer.appendChild(readDivBox);
  addItem();
};

let sum = 0;
const addItem = () => {
  sum += 1;
  const count = document.getElementById('read-count');
  count.innerText = sum;
};

const activePost = (active, id) => {
  const activePost = document.getElementById(id);
  if (active) {
    activePost.classList.add('bg-green-700');
  } else {
    activePost.classList.add('bg-red-700');
  }
};

const searchBtn = () => {
  const searchInput = document.getElementById('search-field');
  const searchvalue = searchInput.value;
  console.log(searchvalue);
  loadData(searchvalue);
};

//  Latest post fetch api here
const latestPost = async () => {
  const dataRes = await fetch(
    'https://openapi.programming-hero.com/api/retro-forum/latest-posts'
  );
  const latestData = await dataRes.json();
  latestDataShow(latestData);
};

const latestDataShow = (latestPostData) => {
  const latestPosts = document.getElementById('latest-post-card');
  latestPostData.forEach((post) => {
    console.log(post);
    const latestPostsCard = document.createElement('div');
    latestPostsCard.classList = `card p-5 border`;
    latestPostsCard.innerHTML = `

    <div class="card-images w-full h-72 bg-green-200 overflow-hidden rounded-xl">
    <img class="w-full h-full" src="${post.cover_image}" alt="">
     </div>
              <div class="date-section mt-5 mb-5">
                <h3>${
                  post.author.posted_date
                    ? post.author.posted_date
                    : 'No publish date'
                }</h3>
              </div>
              <div class="card-title">
                <h3 class="font-mulish font-bold">${post.title}</h3>
              </div>
              <div class="paragraph mt-4 mb-6">
                <p>${post.description}</p>
              </div>
              <div class="users flex gap-3 items-center">
                <div class="user-image">
                  <div class="avatar">
                    <div class="w-12 rounded-full">
                      <img src="${post.profile_image}" />
                    </div>
                  </div>
                </div>
                <div class="user-info">
                  <h3 class="font-mulish font-bold">${post.author.name}</h3>
                  <h3>${
                    post.author.designation
                      ? post.author.designation
                      : 'Unknown Designation'
                  }</h3>
                </div>
              </div>
    `;
    latestPosts.appendChild(latestPostsCard);
  });
};

loadData();
latestPost();
