"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
};

var count = 0;

var sendAjax = function sendAjax(action, data) {
  $.ajax({
    cache: false,
    type: "POST",
    url: action,
    data: data,
    dataType: "json",
    success: function success(result, status, xhr) {

      window.location = result.redirect;
    },
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);

      handleError(messageObj.error);
    }
  });
};

$(document).ready(function () {

  //SUBMIT SIGNUP
  $("#signupForm").on("submit", function (e) {
    e.preventDefault();

    if ($("#pass").val() !== $("#pass2").val()) {
      handleError("Passwords do not match");
      return false;
    }

    sendAjax($("#signupForm").attr("action"), $("#signupForm").serialize());

    return false;
  });

  // PREVENT EMPTY INPUT FIELDS
  $('#signupForm').keyup(function () {

    var empty = false;
    $('form > input').each(function () {

      if ($(this).val() == '') {
        empty = true;
      }
    });

    if (empty) {
      $('#signupButton').attr('disabled', 'disabled');
    } else {
      $('#signupButton').removeAttr('disabled');
    }
  });

  // SUBMIT LOGIN
  $("#loginForm").on("submit", function (e) {

    e.preventDefault();

    sendAjax($("#loginForm").attr("action"), $("#loginForm").serialize());

    return false;
  });

  // PREVENT EMPTY INPUT FIELDS
  $('#loginForm').keyup(function () {

    var empty = false;
    $('form > input').each(function () {

      if ($(this).val() == '') {
        empty = true;
      }
    });

    if (empty) {
      $('#loginButton').attr('disabled', 'disabled');
    } else {
      $('#loginButton').removeAttr('disabled');
    }
  });

  //ADD NEW CREDENTIAL
  $("#credsForm").on("submit", function (e) {

    e.preventDefault();

    sendAjax($("#credsForm").attr("action"), $("#credsForm").serialize());

    $('#createModal').modal('hide');

    return false;
  });

  // PREVENT EMPTY INPUT FIELDS
  $('#credsForm').keyup(function () {

    var empty = false;
    $('form > input').each(function () {

      if ($(this).val() == '') {
        empty = true;
      }
    });

    if (empty) {
      $('#addButton').attr('disabled', 'disabled');
    } else {
      $('#addButton').removeAttr('disabled');
    }
  });

  //CHANGE PASSWORD SUBMIT
  $("#changeForm").on("submit", function (e) {
    e.preventDefault();

    if ($("#pass").val() !== $("#pass2").val()) {
      handleError("Passwords do not match");
      return false;
    }

    sendAjax($("#changeForm").attr("action"), $("#changeForm").serialize());

    return false;
  });

  // PREVENT EMPTY INPUT FIELDS
  $('#changeForm').keyup(function () {

    var empty = false;
    $('form > input').each(function () {

      if ($(this).val() == '') {
        empty = true;
      }
    });

    if (empty) {
      $('#changeButton').attr('disabled', 'disabled');
    } else {
      $('#changeButton').removeAttr('disabled');
    }
  });

  //ADD NEW NOTE SUMBIT
  $("#noteForm").on("submit", function (e) {

    e.preventDefault();

    sendAjax($("#noteForm").attr("action"), $("#noteForm").serialize());

    $('#createModal').modal('hide');

    return false;
  });

  // PREVENT EMPTY INPUT FIELDS
  $('#noteForm').keyup(function () {

    var title = $('form > input').val();
    var content = $('textarea#content').val();

    if (title == '' || content == '') {
      $('#noteButton').attr('disabled', 'disabled');
    } else if (title != '' && content != '') {
      $('#noteButton').removeAttr('disabled');
    }
  });

  //Make notes flip on click
  $(".flippable").click(function () {
    $(this).toggleClass("flipme");
  });

  //Hide/show password on click
  $(".password").click(function () {
    console.log("hi");
    $(this).find(".pass").toggleClass("black");
  });
});
