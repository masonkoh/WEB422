/*********************************************************************************
 *  WEB422 –Assignment03
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
 *  assignment has been copied manually or electronically from any other source (including web sites) or
 *  distributed to other students.
 *
 *  Name: ______Youngmin Ko_____ Student ID: __019155159___ Date: __June.15.2018___
 *
 ********************************************************************************/

// Teams API url query string on Heroku
// const urlString = "https://agile-retreat-67872.herokuapp.com/";
const urlString = "https://stormy-depths-28130.herokuapp.com/";
const VERBOSE = false;

// Defining a viewModel
var viewModel = {
  teams: ko.observableArray([]),
  employees: ko.observableArray([]),
  projects: ko.observableArray([])
};

// show	generic modal
function showGenericModal(title, message) {
  if (VERBOSE) console.log("main.js:::showGenericModal()" + title);
  if (VERBOSE) console.log("main.js:::showGenericModal()" + message);
  $("#genericModal").modal({
    backdrop: "static", // disable clicking on the backdrop to close
    keyboard: false // disable using the keyboard to close
  });
  $("#myModalTitle").empty();
  $("#myModalMessage").empty();
  $("#myModalTitle").text(title);
  $("#myModalMessage").html(message);
}

// populate your observable "teams" property
// within your "viewModel" with data
// by issuing an AJAX call to your Teams API
function initializeTeams() {
  if (VERBOSE) console.log("main.js:::initializeTeams()");
  // return a Promise
  return new Promise(function(resolve, reject) {
    // request data to REST server with jQuery-ajax
    $.ajax({
      url: urlString + "teams-raw",
      method: "GET",
      contentType: "application/json"
    })
      .done(function(data) {
        // Assign the results to the "viewModel" variable
        viewModel.teams = ko.mapping.fromJS(data);
        if (VERBOSE)
          console.log(
            "main.js:::initializeTeams():::" + viewModel.teams().length
          );
        // If the AJAX call successes, return resolve function
        resolve();
      })
      .fail(function(err) {
        // If the AJAX call fails, return reject function
        if (VERBOSE) console.log("error: " + err.statusText);
        reject("Error loading the team data.");
      });
  });
}

// populate your observable "employees" property
// within your "viewModel" with data
// by issuing an AJAX call to your Teams API
function initializeEmployees() {
  if (VERBOSE) console.log("main.js:::initializeEmployees()");
  return new Promise(function(resolve, reject) {
    // request data to REST server with jQuery-ajax
    $.ajax({
      // according to data-query type, request data to REST
      url: urlString + "employees",
      method: "GET",
      contentType: "application/json"
    })
      .done(function(data) {
        // Assign the results to the "viewModel" variable
        viewModel.employees = ko.mapping.fromJS(data);
        if (VERBOSE)
          console.log(
            "main.js:::initializeTeams():::" + viewModel.employees().length
          );
        // If the AJAX call successes, return resolve function
        resolve();
      })
      .fail(function(err) {
        // If the AJAX call fails, return reject function
        if (VERBOSE) console.log("error: " + err.statusText);
        reject("Error loading the team data.");
      });
  });
}

// populate your observable "Project" property
// within your "viewModel" with data
// by issuing an AJAX call to your Teams API
function initializeProjects() {
  if (VERBOSE) console.log("main.js:::initializeProjects()");
  return new Promise(function(resolve, reject) {
    // request data to REST server with jQuery-ajax
    $.ajax({
      url: urlString + "projects",
      method: "GET",
      contentType: "application/json"
    })
      .done(function(data) {
        // Assign the results to the "viewModel" variable
        viewModel.projects = ko.mapping.fromJS(data);
        if (VERBOSE)
          console.log(
            "main.js:::initializeProjects():::" + viewModel.projects().length
          );
        resolve();
      })
      .fail(function(err) {
        // If the AJAX call fails, return reject function
        if (VERBOSE) console.log("error: " + err.statusText);
        reject("Error loading the team data.");
      });
  });
}

// send the updated team data to the correct route in the API
function saveTeam() {
    // Set the value of this to a local variable
    // "this" in the context of this function will be a
    // single observable "team" object from our viewModel.teams array
    // - this is because this function is invoked from a "click"
    //   binding from the view (index.html)
    let currentTeam = this;
    if (VERBOSE)
      console.log(
        "main.js:::saveTeam():::currentTeam.TeamName():::" +
          currentTeam.TeamName()
      );
    $.ajax({
      url: urlString + "team/" + currentTeam._id(),
      type: "PUT",
      data: JSON.stringify(
        // create an object literal
        {
          Projects: currentTeam.Projects(),
          Employees: currentTeam.Employees(),
          TeamLead: currentTeam.TeamLead()
        }
      ),
      contentType: "application/json"
    })
      .done(function(data) {
        showGenericModal(
          "Success",
          "[" + currentTeam.TeamName() + "] Updated Successfully"
        );
      })
      .fail(function(err) {
        showGenericModal("Error", "Error updating the team information.");
      });
  }
  // invoking all our "initialize" methods
  $(document).ready(function() {
    // start jQuery
  
    // Promises and Chaining Promises are used
    initializeTeams()
      .then(initializeEmployees)
      .then(initializeProjects)
      .then(function() {
        // apply the bindings (applybindings) to the document using the "viewModel"
        ko.applyBindings(viewModel);
        // Use jQuery to select all "select" elements with class
        // "multiple" and invoke the following method:.multipleSelect({ filter: true });
        $("select.multiple").multipleSelect({ filter: true });
        // Use jQuery to select all "select" elements with class "single"
        // and invoke the following method: .multipleSelect({ single: true, filter: true });
        $("select.single").multipleSelect({ single: true, filter: true });
      })
      .catch(function(err) {
        console.log("error: " + err);
        showGenericModal("Error", err);
      });
  });
  




