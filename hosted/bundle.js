"use strict";

var handleDomo = function handleDomo(e) {
    e.preventDefault();

    sendAjax('POST', $("#credsForm").attr("action"), $("#credsForm").serialize(), function () {
        loadDomosFromServer();
    });

    return false;
};

var handleNote = function handleNote(e) {
    e.preventDefault();

    sendAjax('POST', $("#noteForm").attr("action"), $("#noteForm").serialize(), function () {
        loadNotesFromServer();
    });
    return false;
};

var DomoForm = function DomoForm(props) {
    return React.createElement(
        "form",
        { id: "credsForm", onKeyUp: handleDomoKeyup, onSubmit: handleDomo, name: "credsForm", action: "/maker", method: "POST", "class": "credsForm" },
        React.createElement(
            "label",
            { "for": "name" },
            "Name of site/application: "
        ),
        React.createElement("input", { id: "title", type: "text", name: "title", placeholder: "ex: Amazon" }),
        React.createElement(
            "label",
            { "for": "username" },
            "Username or email: "
        ),
        React.createElement("input", { id: "username", type: "text", name: "username", placeholder: "" }),
        " ",
        React.createElement("br", null),
        React.createElement(
            "label",
            { "for": "password" },
            "Password: "
        ),
        React.createElement("input", { id: "password", type: "text", name: "password", placeholder: "" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("br", null),
        React.createElement("hr", null),
        React.createElement("input", { className: " btn btn-success", disabled: "disabled", id: "addButton", type: "submit", value: "Add Credentials" })
    );
};

var NoteForm = function NoteForm(props) {
    return React.createElement(
        "form",
        { id: "noteForm", onSubmit: handleNote, onKeyUp: handleNoteKeyup, name: "noteForm", action: "/notes", method: "POST", className: "noteForm" },
        React.createElement(
            "label",
            { "for": "name" },
            "Note Title: "
        ),
        React.createElement("input", { id: "notetitle", type: "text", name: "notetitle" }),
        React.createElement("br", null),
        React.createElement(
            "label",
            { "for": "content" },
            "Note: "
        ),
        " ",
        React.createElement("br", null),
        React.createElement("textarea", { className: "justify", rows: "4", cols: "50", id: "content", name: "content" }),
        React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("br", null),
        React.createElement("hr", null),
        React.createElement("input", { className: " btn btn-success", disabled: "disabled", id: "noteButton", type: "submit", value: "Add Note" })
    );
};

var DomoList = function DomoList(props) {

    if (props.domos.length == 0) {
        return React.createElement(
            "div",
            { className: "p-5", id: "cards" },
            React.createElement(
                "h3",
                { className: "text-center" },
                "No entries yet"
            )
        );
    }

    var domoNodes = props.domos.map(function (domo) {
        return React.createElement(
            "div",
            { className: "card border-success mycard d-inline-block" },
            React.createElement(
                "div",
                { className: "card-body" },
                React.createElement(
                    "h3",
                    { className: "card-title text-success" },
                    domo.title
                ),
                React.createElement(
                    "p",
                    { className: "card-text" },
                    React.createElement(
                        "b",
                        null,
                        "Username: "
                    ),
                    " ",
                    domo.username,
                    " "
                ),
                React.createElement(
                    "p",
                    { className: "card-text d-inline" },
                    React.createElement(
                        "b",
                        null,
                        "Password: "
                    ),
                    React.createElement(
                        "div",
                        { className: "d-inline password black-text" },
                        React.createElement(
                            "p",
                            { className: "d-inline pass black" },
                            domo.password,
                            " "
                        ),
                        "\xA0 ",
                        React.createElement("i", { className: "fa fa-eye eye ", id: "eye", onclick: "" })
                    )
                )
            )
        );
    });

    return React.createElement(
        "div",
        { className: "p-5", id: "cards" },
        domoNodes
    );
};

var NoteList = function NoteList(props) {

    if (props.notes.length == 0) {
        return React.createElement(
            "div",
            { className: "p-5", id: "cards" },
            React.createElement(
                "h3",
                { className: "text-center" },
                "No Notes yet"
            )
        );
    }

    var noteNodes = props.domos.map(function (note) {
        return React.createElement(
            "div",
            { className: "flip-container border-success", ontouchstart: "this.classList.toggle('hover');" },
            React.createElement(
                "div",
                { className: "flippable appcon ac-bicycle" },
                React.createElement(
                    "div",
                    { className: "front border-success" },
                    note.notetitle
                ),
                React.createElement(
                    "div",
                    { className: "back border-success" },
                    React.createElement(
                        "p",
                        { className: "note" },
                        note.content
                    )
                )
            )
        );
    });

    return React.createElement(
        "div",
        { className: "p-5", id: "cards" },
        noteNodes
    );
};

var loadDomosFromServer = function loadDomosFromServer() {

    sendAjax('GET', '/getDomos', null, function (data) {

        ReactDOM.render(React.createElement(DomoList, { domos: data.domos }), document.querySelector("#content"));
    });
};

var loadNotesFromServer = function loadNotesFromServer() {

    sendAjax('GET', '/getNotes', null, function (data) {
        ReactDOM.render(React.createElement(NoteList, { notes: data.notes }), document.querySelector("#content"));
    });
};

var setup = function setup(csrf) {

    var domoButton = document.querySelector("#domoButton");
    var noteButton = document.querySelector("#noteButton");

    domoButton.addEventListener("click", function (e) {
        e.preventDefault();
        //console.log("here 1");
        ReactDOM.render(React.createElement(DomoForm, { csrf: csrf }), document.querySelector("#addNew"));
        //   ReactDOM.render(
        //     <DomoList domos={[]} />, document.querySelector("#content")  
        //   );
        loadDomosFromServer();
        return false;
    });

    noteButton.addEventListener("click", function (e) {
        e.preventDefault();
        ReactDOM.render(React.createElement(NoteForm, { csrf: csrf }), document.querySelector("#addNew"));
        //   ReactDOM.render(
        //     <NoteList notes={[]} />, document.querySelector("#content")  
        //   );

        loadNotesFromServer();
        return false;
    });
    //console.log("here");
    ReactDOM.render(React.createElement(DomoForm, { csrf: csrf }), document.querySelector("#addNew"));

    loadDomosFromServer(); //default

};

var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});

var handleDomoKeyup = function handleDomoKeyup(event) {
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
};

var handleNoteKeyup = function handleNoteKeyup(event) {

    var title = $('form > input').val();
    var content = $('textarea#content').val();

    if (title == '' || content == '') {
        $('#noteButton').attr('disabled', 'disabled');
    } else if (title != '' && content != '') {
        $('#noteButton').removeAttr('disabled');
    }
};

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

//Make notes flip on click
$(".flippable").click(function () {
    $(this).toggleClass("flipme");
});

//Hide/show password on click
$(".password").click(function () {
    console.log("hi");
    $(this).find(".pass").toggleClass("black");
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
