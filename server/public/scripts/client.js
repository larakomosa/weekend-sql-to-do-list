$(document).ready(onReady);
console.log('jquery connected'); //confirming JQuery connection

function onReady() {
  $('#submit-Task').on('click', sendTask); //listens for submit click, sends data to sendTask function
  $('.taskList').on('click', '.js-btn-delete', deleteData); //listens for delete click, sends data to deleteData function
  $('.taskList').on('click', '.js-btn-complete', completeTask); ////listens for complete click, sends data to deleteData function
  getTaskData();
}

function sendTask() {
  const taskObject = {
    //declare taskObject. Complete status is FALSE by default
    task: $('#task').val(),
    completed: false,
  };
  $('#task').val(''); //empties task fields
  postTaskData(taskObject); //sends data to post function
}
function postTaskData(taskObject) {
  $.ajax({
    type: 'POST',
    url: '/tasks',
    data: taskObject, //sends taskObject data to server
  })
    .then(function (response) {
      getTaskData(); //sends data to get function
    })
    .catch(function (err) {
      console.log('Post Error:', err); //indicates error
      alert('Sorry, there was adding your task');
    });
}

function getTaskData() {
  $.ajax({
    type: 'GET',
    url: '/tasks',
  })
    .then(function (response) {
      console.log('GET', response);
      render(response); //sends info to be rendered to DOM
    })
    .catch((err) => {
      console.log('Get Error', err); //indicates error
      alert('Sorry, there was a problem retrieving your tasks');
    });
}

function deleteData() {
  const id = $(this).data('id-task'); //targets ID of field where delete button was clicked
  $.ajax({
    method: 'DELETE',
    url: `/tasks/${id}`, //sends ID of targeted task to server
  })
    .then((deleteMessage) => {
      getTaskData();
    })
    .catch((err) => {
      console.log('Delete Error', err); //indicates error
      alert('Sorry, there was a problem deleting your task');
    });
}

function completeTask() {
  const Num = $(this).data('id-complete');
  console.log('id', Num); //checks id prior to if statement
  const $id = $(this);
  let Completed2 = $id.data('complete');
  if (Completed2 == false) {
    Completed2 = true;
  }
  putComplete(Num, Completed2); //sends new data to PUT function
}

function putComplete(Num, Completed2) {
  console.log(Num, Completed2); //check to ensure id and status were adjusted in completeTask function and sent to PUT collection correctly.
  $.ajax({
    url: `/tasks/complete/${Num}`, //specific ID of item being updated
    type: 'PUT',
    data: { completed: Completed2 }, //status of item being updated
  })
    .then(() => {
      getTaskData(); //sends info to GET
    })
    .catch((err) => {
      console.log('Put Error:', err); //indicates error
      alert('Sorry, there was a problem updating your task');
    });
}

function render(response) {
  $('.taskList').empty();

  for (let i = 0; i < response.length; i++) {
    const taskList = response[i];
    if (taskList.completed === false) {
      //append if item is incomplete (task td and button text are different depending on completion status)
      $('.taskList').append(`
  <tr>
    <td>${taskList.task}</td>
    <td><button data-id-task="${taskList.id}" class="js-btn-delete">Delete</button></td>
    <td><button
     data-id-complete="${taskList.id}"
     data-complete="${taskList.completed}"
     class="js-btn-complete"
   >
     Incomplete
   </button></td>
</tr
`);
    } else if (taskList.completed === true) {
      //append if item is finished (task td and button text are different depending on completion status)
      $('.taskList').append(`
  <tr>
    <td class="css"> ${taskList.task}</td>
    <td><button data-id-task="${taskList.id}" class="js-btn-delete">Delete</button></td>
    <td><button
     data-id-complete="${taskList.id}"
     data-complete="${taskList.completed}"
     class="js-btn-complete"
   >
     Finished
   </button></td></tr>
`);
    }
  }
}
