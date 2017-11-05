/*
 * Charming - A front end framework built on top of Bootstrap 4 and jQuery 3.
 * Version v0.8.0
 * Copyright 2017 Alexander Rechsteiner
 * http://hackerthemes.com/charming
 */
// TODO: Needs to be refactored with data-toggle instead of IDs

$( document ).ready(function() {
  $(".dash-nav-toggler").click(function() {
    $("#dash-nav").toggleClass("show");
    $("#dash-app").toggleClass("hide");
  });
});

