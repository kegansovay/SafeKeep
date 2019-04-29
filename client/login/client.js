

const handleLogin = (e) => {
    e.preventDefault();

    sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);

    return false;
};

const handleSignup = (e) => {
    e.preventDefault();


    if($("#pass").val() !== $("#pass2").val()) {
      handleError("Passwords do not match");
      return false;           
    }

    sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);

    return false;
};


const LoginWindow = (props) => {
    return (
       
          <form id="loginForm" onKeyUp={handleLoginKeyUp} name="loginForm" action="/login" method="POST">
            <input id="user" type="text"  name="username" placeholder="username"/>
            <input id="pass" type="password"  name="pass" placeholder="password"/>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input type="submit" id="loginButton" disabled="disabled" class="fadeIn btn btn-success" value="Log In"/>
          </form>
       

    );
};


const SignupWindow = (props) => {
    
   
    return (

          <form id="signupForm" onKeyUp={handleSignupKeyUp} name="signupForm" action="/signup" method="POST">
            <input id="user" type="text"  name="username" placeholder="username"/>
            <input id="pass" type="password"  name="pass" placeholder="password"/>
            <input id="pass2" type="password"  name="pass2" placeholder="re-enter password"/>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input type="submit" id="signupButton" disabled="disabled" class="fadeIn btn btn-success" value="Sign up"/>
          </form>

    );
};

const handleSignupKeyUp = (event) => {
    var empty = false;
    $('form > input').each(function() {
     
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

const handleLoginKeyUp = (event) => {
    var empty = false;
    $('form > input').each(function() {
     
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

const createLoginWindow = (csrf) => {
    ReactDOM.render(
        <LoginWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};
const createSignupWindow = (csrf) => {
    ReactDOM.render(
        <SignupWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};


const setup = (csrf) => {
    const loginButton = document.querySelector("#toploginButton");
    const signupButton = document.querySelector("#topsignupButton");

    signupButton.addEventListener("click", (e) => {
        e.preventDefault();
        createSignupWindow(csrf);
        return false;
    });

    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        createLoginWindow(csrf);
        return false;
    });
    createLoginWindow(csrf); //default
};


const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function(){
    getToken();

    //console.log(document.querySelector("#loginForm"));


});




    // PREVENT EMPTY INPUT FIELDS
    $('#signupForm').keyup(function() {
        
   
        var empty = false;
        $('form > input').each(function() {
         
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
    
      $('#loginForm').keyup(function() {
    
       
        var empty = false;
        $('form > input').each(function() {
         
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




