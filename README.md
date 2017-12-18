Our main view pages:
/views/jam_sessions/_display_page.html.erb
All modals in chat_messages,jam_sessions, sessions, and users
/views/creatives/_header.html.erb
/views/creatives/_navbar.html.erb
/views/creatives/_bg_primary.html.erb

# Follow The Music
*Built using Ruby on Rails for Pito Salas's 166b Capstone class at Brandeis University.*  

  * [What is this?](#what-is-this-)
  * [Try it yourself](#try-it-yourself)
  * [Some cool technologies](#some-cool-technologies)
    + [Google Maps Integration](#google-maps-integration)
    + [Search and Filters](#search-and-filters)
    + [Bootstrap Template](#bootstrap-template)
    + [Modals](#modals)
    + [Liking (Hearts)](#liking--hearts-)
    + [AWS and Paperclip for File Upload and Storage](#aws-and-paperclip-for-file-upload-and-storage)
      - [Profile Pictures](#profile-pictures)
      - [Audio Recording and Playback](#audio-recording-and-playback)
    + [Chat and Pusher Integration](#chat-and-pusher-integration)
    + [Songsterr API](#songsterr-api)
  * [Development, deployment and testing methodologies](#development--deployment-and-testing-methodologies)
  * [Database architecture](#database-architecture)
  * [Contact us](#contact-us)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>


## What is this?
Follow the Music is a tool to help people people find spontaneious jam sessions happening nearby. If you're looking to find new friends to play music with, want to get more involved in the local music scene, or publicize a small musical event you're hosting, you can hop on our app and post a new jam session or look up jam sessions happening near you.

You can open up the main page of the app and see a list of jam sessions happening near you. Feeling picky? You can search for jam sessions by host name, address, name / description of the jam session, genre, whether they are looking for players or listeners, or time of the session. Also, each jam session comes with a recording made by the host that gives you a flavor of they type of music that will be played there. 

Once you've found a jam session you want to go to, you can open up the modal for it and register to attend as a player or listener. From there you can chat with others who will be attending, and find music on our site that you can all play together. 

![alt text](https://i.imgur.com/eMwUkFa.png)
*The main page of Follow the Music, where you can see jam sessions listed and displayed on the map.*

![alt text](https://i.imgur.com/48HZ4Li.png)
*Our landing page.*

![alt text](https://i.imgur.com/AQW0Yuk.png)
*Our about page.*


![alt text](https://i.imgur.com/2qtgQJb.png)
*Our chat functionality.*

![alt text](https://i.imgur.com/RyUPy8z.png)
*A jam sessions info page.*

## Try it yourself

We talk below about how we made Follow the Music. If you just want to try it out, you can at this link: <https://www.follow-the-music-develop.herokuapp.com>

## Some cool technologies
As stated above, this app is built with Ruby on Rails. For this project we created the frontend, built with Bootstrap, CSS, jQuery, and JavaScript. We created a database schema for the backend, storing information about users, jam sessions, chats, and who is going to what session. Some particular tech integrations with Rails include: 

### Google Maps Integration
We used the `geocoder` and `gmaps4rails` gems, as well as JavaScript, to integrate a working map into our app. The map takes information about the current sessions available and displays markers according to the address of each jam session. It also takes information such as the session name and displays this on an infowindow when you click the appropriate map marker. 

### Search and Filters
The application has filters and search functionalities for the users to better navigate through the jam sessions. The user can search by hostname, name of the jam sessions, description of the jam sessions and address. The user can also filter the sessions by genre and time. This is done through querying in the database with the given search words and filters. 

### Bootstrap Template 
We used a Bootstrap template for the landing page and Bootstrap throughout the app in general to create a clean, consistent look. Lizzie went to many people with paper prototypes and similar websites to ask their opinions, and designed the front end of our website. 

### Modals
To aid with the simplicity of our app, we wanted a user flow that didn't involve hunting around through many different pages. For that, we implemented modals that are implemented as partials within the web app and called on various button or link clicks. This allows our app to just have two main pages -- the landing page and the main page that displays the jam sessions. 

### Liking (Hearts)
Users may 'like' jam sessions posted by other users, indicating that the jam session was enjoyable or interesting. This helps other users discover the most popular jam sessions going on around them. 


### AWS and Paperclip for File Upload and Storage  
We used Amazon Web Services and the `Paperclip` gem to upload and store files, including the following: 

#### Profile Pictures 
Users can upload images of themselves that are displayed on their profile page and when they host a jam session. 

#### Audio Recording and Playback
Users can record in-browser or upload audio files for each jam session that can be played back in-browser using p5.js and an HTML5 web player for audio playback. 

### Chat and Pusher Integration
Users can chat with others in the jam session, with messages being pushed to others in real time (without the need to reload the page) using the `Pusher` gem. The chats are specific to each jam session and allow guests to ask questions and for the various member to get know one another.

### Songsterr API 
The functionality of searching for chords and viewing them in the app without having to use another application is done by the Songsterr API. The API contains JSON files of every song and its chords. Our application sends a request to the API for the requested songs, gets the responses in JSON format, parses the JSON and displays it in a modal in the app.

## Development, deployment and testing methodologies
We deployed on Heroku, which automatically deployed from Github and utilized Codeship for quality control, based on a set of written unit tests. We used the `byebug` gem to debug our code.

## Database architecture
Here is a diagram of our database architecture: 

![alt text](https://i.imgur.com/zws6MRIl.png)

## Contact us 
You can reach out to the makers of this project at the following emails: 
* Deniz Amado - <denizamado95@gmail.com>
* Devi Acharya - <dacharya64@gmail.com>
* Abhishek Kulkarni - <abhishek@brandeis.edu>
* Lizzie Koshelev - <lizkosheleva@gmail.com>
