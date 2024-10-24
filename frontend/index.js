import { backend } from 'declarations/backend';

const blogPosts = document.getElementById('blog-posts');
const newPostButton = document.getElementById('new-post-button');
const newPostForm = document.getElementById('new-post-form');
const postTitleInput = document.getElementById('post-title');
const postAuthorInput = document.getElementById('post-author');
const submitPostButton = document.getElementById('submit-post');

let quill;

newPostButton.addEventListener('click', () => {
  newPostForm.style.display = newPostForm.style.display === 'none' ? 'block' : 'none';
  if (!quill) {
    quill = new Quill('#editor', {
      theme: 'snow'
    });
  }
});

submitPostButton.addEventListener('click', async () => {
  const title = postTitleInput.value;
  const author = postAuthorInput.value;
  const body = quill.root.innerHTML;

  try {
    await backend.addPost(title, body, author);
    postTitleInput.value = '';
    postAuthorInput.value = '';
    quill.setText('');
    loadPosts();
    newPostForm.style.display = 'none';
  } catch (error) {
    console.error("Error adding post:", error);
    alert("Failed to add post. Please try again.");
  }
});

async function loadPosts() {
  try {
    const posts = await backend.getPosts();
    blogPosts.innerHTML = '';
    posts.reverse().forEach(post => {
      const postElement = document.createElement('article');
      postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p class="author">By ${post.author}</p>
        <div class="post-body">${post.body}</div>
      `;
      blogPosts.appendChild(postElement);
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

loadPosts();


