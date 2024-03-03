

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
    <div class="avatar">
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
      <h3 class="font-mulish font-bold text-[20px]">${post.title}</h3>
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
          <h5>${post.view_count}</h5>
        </div>
        <div class="time flex space-x-5">
          <span><img src="./images/clock.svg" alt=""></span>
          <h5>${post.posted_time}</h5>
        </div>
      </div>
      <div class="side-two bg-green-500 p-2 rounded-full">
        <span><img src="./images/mail.svg" alt=""></span>
      </div>
    </div>
  </div>`;
    postsContainer.appendChild(postDive);
  });
};

const searchBtn = () => {
  const searchInput = document.getElementById('search-field');
  const searchvalue = searchInput.value
  console.log(searchvalue);
  loadData(searchvalue);
}


loadData()