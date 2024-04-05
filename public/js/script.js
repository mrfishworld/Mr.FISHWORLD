document.addEventListener('DOMContentLoaded', function () {
  // Add scroll event listener
  window.addEventListener('scroll', function () {
    var header = document.querySelector('.main-header');
    var topSection = document.querySelector('.top-section');

    if (window.scrollY > topSection.clientHeight) {
      // Scrolled down
      header.classList.add('scrolled');
    } else {
      // At the top
      header.classList.remove('scrolled');
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  // Add click event listener for the menu button
  var menuBtn = document.querySelector('.menu .bx-menu');
  var mainNav = document.querySelector('.main-nav');

  menuBtn.addEventListener('click', function () {
    // Toggle the 'active' class on .main-nav
    mainNav.classList.toggle('active');

    // Toggle the icon between 'bx-menu' and 'bx-x'
    menuBtn.classList.toggle('bx-menu');
    menuBtn.classList.toggle('bx-x');
  });

  // Add click event listener for closing the menu
  var closeBtn = document.querySelector('.menu .bx-x');

  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      // Hide .main-nav
      mainNav.classList.remove('active');

      // Toggle the icon back to 'bx-menu'
      menuBtn.classList.add('bx-menu');
      menuBtn.classList.remove('bx-x');
    });
  }
});

/* Loop */
const loopContainer = document.querySelector('.loop');
  const originalText = loopContainer.querySelector('span').textContent;

  // Duplicate the text twice to create a loop
  loopContainer.innerHTML += `<span>${originalText}</span>`;
  loopContainer.innerHTML += `<span>${originalText}</span>`;

  // Adjust the animation duration based on the length of the text
  const textWidth = loopContainer.scrollWidth;
  const animationDuration = textWidth / 50; // Adjust the factor based on your preference

  // Apply the animation duration to the span elements
  const spanElements = loopContainer.querySelectorAll('span');
  spanElements.forEach(span => {
      span.style.animationDuration = `${animationDuration}s`;
  });

  /* Poping Video player */
  function openVideoPlayer() {
    // Display the video player container
    document.getElementById('videoPlayerContainer').style.display = 'block';
    }

    function closeVideoPlayer() {
        // Hide the video player container
        document.getElementById('videoPlayerContainer').style.display = 'none';
    }

    // Close the video player when clicking outside of it
    window.addEventListener('click', function (event) {
        if (event.target.classList.contains('video-player-container')) {
            closeVideoPlayer();
        }
  });

  /* carousel */
  $(document).ready(function(){
    $('.story-carousel').slick({
      
centerMode: true,
centerPadding: '60px',
slidesToShow: 3,
nextArrow: $('.next'),
prevArrow: $('.prev'),
responsive: [
  {
    breakpoint: 768,
    settings: {
      arrows: false,
      centerMode: true,
      centerPadding: '40px',
      slidesToShow: 2
    }
  },
  {
    breakpoint: 480,
    settings: {
      arrows: false,
      centerMode: true,
      centerPadding: '40px',
      slidesToShow: 1
    }
  }
]
    });

    $('.slider').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      centerMode: true,
      centerPadding: '60px',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });

    $('.venue-container').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      nextArrow: $('.next'),
      prevArrow: $('.prev'),
      responsive: [
      {
      breakpoint: 1024,
      settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
      }
      },
      {
      breakpoint: 900,
      settings: {
          slidesToShow: 2,
          slidesToScroll: 2
      }
      },
      {
      breakpoint: 580,
      settings: {
          slidesToShow: 1,
          slidesToScroll: 1
      }
      }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
      ]
    });
    
  });

 /* Overlay Form Adult */
 function openFormAdult() {
  document.getElementById("plan-adult").style.display = "flex";
}

function closeFormAdult() {
  document.getElementById("plan-adult").style.display = "none";
}

function submitFormAdult() {
  // Add your form submission logic here

  // After successful submission, close the form
  closeFormAdult();
}