// let employeesModel = [];

// function initializeEmployeesModel() {

//     $.ajax({
//         url: "http://localhost:8081/employees",
//         type: "GET",
//         contentType: "application/json"
//     }).done(function (data) {
//         employeesModel = data;
//         refreshEmployeeRows(employeesModel);
//     }).fail(function (err) {
//         showGenericModal('Error', 'Unable to get Employees');
//     });
// }

// function showGenericModal(title, message) {

//     $(".modal-title").html(title);
//     $(".modal-body").html(message);
//     $('#genericModal').modal({});

// }


// function refreshEmployeeRows(employees) {

//     $("#employees-table").empty();
//     let rowsTemplate = _.template(
//         '<% _.forEach(employees, function(employee) { %>' +
//         '<div class="row body-row" data-id=<%- employee._id %>>' +
//         '<div class="col-xs-4 body-column"><%- employee.FirstName %></div>' +
//         '<div class="col-xs-4 body-column"><%- employee.LastName %></div>' +
//         '<div class="col-xs-4 body-column"><%- employee.Position.PositionName %></div>' +
//         '</div>' +
//         '<% }); %>');

//     let rows = rowsTemplate({ 'employees': employees });
//     $("#employees-table").html(rows);

// }


// function getFilteredEmployeesModel(filterString) {

//     return _.filter(employeesModel, function (employee) {

//         if (employee.FirstName.toLowerCase().includes(filterString.toLowerCase()) ||
//             employee.LastName.toLowerCase().includes(filterString.toLowerCase()) ||
//             employee.Position.PositionName.toLowerCase().includes(filterString.toLowerCase())) {
//             return true;
//         } else {
//             return false;
//         }
//     });
// }


// function getEmployeeModelById(id) {

//     let retVal = null;
//     for (let i = 0; i < employeesModel.length; i++) {
//         if (employeesModel[i]._id == id) {
//             retVal = _.cloneDeep(employeesModel[i]);
//         }

//     }
//     return retVal;
// }



// // invoking all our "initialize" methods
// $(document).ready(function() {
//     // start jQuery
  
//     // Promises and Chaining Promises are used
//     initializeTeams()
//       .then(initializeEmployees)
//       .then(initializeProjects)
//       .then(function() {
//         // apply the bindings (applybindings) to the document using the "viewModel"
//         ko.applyBindings(viewModel);
//         // Use jQuery to select all "select" elements with class
//         // "multiple" and invoke the following method:.multipleSelect({ filter: true });
//         $("select.multiple").multipleSelect({ filter: true });
//         // Use jQuery to select all "select" elements with class "single"
//         // and invoke the following method: .multipleSelect({ single: true, filter: true });
//         $("select.single").multipleSelect({ single: true, filter: true });
//       })
//       .catch(function(err) {
//         console.log("error: " + err);
//         showGenericModal("Error", err);
//       });
//   });
  

    // main code start
    // $("#teams-menu").on("click",function(event){
    //     event.preventDefault();

    //     $.ajax({
    //         url: "http://localhost:8081/teams",
    //         type: "GET",
    //         contentType: "application/json"
    //     })
    //     .done(function (data) {
    //         $("#data").empty().html("<h3>Teams</h3>").append(JSON.stringify(data));
    //     });
    // });

    // $("#employees-menu").on("click",function(event){
    //     event.preventDefault();

    //     $.ajax({
    //         url: "http://localhost:8081/employees",
    //         type: "GET",
    //         contentType: "application/json"
    //     })
    //     .done(function (data) {
    //         $("#data").empty().html("<h3>Employees</h3>").append(JSON.stringify(data));
    //     });
    // });

    // $("#projects-menu").on("click",function(event){
    //     event.preventDefault();

    //     $.ajax({
    //         url: "http://localhost:8081/projects",
    //         type: "GET",
    //         contentType: "application/json"
    //     })
    //     .done(function (data) {
    //         $("#data").empty().html("<h3>Projects</h3>").append(JSON.stringify(data));
    //     });
    // });

    // $("#positions-menu").on("click",function(event){
    //     event.preventDefault();

    //     $.ajax({
    //         url: "http://localhost:8081/positions",
    //         type: "GET",
    //         contentType: "application/json"
    //     })
    //     .done(function (data) {
    //         $("#data").empty().html("<h3>Positions</h3>").append(JSON.stringify(data));
    //     });
    // });
