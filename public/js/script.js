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
      $('.carousel').slick({
        
  centerMode: true,
  centerPadding: '60px',
  slidesToShow: 3,
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
      
    });

    /* Overlay Form */
    function openForm() {
      document.getElementById("modal").style.display = "flex";
    }
  
    function closeForm() {
      document.getElementById("modal").style.display = "none";
    }
  
    function submitForm() {
      // Add your form submission logic here
  
      // After successful submission, close the form
      closeForm();
    }
      
  