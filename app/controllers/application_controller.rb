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
  def intro
    render html: '''
    <!DOCTYPE html>
    <html>
    <style>

      body{
        background-color:#E2DDEA;
      }
      #page-wrap {
          max-width: 1000px;
          max-heigth: 500px;
          position: fixed;
          top: 50%;
          left: 50%;
          margin-top:-25px;
          margin-left:-150px;
      }
      .myButton {
          border:none;
        -moz-box-shadow: 0px 10px 14px -7px #701630;
        -webkit-box-shadow: 0px 10px 14px -7px #701630;
        box-shadow: 0px 10px 14px -7px #701630;
        background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #964c53), color-stop(1, #7d3844));
        background:-moz-linear-gradient(top, #964c53 5%, #7d3844 100%);
        background:-webkit-linear-gradient(top, #964c53 5%, #7d3844 100%);
        background:-o-linear-gradient(top, #964c53 5%, #7d3844 100%);
        background:-ms-linear-gradient(top, #964c53 5%, #7d3844 100%);
        background:linear-gradient(to bottom, #964c53 5%, #7d3844 100%);
        background-color:#964c53;
        -moz-border-radius:13px;
        -webkit-border-radius:13px;
        border-radius:13px;
        display:inline-block;
        cursor:pointer;
        color:#ffffff;
        font-family:Verdana;
        font-size:20px;
        font-weight:bold;
        padding:13px 32px;
        text-decoration:none;
        text-shadow:0px 1px 0px #661c1c;
      }
      .myButton:hover {
        background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #7d3844), color-stop(1, #964c53));
        background:-moz-linear-gradient(top, #7d3844 5%, #964c53 100%);
        background:-webkit-linear-gradient(top, #7d3844 5%, #964c53 100%);
        background:-o-linear-gradient(top, #7d3844 5%, #964c53 100%);
        background:-ms-linear-gradient(top, #7d3844 5%, #964c53 100%);
        background:linear-gradient(to bottom, #7d3844 5%, #964c53 100%);
        background-color:#7d3844;
      }
      .myButton:active {
        position:relative;
        top:1px;
      }
    </style>
    <body>
    <div id="page-wrap">
      <button class="myButton">Play</button>
      &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
      <button class="myButton">Listen</button>
    </div>

    </body>
    </html>
    '''
    .html_safe
  end

end
