class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def hello
    render html: "hello, world!"
  end

  def display_map
    render html: '''
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            #map {
              height: 400px;
              width: 100%;
            }
          </style>
        </head>
        <body>
          <h3>My Google Maps Demo</h3>
          <div id="map"></div>
          <script>
            function initMap() {
              var uluru = {lat: -25.363, lng: 131.044};
              var map = new google.maps.Map(document.getElementById("map"), {
                zoom: 4,
                center: uluru
              });
              var marker = new google.maps.Marker({
                position: uluru,
                map: map
              });
            }
          </script>
          <script async defer
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCLQtBuY3_NLNF4UMAv1SLrTAsQR1I7mfM&callback=initMap">
          </script>
        </body>
      </html>
      '''
      .html_safe
  end
end
