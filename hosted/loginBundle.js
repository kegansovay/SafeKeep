"use strict";

var handleLogin = function handleLogin(e) {
    e.preventDefault();

    sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);

    return false;
};

var handleSignup = function handleSignup(e) {
    e.preventDefault();

    if ($("#pass").val() !== $("#pass2").val()) {
        handleError("Passwords do not match");
        return false;
    }

    sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);

    return false;
};

var LoginWindow = function LoginWindow(props) {
    return React.createElement(
        "form",
        { id: "loginForm", onKeyUp: handleLoginKeyUp, name: "loginForm", action: "/login", method: "POST" },
        React.createElement("input", { id: "user", type: "text", name: "username", placeholder: "username" }),
        React.createElement("input", { id: "pass", type: "password", name: "pass", placeholder: "password" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { type: "submit", id: "loginButton", disabled: "disabled", "class": "fadeIn btn btn-success", value: "Log In" })
    );
};

var SignupWindow = function SignupWindow(props) {

    return React.createElement(
        "form",
        { id: "signupForm", onKeyUp: handleSignupKeyUp, name: "signupForm", action: "/signup", method: "POST" },
        React.createElement("input", { id: "user", type: "text", name: "username", placeholder: "username" }),
        React.createElement("input", { id: "pass", type: "password", name: "pass", placeholder: "password" }),
        React.createElement("input", { id: "pass2", type: "password", name: "pass2", placeholder: "re-enter password" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { type: "submit", id: "signupButton", disabled: "disabled", "class": "fadeIn btn btn-success", value: "Sign up" })
    );
};

var handleSignupKeyUp = function handleSignupKeyUp(event) {
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
};

var handleLoginKeyUp = function handleLoginKeyUp(event) {
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
};

var createLoginWindow = function createLoginWindow(csrf) {
    ReactDOM.render(React.createElement(LoginWindow, { csrf: csrf }), document.querySelector("#content"));
};
var createSignupWindow = function createSignupWindow(csrf) {
    ReactDOM.render(React.createElement(SignupWindow, { csrf: csrf }), document.querySelector("#content"));
};

var setup = function setup(csrf) {
    var loginButton = document.querySelector("#toploginButton");
    var signupButton = document.querySelector("#topsignupButton");

    signupButton.addEventListener("click", function (e) {
        e.preventDefault();
        createSignupWindow(csrf);
        return false;
    });

    loginButton.addEventListener("click", function (e) {
        e.preventDefault();
        createLoginWindow(csrf);
        return false;
    });
    createLoginWindow(csrf); //default
};

var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();

    //console.log(document.querySelector("#loginForm"));

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
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
};

var redirect = function redirect(response) {
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {

  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      console.warn(xhr.responseText);
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
