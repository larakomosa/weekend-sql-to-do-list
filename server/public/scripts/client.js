$(document).ready(onReady);
console.log('jquery connected');

function onReady() {
  $('#submit-Task').on('click', sendTask);
  $('.taskList').on('click', '.js-btn-delete', deleteData);

  $('.taskList').on('click', '.js-btn-complete', completeTask);
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

function deleteData() {
  const id = $(this).data('id-task');
  console.log('delete clicked');
  console.log('delete', id);
  swal({
    title: 'Are you sure you want to delete this task?',
    text: 'Once deleted, you will not be able to recover this imaginary file!',
    buttons: true,
    dangerMode: true,
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
          console.log(err);
          alert('Oh SHOOT!!! Delete didnt work!');
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
  console.log($id.text());
  console.log($id);

  if (Completed2 == false) {
    $id.text('Task Finished');
    Completed2 = true;
    console.log('c2', Completed2);
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
    .then(() => {})
    .catch((err) => {
      alert('Issue updating');
    });
}

function render(response) {
  $('.taskList').empty();
  for (let i = 0; i < response.length; i++) {
    const taskList = response[i];
    let completeBtn = '';
    if (taskList.completed === false) {
      completeBtn = `<button
          data-id-complete="${taskList.id}"
          data-complete="${taskList.completed}"
          class="js-btn-complete btn btn-outline-success"
        >
          Completed?
        </button>`;
    } else if (taskList.completed === true)
      completeBtn = `<button
    data-id-complete="${taskList.id}"
    data-complete="${taskList.completed}"
    class="js-btn-complete btn btn-outline-success"
  >
    Task Finished
  </button>`;
    $('.taskList').append(`
      <tr>
        <td>${taskList.task}</td>
        <td><button data-id-task="${taskList.id}" class="js-btn-delete btn btn-outline-danger">Delete</button></td>
        <td>${completeBtn}</td>
    </tr
    `);
  }
}
