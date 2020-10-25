$(document).ready(onReady);
console.log('jquery connected'); //confirming JQuery connection

function onReady() {
  $('#submit-Task').on('click', sendTask); //listens for submit click, sends data to sendTask function
  $('.taskList').on('click', '.js-btn-delete', deleteData); //listens for delete click, sends data to deleteData function

  $('.taskList').on('click', '.js-btn-complete', completeTask); ////listens for complete click, sends data to deleteData function
  getTaskData();
}

function sendTask() {
  if ($.trim($('#task').val()) === '') {
    swal('Please complete task field before submitting');
  } else {
    let taskObject = {
      task: $('#task').val(),
      completed: false,
    };
    $('#task').val('');
    postTaskData(taskObject);
  }
}

function postTaskData(taskObject) {
  $.ajax({
    type: 'POST',
    url: '/tasks',
    data: taskObject,
  })
    .then(function (response) {
      getTaskData();
    })
    .catch(function (err) {
      console.log('Post Error:', err);
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
      render(response);
    })
    .catch((err) => {
      console.log('Get Error', err);
      alert('Sorry, there was a problem retrieving your tasks');
    });
}

function deleteData() {
  const id = $(this).data('id-task');
  console.log('delete clicked');
  console.log('delete', id);
  swal({
    title: 'Are you sure you want to delete this task?',
    buttons: true,
  }).then((willDelete) => {
    if (willDelete) {
      $.ajax({
        method: 'DELETE',
        url: `/tasks/${id}`,
      })
        .then((deleteMessage) => {
          getTaskData();
        })
        .catch((err) => {
          console.log('Delete Error', err);
          alert('Sorry, there was a problem deleting your task');
        });
    }
  });
}

function completeTask() {
  const Num = $(this).data('id-complete');
  console.log('id', Num);
  const $id = $(this);
  let Completed2 = $id.data('complete');
  const idText = $id.text();
  if (Completed2 == false) {
    Completed2 = true;
  }
  putComplete(Num, Completed2);
}

function putComplete(Num, Completed2) {
  console.log(Num, Completed2);
  $.ajax({
    url: `/tasks/complete/${Num}`,
    type: 'PUT',
    data: { completed: Completed2 },
  })
    .then(() => {
      getTaskData();
    })
    .catch((err) => {
      console.log('Put Error:', err);
      alert('Sorry, there was a problem updating your task');
    });
}

function render(response) {
  $('.taskList').empty();
  for (let i = 0; i < response.length; i++) {
    const taskList = response[i];
    if (taskList.completed === false) {
      $('.taskList').append(`
  <tr>
    <td>${taskList.task}</td>
    <td><button data-id-task="${taskList.id}" class="js-btn-delete btn btn-outline-danger">Delete</button></td>
    <td><button
     data-id-complete="${taskList.id}"
     data-complete="${taskList.completed}"
     class="js-btn-complete btn btn-outline-success"
   >
     Incomplete
   </button></td>
</tr
`);
    } else if (taskList.completed === true) {
      $('.taskList').append(`
  <tr>
    <td class="css"> ${taskList.task}</td>
    <td><button data-id-task="${taskList.id}" class="js-btn-delete btn btn-outline-danger">Delete</button></td>
    <td><button
     data-id-complete="${taskList.id}"
     data-complete="${taskList.completed}"
     class="js-btn-complete btn btn-outline-success"
   >
     Finished
   </button></td></tr
`);
    }
  }
}
