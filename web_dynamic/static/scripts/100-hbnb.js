$(document).ready(function() {
    const selectedStates = {};
    const selectedCities = {};
  
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
  
    // Listen to changes on state checkboxes
    $('.states input[type="checkbox"]').change(function() {
      const stateId = $(this).data('id');
      const stateName = $(this).data('name');
      if ($(this).is(':checked')) {
        selectedStates[stateId] = stateName;
      } else {
        delete selectedStates[stateId];
      }
      updateLocations();
    });
  
    // Listen to changes on city checkboxes
    $('.cities input[type="checkbox"]').change(function() {
      const cityId = $(this).data('id');
      const cityName = $(this).data('name');
      if ($(this).is(':checked')) {
        selectedCities[cityId] = cityName;
      } else {
        delete selectedCities[cityId];
      }
      updateLocations();
    });
  
    // Function to update locations in the filter
    function updateLocations() {
      const selectedLocations = Object.values(selectedStates).concat(Object.values(selectedCities));
      $('.locations h4').text(selectedLocations.join(', '));
    }
  
    // Function to load places from API
    function loadPlaces() {
      const amenities = [];
      const states = Object.keys(selectedStates);
      const cities = Object.keys(selectedCities);
  
      $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ amenities: amenities, states: states, cities: cities }),
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