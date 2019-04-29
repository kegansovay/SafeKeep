const handleDomo = (e) =>{
    e.preventDefault();
    
    sendAjax('POST', $("#credsForm").attr("action"), $("#credsForm").serialize(), function(){
        loadDomosFromServer();
    });
    
    return false;
};


const handleNote = (e) =>{
    e.preventDefault();

    sendAjax('POST', $("#noteForm").attr("action"), $("#noteForm").serialize(), function(){
        loadNotesFromServer();
    });
    return false;
};

const DomoForm = (props) => {
    return(
        <form id="credsForm" onKeyUp={handleDomoKeyup} onSubmit={handleDomo} name="credsForm" action="/maker" method="POST" class="credsForm">
              <label for="name">Name of site/application: </label>
              <input id="title" type="text" name="title" placeholder="ex: Amazon"/>
              <label for="username">Username or email: </label>
              <input id="username" type="text" name="username" placeholder=""/> <br/>
              <label for="password">Password: </label>
              <input id="password" type="text" name="password" placeholder=""/>
              <input type="hidden" name="_csrf" value={props.csrf} />
              
              <br/>
              <hr/>
              
              <input className=" btn btn-success" disabled="disabled" id="addButton" type="submit"   value="Add Credentials" />
        </form>
    );
};

const NoteForm = (props) => {
    return (
    <form id="noteForm" onSubmit={handleNote} onKeyUp={handleNoteKeyup} name="noteForm" action="/notes" method="POST" className="noteForm">
              <label for="name">Note Title: </label>
              <input id="notetitle" type="text" name="notetitle" />
              <br/>
              <label for="content">Note: </label> <br/>
              <textarea className="justify" rows="4" cols="50" id="content" name="content" ></textarea>
              
              <input type="hidden" name="_csrf" value={props.csrf} />
              
              <br/>
              <hr/>
              
              <input className=" btn btn-success" disabled="disabled" id="noteButton" type="submit"   value="Add Note" />
        </form>
    );
};


const DomoList = function(props) {
    
    if(props.domos.length == 0){
        return(
            <div className="p-5" id="cards">
      <h3 className="text-center">No entries yet</h3>
      </div>
            
        );
    }

    const domoNodes = props.domos.map(function(domo){
        return(
            <div className="card border-success mycard d-inline-block">
            <div className="card-body">
              <h3 className="card-title text-success">{domo.title}</h3>
              <p className="card-text"><b>Username: </b> {domo.username} </p>
              <p className="card-text d-inline"><b>Password: </b> 
                <div className="d-inline password black-text">
                  <p className="d-inline pass black">{domo.password} </p>
                  &nbsp; <i className="fa fa-eye eye " id="eye" onclick=""></i> 
                </div>
                
                
                </p>
              
               
            </div>
          </div>
        );
    });

    return (
        <div className="p-5" id="cards">
      {domoNodes}
      </div>
    );
};



const NoteList = function(props) {
   
    if(props.notes.length == 0){
        return(
            <div className="p-5" id="cards">
      <h3 className="text-center">No Notes yet</h3>
      </div>
            
        );
    }

    const noteNodes = props.domos.map(function(note){
        return(
            <div className="flip-container border-success" ontouchstart="this.classList.toggle('hover');">
            <div className="flippable appcon ac-bicycle">
              <div className="front border-success">
                {note.notetitle}
                
              </div>
              <div className="back border-success">
                <p className="note" >{note.content}</p>
              </div>
            </div>
          </div>
        );
    });

    return (
        <div className="p-5" id="cards">
      {noteNodes}
      </div>
    );
};

const loadDomosFromServer = () => {
    
    sendAjax('GET', '/getDomos', null, (data) => {
        
        ReactDOM.render(
            <DomoList domos={data.domos} />, document.querySelector("#content") 
        );
        
    });
};


const loadNotesFromServer = () => {
    
    sendAjax('GET', '/getNotes', null, (data) => {
        ReactDOM.render(
            <NoteList notes={data.notes} />, document.querySelector("#content") 
        );
        
    });
};


const setup = function(csrf) {

    const domoButton = document.querySelector("#domoButton");
    const noteButton = document.querySelector("#noteButton");

    domoButton.addEventListener("click", (e) => {
        e.preventDefault();
        //console.log("here 1");
        ReactDOM.render(
            <DomoForm csrf={csrf} />, document.querySelector("#addNew")  
          );
        //   ReactDOM.render(
        //     <DomoList domos={[]} />, document.querySelector("#content")  
        //   );
        loadDomosFromServer();
        return false;
    });

    noteButton.addEventListener("click", (e) => {
        e.preventDefault();
        ReactDOM.render(
            <NoteForm csrf={csrf} />, document.querySelector("#addNew")  
          );
        //   ReactDOM.render(
        //     <NoteList notes={[]} />, document.querySelector("#content")  
        //   );
        
        loadNotesFromServer();
        return false;
    });
    //console.log("here");
    ReactDOM.render(
        <DomoForm csrf={csrf} />, document.querySelector("#addNew")  
        );
        
    loadDomosFromServer(); //default



    

    

      
};



const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};




$(document).ready(function(){
    getToken();

});

const handleDomoKeyup = (event) => {
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
  
};

const handleNoteKeyup = (event) => {


    var title = $('form > input').val();
    var content = $('textarea#content').val();
  
  
    if(title == '' || content == ''){
      $('#noteButton').attr('disabled', 'disabled'); 
    }
    else if(title != '' && content != ''){
      $('#noteButton').removeAttr('disabled'); 
    }
  
};






//CHANGE PASSWORD SUBMIT
$("#changeForm").on("submit", (e) => {
    e.preventDefault();
  
    
  
  
    if($("#pass").val() !== $("#pass2").val()) {
      handleError("Passwords do not match");
      return false;           
    }
  
    sendAjax($("#changeForm").attr("action"), $("#changeForm").serialize());
  
    return false;
  });
  
  // PREVENT EMPTY INPUT FIELDS
  $('#changeForm').keyup(function() {
  
     
    var empty = false;
    $('form > input').each(function() {
     
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
  $(".flippable").click(function(){
    $(this).toggleClass("flipme");
  });
  
  //Hide/show password on click
  $(".password").click(function(){
    console.log("hi");
    $(this).find(".pass").toggleClass("black")
  });
  
  
  
    