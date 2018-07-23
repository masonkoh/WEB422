let viewModel = {
    teams: ko.observable([]),
    employees: ko.observable([]),
    projects: ko.observable([])
   

}; // all of the "viewmodel" data (Employees)

// Function to programmatically show a modal window

function showGenericModal(title,message){
    $("#genericModal .modal-title").html(title)
    $("#genericModal .modal-body").html(message);
    $('#genericModal').modal();
}


// Function to pull the latest data from the API

function initializeTeams(){
    return new Promise(function(resolve,reject){
        $.ajax({
            url: "http://localhost:8081/teams-raw",
            type: "GET",
            contentType: "application/json"
        })
        .done(function (data) {
            viewModel.teams = ko.mapping.fromJS(data);
            resolve();
        })
        .fail(function (err) {
            reject("Error loading the 'team' data.");
        });
    });
}

function initializeEmployees(){
    return new Promise(function(resolve,reject){
        $.ajax({
            url: "http://localhost:8081/employees",
            type: "GET",
            contentType: "application/json"
        })
        .done(function (data) {
            viewModel.employees = ko.mapping.fromJS(data); 
            resolve();      
        })
        .fail(function (err) {
            reject("Error loading the 'employee' data.");
        });
    });
}

function initializeProjects(){
    return new Promise(function(resolve,reject){
        $.ajax({
            url: "http://localhost:8081/projects",
            type: "GET",
            contentType: "application/json"
        })
        .done(function (data) {
            viewModel.projects = ko.mapping.fromJS(data);     
            resolve();  
        })
        .fail(function (err) {
            reject("Error loading the 'project' data.");
        });
    });
}

// function to persist a team
function saveTeam(){

    var currentTeam = this; // keep a reference to "this"

      $.ajax({
            url: "http://localhost:8081/team/" + currentTeam._id(),
            type: "PUT",
            data: JSON.stringify({
                Projects: currentTeam.Projects(), 
                Employees: currentTeam.Employees(), 
                TeamLead: currentTeam.TeamLead() 
            }),
            contentType: "application/json"
        })
        .done(function (data) {
            showGenericModal("Success!", currentTeam.TeamName() + " updated successfully.");       
        })
        .fail(function (err) {
            showGenericModal("Error","Error updating the team information.");
        });
}

$(function() {

    initializeTeams()
    .then(initializeEmployees)
    .then(initializeProjects)
    .then(function(){
        ko.applyBindings(viewModel);
        $('select.multiple').multipleSelect({ filter: true });
        $('select.single').multipleSelect({ single: true, filter: true });
    }).catch(function(err){
        showGenericModal("Error",err);
    });

});
