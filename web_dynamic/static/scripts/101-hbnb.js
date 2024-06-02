$(document).ready(function() {
    let reviewsVisible = false;
  
    // Check API status
    $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    });
  
    // Load places from API initially
    loadPlaces();
  
    // Toggle reviews on button click
    $('#toggle_reviews').click(function() {
      reviewsVisible = !reviewsVisible;
      if (reviewsVisible) {
        $(this).text('hide');
        loadReviews();
      } else {
        $(this).text('show');
        $('.reviews ul').empty();
      }
    });
  
    // Function to load places from API
    function loadPlaces() {
      // API request for places
    }
  
    // Function to load reviews from API
    function loadReviews() {
      // API request for reviews
      // Append reviews to .reviews ul
    }
  });