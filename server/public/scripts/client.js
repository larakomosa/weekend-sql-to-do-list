$(document).ready(onReady);
console.log('jquery connected');

function onReady() {
  $('#submit-Task').on('click', sendTask);
  getTaskData();
}

function sendTask() {
  console.log('click works');
  let taskObject = {
    task: $('#task').val(),
    completed: false,
  };
  console.log(taskObject);
  postTaskData(taskObject);
}

function postTaskData(taskObject) {
  $.ajax({
    type: 'POST',
    url: '/tasks',
    data: taskObject,
  })
    .then(function (response) {
      //clearForm();
      getTaskData();
    })
    .catch(function (err) {
      console.log(err);
    });
}

function getTaskData() {
  $.ajax({
    type: 'GET',
    url: '/tasks',
  }).then(function (response) {
    console.log('GET', response);
    render(response);
  });
}

function render(response) {
  $('.taskList').empty();
  for (let i = 0; i < response.length; i++) {
    const taskList = response[i];
    $('.taskList').append(`
      <tr>
        <td>${taskList.task}</td>
        <td>${taskList.completed}</td>
      </tr>
    `);
  }
}