// Consent
// Enable submit button when terms checkbox is checked
document.getElementById('termsCheckbox').addEventListener('change', function() {
  var submitButton = document.getElementById('submitButton');
  submitButton.disabled = !this.checked;
  if (this.checked) {
    submitButton.classList.remove('disabled');
  } else {
    submitButton.classList.add('disabled');
  }
});

// Consent
// Enable submit button when terms checkbox is checked
document.getElementById('termsCheckbox2').addEventListener('change', function() {
  var submitButton = document.getElementById('submitButton2');
  submitButton.disabled = !this.checked;
  if (this.checked) {
    submitButton.classList.remove('disabled');
  } else {
    submitButton.classList.add('disabled');
  }
});

// Consent
// Enable submit button when terms checkbox is checked
document.getElementById('termsCheckbox3').addEventListener('change', function() {
  var submitButton = document.getElementById('submitButton3');
  submitButton.disabled = !this.checked;
  if (this.checked) {
    submitButton.classList.remove('disabled');
  } else {
    submitButton.classList.add('disabled');
  }
});

/* Overlay Form Kid */
function openFormKid() {
  document.getElementById("plan-kid").style.display = "flex";
}

function closeFormKid() {
  document.getElementById("plan-kid").style.display = "none";
}

function submitFormKid() {
  // Add your form submission logic here

  // After successful submission, close the form
  closeFormKid();
}

/* Overlay Form School */
function openFormSchool() {
  document.getElementById("plan-school").style.display = "flex";
}

function closeForm() {
  document.getElementById("plan-school").style.display = "none";
}

function submitForm() {
  // Add your form submission logic here

  // After successful submission, close the form
  closeForm();
}


  /* Owl carousel */
  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 29,
    nav: false,
    dots: false,
    autoplay: true,
    smartSpeed: 1000,
    animateOut: 'fadeOut', 
    animateIn: 'fadeIn', 
    responsive: {
        0:{
            items:1
        },
        576:{
            items:1
        },
        768:{
            items:1
        },
        992:{
            items:1
        },
        1200:{
            items:1
        }
    }
});
    


 // Add event listener for scroll
 window.addEventListener('scroll', function () {
  // Get the current scroll position
  const scrollPosition = window.scrollY;

  // Get all post-info elements
  const postInfos = document.querySelectorAll('.post-info');

  // Loop through each post-info element
  postInfos.forEach(function (postInfo, index) {
      // Get the offsetTop of the post-info element
      const postInfoOffsetTop = postInfo.offsetTop;

      // Check if the post-info element is approximately in the middle of the screen
      if (
          scrollPosition >= postInfoOffsetTop - (window.innerHeight / 2) &&
          scrollPosition < postInfoOffsetTop + postInfo.offsetHeight - (window.innerHeight / 2)
      ) {
          // Remove the 'active' class from all post-info elements
          postInfos.forEach(function (p) {
              p.classList.remove('active');
          });

          // Add the 'active' class to the current post-info element
          postInfo.classList.add('active');
      }
  });
});

/* Pop up */

window.addEventListener('scroll', function() {
  var swimmingCoursesSection = document.getElementById('swimming-courses');
  var popup = document.getElementById('popup');

  var rect = swimmingCoursesSection.getBoundingClientRect();
  var popupShownBefore = localStorage.getItem('popupShownBefore');

  if (rect.top < window.innerHeight && rect.bottom >= 0 && !popupShownBefore) {
    // Show popup animation
    popup.style.display = 'block';
    // You can customize the animation here, e.g., fadeIn
    popup.classList.add('fadeIn');
  } else {
    // Hide popup animation
    popup.style.display = 'none';
    popup.classList.remove('fadeIn');
  }
});

document.getElementById('close-btn').addEventListener('click', function() {
  document.getElementById('popup').style.display = 'none';
  localStorage.setItem('popupShownBefore', true); 
});



 

      
  