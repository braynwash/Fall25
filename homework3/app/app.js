function connectStorage() {
  if (localStorage) {
    let students = localStorage.getItem("students");
    if (students) {
    } else {
      localStorage.setItem("students", JSON.stringify([]));
    }
  } else {
    alert(
      "Your browser does not support local storage. Please update your browser, or switch to a different one."
    );
  }
}

function initListeners() {
  $("#submit").on("click", (e) => {
    e.preventDefault();
    let fn = $("#firstName").val();
    let ln = $("#lastName").val();
    let age = $("#age").val();
    let pn = $("#phoneNum").val();
    let em = $("#email").val();
    let ad = $("#address").val();
    let cs = $("#classes").val();

    let newArrClasses = cs.split(",").map((item) => item.trim());

    let studentObj = {
      fName: fn,
      lName: ln,
      age: age,
      phoneNum: pn,
      email: em,
      address: ad,
      classes: newArrClasses,
    };

    $("#firstName").val("");
    $("#lastName").val("");
    $("#age").val();
    $("#phoneNum").val();
    $("#email").val();
    $("#address").val();
    $("#classes").val("");

    if (!fn || !ln || !age || !pn || !em || !ad || cs.length === 0) {
      alert("Please fill out all fields before submitting!");
      return;
    }

    addStudent(studentObj);
  });

  $("#showLocal").on("click", (e) => {
    getStudents();
  });
}

function addStudent(student) {
  let allStudents = JSON.parse(localStorage.getItem("students"));
  allStudents.push(student);
  localStorage.setItem("students", JSON.stringify(allStudents));
  alert(`You have successfully added a student!`);
}

function getStudents() {
  $("#app").empty();
  let allStudents = JSON.parse(localStorage.getItem("students"));
  let studentString = "<div class='studentCard'><p>";
  $.each(allStudents, (index, student) => {
    studentString += `<strong>First Name:</strong> ${student.fName} <br> <strong>Last Name:</strong> ${student.lName} <br> <strong>Age:</strong> ${student.age} <br> <strong>Phone Number</strong>: ${student.phoneNum} <br> <strong>IU Email:</strong> ${student.email} <br> <strong>Address:</strong> ${student.address} <br> <strong>Classes:</strong>`;
    $.each(student.classes, (i, cls) => {
      studentString += ` <span>${cls}</span>,`;
    });
    studentString += "</p>";
  });
  studentString += "</div>";
  $("#app").html(studentString);
}

$(document).ready(function () {
  connectStorage();
  initListeners();
});
