$(document).ready(function() {
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
  
    // Filter places on button click
    $('#filter_btn').click(function() {
      loadPlaces();
    });
  
    // Function to load places from API
    function loadPlaces() {
      const amenities = [];
      $('input[type="checkbox"]:checked').each(function() {
        amenities.push($(this).data('id'));
      });
  
      $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ amenities: amenities }),
        success: function(data) {
          $('.places').empty();
          for (const place of data) {
            $('.places').append(`
              <article>
                <div class="title_box">
                  <h2>${place.name}</h2>
                  <div class="price_by_night">$${place.price_by_night}</div>
                </div>
                <div class="information">
                  <div class="max_guest">${place.max_guest} Guest${place.max_guest != 1 ? 's' : ''}</div>
                  <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms != 1 ? 's' : ''}</div>
                  <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms != 1 ? 's' : ''}</div>
                </div>
                <div class="user">
                  Owner: ${place.user_id}
                </div>
                <div class="description">
                  ${place.description}
                </div>
              </article>
            `);
          }
        }
      });
    }
  });
  
  
  
  
  
  
  
  