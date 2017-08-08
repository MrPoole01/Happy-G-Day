const url = '/api/v1';

$(document).ready(() => {
  $.get(url + '/users').then(inititiatePage);
});

function inititiatePage(data) {
  $('#nav').append(nav);
  $('#modal').append(modal);
  $('#commentModal').append(commentModal);
  $('#deleteModal').append(deleteModal);
  verifyToken()
  calendar(data);


  getComments(data[0], 'profiles')

  let usersTime = data.map((e)=>{
    var today = new Date();
    var bday = new Date(`${e.birthday.slice(0,6)}/${new Date().getFullYear()}`);
    var nextBday = new Date(`${e.birthday.slice(0,6)}/${new Date().getFullYear() +1}`);
    if (bday - today < 0 ) {
      return nextBday - today;
  }else {
    return bday - today;
  }
});

  $('footer').append(footer);
  $("#myBtn1").click(function(event) {
    event.preventDefault();
    $('.signUpError').empty();
    $('.signUpError').css('visibility', 'hidden');
    $("#myModal").modal();
  })
  $("#myBtn2").click(function(event) {
    event.preventDefault();
    $('.logInError').empty();
    $('.logInError').css('visibility', 'hidden');
    $("#myModal2").modal();
  });
  $("#signUpButton").click(signUp)
  $("#loginButton").click((event) => {
    event.preventDefault();
    let data = {
      name: $('#logInUsr').val(),
      password: $('#logInPwd').val()
    }
    $.post(url + '/password', data).then((data) => {
      if(data.success == true) {
        logIn(data.userId)
      } else {
        $('.logInError').empty().append(data.message)
        $('.logInError').css('visibility', 'visible')
      }
    })
  })
  $('#commentModalBtn').click(function(event){
    console.log("hello");
    event.preventDefault();
    let loggedInUser = JSON.parse(localStorage.getItem('currUser'))
    if (loggedInUser) {
      let comment = $('#comment').val();
      let birthday_user_id = $('#newCommentId').data('profileUser');
      let comment_user_id = $('#newCommentId').data('currUser');
      postComments(comment, birthday_user_id, comment_user_id)
    } else {
      $('.signUpError').empty();
      $('.signUpError').css('visibility', 'hidden');
      $("#myModal").modal();
    }
  });

  $("#deleteModalBtn").click(function(deleteEvent){
    deleteComment($('#commentId').data('commentidnumber'))
  });
  $("#updateModalBtn").click(function(Event){
    updateComment($('#commentUpdate').val() ,$('#commentId').data('commentidnumber'))
    console.log($('#commentUpdate').val() ,$('#commentId').data('commentidnumber'));
  });
  $("#logOutButton").click((event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('currUser');
    window.location.reload(true);
  })
}
