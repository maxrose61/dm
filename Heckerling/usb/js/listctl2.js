var app = angular.module("testApp", ["ngRoute","angular-join","ngSanitize"]);

app.config(function($routeProvider) {
    
    $routeProvider
    .when("/", {
        templateUrl : "main.html",
    })
    .when("/help", {
        templateUrl : "help.html",
    })
        .when("/copyright", {
        templateUrl : "copyright.html",
    })

    .when("/schedule", {
        templateUrl : "schedule.html",
        controller : "scheduleCtrl"
    })
        .when("/schedule/:progAtt", {
        templateUrl : "schedule.html",
        controller : "scheduleCtrl"
    })

        .when("/program/:progTitle", {
        templateUrl : "program.html",
        controller : "programCtrl"
    })

        .when("/faculty/:speaker", {
        templateUrl : "facultydetail.html",
        controller : "facultyCtrl"
    })

        .when("/faculty", {
        templateUrl : "faculty.html",
        controller : "facultyCtrl"
    });
});

app.controller("programCtrl", function ($scope, $routeParams) {
   $scope.fltr = {};
   $scope.plist = pl;
//    console.log( $routeParams.progAtt);
//    if($routeParams.progAtt == ':') {
   $scope.fltr.ProgramTitle = $routeParams.progTitle;
   $scope.item = {heading: "Program Information"};
//    console.log($scope.fltr);
//    }

    $scope.toTime = function(time) { 
    var parts = time.split(":");
    var date = new Date(0, 0, 0, parts[0], parts[1], parts[2]);
    return date;
    };
    
    $scope.selected = -1;

});

app.controller("scheduleCtrl", function ($scope, $routeParams) {
   $scope.filters = {};
   $scope.plist = pl;
//    console.log($routeParams);
// 	Load PDF - TBD
//    $scope.sendVal = function (val) {
//    console.log(val);
//    loadVideo(val);
//    };

   if($routeParams.progAtt == ':general') {
   $scope.filters.ProgramAttributes = "General Sessions";
   $scope.item = {heading: "General Sessions"};
   }
   else if ($routeParams.progAtt == ':special') {
   $scope.filters.ProgramAttributes = "Special Sessions";
   $scope.item = {heading: "Special Sessions"};
   }
   else if ($routeParams.progAtt == ':fundamentals') {
   $scope.filters.ProgramAttributes = "Fundamentals";
   $scope.item = {heading: "Fundamentals"};
   }
   else if ($routeParams.progAtt == ':recent') {
   $scope.filters.ProgramAttributes = "Recent Developments";
   $scope.item = {heading: "Recent Developments"};
   }
   else {
   $scope.filters = '';
   $scope.item = {heading: "Institute Schedule"};
   };
// Handle Author - TBD
   $scope.showAuthor = function (val) {
   alert("Show bio for: " + val);
   };   
      
// FILTER CHAPTER LIST AND SET CHAPTER DISPLAY
//    $scope.filterChap = function (ref) {
//    console.log(ref);
//    $scope.filters.ProgramAttributes = ref;
   //console.log(uniqueTags.indexOf(ref));
//    $("#currChap").text(ref);
//    };
   
//  Create datetime from time string
    $scope.toTime = function(time) { 
    var parts = time.split(":");
    var date = new Date(0, 0, 0, parts[0], parts[1], parts[2]);
    return date;
    };
    
    
    $scope.selected = -1;
    
//     $scope.uniqueTags = function() {
//     return _.chain($scope.plist)
//     .sortBy("ProgramAttributes")
//     .pluck("ProgramAttributes")
//     .unique()
//     .value();
//     };
    
    
});

app.controller("facultyCtrl", function ($scope, $routeParams) {
   $scope.flt = {};
   $scope.item = {heading: "Faculty"};
   
//    console.log($routeParams.speaker);
	// loop through Programs, associate speakers with programs
	var rows = _.map(sp, function(speak){ 
	var question = _.filter(pl, function(q){ 
    return q.speakers.includes(speak.speaker)
    });
//     console.log(question.length);
	var tmp = []
    for (i = 0; i < question.length; i++) {
//     sid.push("sessionId":question[i].SessionID);
    tmp.push({"SessionID":question[i].SessionID, "ProgramTitle":question[i].ProgramTitle, "Date":question[i].Date, "TimeStart":question[i].TimeStart, "TimeEnd":question[i].TimeEnd,});
    }
    speak.ProgramTitle = tmp;
    return speak; 
    // question[i]? question[i].SessionID:'';
    })
    
    $scope.sp = rows;

   if( $routeParams.speaker !=null ) {
   $scope.flt.speaker = $routeParams.speaker;
   }
   else {
   $scope.flt = '';
   }
   
   $scope.toTime = function(time) {
   var parts = time.split(":");
   var date = new Date(0, 0, 0, parts[0], parts[1], parts[2]);
   return date;
   };

   
});

   app.filter("groupBy", function() {
    return _.memoize(function(items, field) {
            return _.groupBy(items, field);
            alert('groupby');
        }
    );
});
