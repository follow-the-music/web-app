// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap
//= require rails-ujs
//= require turbolinks
//= require underscore
//= require private_pub
//= requrie gmaps/google
//=require p5.min.js
//=require p5.sound.min.js
//=require p5.dom.min.js
//= require filterrific/filterrific-jquery
//= require_tree .
$(function() {
  // $("#list th a, #products .pagination a").live("click", function() {
  //   $.getScript(this.href);
  //   return false;
  // });
  // $("#jam_search input").keyup(function() {
  //   $.get($("#jam_search").attr("action"), $("#jam_search").serialize(), null, "script");
  //   return false;
  // });
  $("#name-search").keyup(function(){
     $("#jam-search").submit();
  });
  $("#jam-search").change(function(){
     $("#jam-search").submit();
  });
  $("#name-search").change(function(){
     $("#jam-search").submit();
  });
});
$(document).ready(function() {
  $('select').niceSelect();
});
