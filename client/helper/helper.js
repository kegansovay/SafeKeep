const handleError = (message) => {
    $("#errorMessage").text(message);
};

const redirect = (response) => {
    wondow.location = response.redirect;
};

const sendAjax = (type, action, data, success) => {
    $.ajax({
      cache: false,
      type: type,
      url: action,
      data: data,
      dataType: "json",
      success: success,
      error: (xhr, status, error) => {
        const messageObj = JSON.parse(xhr.responseText);
  
        handleError(messageObj.error);
      }
    });        
};

