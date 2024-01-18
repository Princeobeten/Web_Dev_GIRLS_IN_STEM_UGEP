// window.addEventListener("scroll", function() {
//     const navbar = document.querySelector(".navbar");
//     if (window.scrollY > 0) {
//         navbar.classList.add("sticky");
//     } else {
//         navbar.classList.remove("sticky");
//     }
// });



// Including  ext HTML
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("include-html");
      if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /* Remove the attribute, and call this function once more: */
            elmnt.removeAttribute("include-html");
            includeHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        /* Exit the function: */
        return;
      }
    }
}

includeHTML();


// JavaScript for lightbox functionality
const photoItems = document.querySelectorAll('.photo-book-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

photoItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        lightbox.style.display = 'block';
        lightboxImg.src = item.querySelector('img').src;
    });
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

// Your image sources
const images = [
  'res/img/photo grid/1.JPG',
  'res/img/photo grid/2.JPG',
  'res/img/photo grid/3.JPG',
  'res/img/photo grid/4.JPG',
  'res/img/photo grid/5.JPG',
  'res/img/photo grid/6.JPG',
  'res/img/photo grid/7.JPG',
  'res/img/photo grid/8.JPG'
];

const closeButton = document.querySelector('.close');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentIndex = 0;

// Function to display the image at a given index
function displayImage(index) {
  lightboxImg.src = images[index];
}

// Show the first image initially
displayImage(currentIndex);

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
  displayImage(currentIndex);
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
  displayImage(currentIndex);
});

closeButton.addEventListener('click', () => {
  lightbox.style.display = 'none';
});



// Select the button and the photo grid
const morePicturesBtn = document.getElementById('more-pictures-btn');
const photoGrid = document.querySelector('.photo-book-grid');

// Images to be added
const additionalImages = [
    'res/img/photo grid/9.JPG',
    'res/img/photo grid/10.JPG',
    'res/img/photo grid/11.JPG',
    'res/img/photo grid/12.JPG',
    'res/img/photo grid/13.JPG',
    'res/img/photo grid/14.JPG',
    'res/img/photo grid/15.JPG',
    'res/img/photo grid/16.JPG',
    'res/img/photo grid/17.JPG',
    'res/img/photo grid/18.JPG',
    'res/img/photo grid/19.JPG',
    'res/img/photo grid/20.JPG',
];

// Function to create new image elements and append them to the photo grid
function displayMorePictures() {
    additionalImages.forEach(imageSrc => {
        const newPhotoItem = document.createElement('div');
        newPhotoItem.classList.add('photo-book-item');
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = 'Additional Image';
        newPhotoItem.appendChild(img);
        photoGrid.appendChild(newPhotoItem);
    });
}

// Event listener for the "Display More Pictures" button
morePicturesBtn.addEventListener('click', () => {
    displayMorePictures();
    morePicturesBtn.style.display = 'none'; // Hide the button after displaying more pictures
});



// Assume you have an API endpoint to fetch blog posts
const blogPostsEndpoint = 'https://your-blog-api.com/posts';

// Fetch blog posts from the API
fetch(blogPostsEndpoint)
  .then((response) => response.json())
  .then((data) => {
    const blogPostsContainer = document.querySelector('.blog-posts');

    // Loop through the fetched data and create HTML for each blog post
    data.forEach((post) => {
      const postHTML = `
        <div class="blog-post">
          <h2>${post.title}</h2>
          <p>Date: ${post.date}</p>
          <p>${post.content}</p>
        </div>
      `;

      // Append the HTML for each blog post to the container
      blogPostsContainer.innerHTML += postHTML;
    });
  })
  .catch((error) => {
    console.error('Error fetching blog posts:', error);
  });

  // Select all the Read More buttons
const readMoreButtons = document.querySelectorAll('.read-more');

readMoreButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();

        const blogPost = this.closest('.blog-post');
        const shortDescription = blogPost.querySelector('.short-description');
        const fullDescription = blogPost.querySelector('.full-description');

        shortDescription.style.display = 'none';
        fullDescription.style.display = 'block';
    });
});
