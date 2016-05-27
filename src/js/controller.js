var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
   $routeProvider
    .when('/', {
      controller:'homeController as homeCtrl',
      templateUrl:'src/view/home.html'
    })
    .when('/output', {
      controller:'outputController as outputCtrl',
      templateUrl:'src/view/output.html'
    })
    .otherwise({
      redirectTo:'/'
    });
})

app.controller('homeController', function($location, myservice, $http) {
  var home = this;
  home.text;
  home.CharacterLength = 0;
  home.WORDS_MAXIMUM = 200;
  home.WordsLength = 0;
  home.FontStyle = {'color':'red'};
  home.buttonText = "Start Wiki Inspect";
  home.isDisabled = false;

  home.addParagraph = function(){
    home.sentences = home.text.split('/n');
    home.postCourses();
    home.isDisabled = true;
    home.buttonText = "Loading...";
  }

  home.postCourses = function() {
    var body = { "message" : home.sentences };
    console.log(body);
    $http.post('http://52.77.244.73:3000/api', angular.toJson(body)
    ).success(function(data, status, headers, config) {
      console.log(data.message);
      home.isDisabled = false;
      home.buttonText = "Start Wiki Inspect";
    }).
    error(function(data, status, headers, config) {
      alert(data.body);
    });
  }

  home.UpdateLengths = function($event){
    home.CharacterLength = home.text.length;
    home.WordsLength=0;
    if(home.text.length == 1 && home.text[0]!=' '){
      home.WordsLength = 1;
    }

    for( var i=1; i< home.text.length; i++){
      if( home.IsAlphabet(home.text[i])  && !home.IsAlphabet(home.text[i-1])){
        home.WordsLength++;
        if(home.WordsLength == home.WORDS_MAXIMUM + 1) {
            home.WordsLength--;
            home.text = home.text.substring(0, i);
            return;
        }
      }else if (home.IsAlphabet(home.text[i]) && home.IsAlphabet(home.text[i-1]) ){
        if(home.WordsLength==0){
            home.WordsLength=1;
        }
      }else if(!home.IsAlphabet(home.text[i]) && !home.IsAlphabet(home.text[i-1])){
        continue;
      }else if(!home.IsAlphabet(home.text[i]) && home.IsAlphabet(home.text[i-1]))  {
        continue;
      }
    }
  }

  home.IsAlphabet = function(character)  {
    var numeric_char = character.charCodeAt(character);

    if(numeric_char>64 && numeric_char<91) {
        return true;
    }
    if(numeric_char>96 && numeric_char<123) {
        return true;
    }
    return false;
  }
});

app.controller('outputController', function(myservice) {
  var output = this;
  output.text = myservice.text;
});

app.service('myservice', function(){
  var self = this;

})
