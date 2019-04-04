const handleError = (message) => {
  $("#errorMessage").text(message);
  //$("#domoMessage").animate({width:'toggle'},350);
}

const sendAjax = (action, data) => {
  $.ajax({
    cache: false,
    type: "POST",
    url: action,
    data: data,
    dataType: "json",
    success: (result, status, xhr) => {
      //$("#domoMessage").animate({width:'hide'},350);

      window.location = result.redirect;
    },
    error: (xhr, status, error) => {
      const messageObj = JSON.parse(xhr.responseText);

      handleError(messageObj.error);
    }
  });        
}

$(document).ready(() => {
  
  $("#signupForm").on("submit", (e) => {
    e.preventDefault();

    //$("#domoMessage").animate({width:'hide'},350);

    if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
      handleError("RAWR! All fields are required");
      return false;
    }

    if($("#pass").val() !== $("#pass2").val()) {
      handleError("RAWR! Passwords do not match");
      return false;           
    }

    sendAjax($("#signupForm").attr("action"), $("#signupForm").serialize());

    return false;
  });

  $("#loginForm").on("submit", (e) => {
    
    e.preventDefault();

    
    //$("#domoMessage").animate({width:'hide'},350);

    if($("#user").val() == '' || $("#pass").val() == '') {
      handleError("RAWR! Username or password is empty");
      return false;
    }

    sendAjax($("#loginForm").attr("action"), $("#loginForm").serialize());

    return false;
  });
  
  $("#credsForm").on("submit", (e) => {
    
    e.preventDefault();

    //$("#domoMessage").animate({width:'hide'},350);


    sendAjax($("#credsForm").attr("action"), $("#credsForm").serialize());

    $('#createModal').modal('hide');

    return false;
  });


 
$('#credsForm').keyup(function() {

   
    var empty = false;
    $('form > input').each(function() {
     
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


  

  
});

function myFunction() {
  var x = document.getElementById("myInput");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}





