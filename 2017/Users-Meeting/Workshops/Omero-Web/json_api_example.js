
var api_url;
var csrf_token;


function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    xhr.withCredentials = true;
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS is not supported by the browser.
    xhr = null;
  }

  xhr.onerror = function() {
    console.log('There was an error!');
  };
  return xhr;
}

function makeJSONRequest(method, url, callback, data) {
  var xhr = createCORSRequest(method, url);

  xhr.onload = function() {
    console.log(xhr);
    // handle the response (assumes we're getting JSON data)
    var responseText = xhr.responseText;
    var jsonResponse = JSON.parse(responseText);
    // status OK - call the callback()
    if (xhr.status === 200) {
      if (callback) {
        callback(jsonResponse);
      }
    } else {
      console.log("Error:", xhr)
    }
  };

  if (method !== 'GET') {
    xhr.setRequestHeader('x-csrftoken', csrf_token);
  }

  if (data) {
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(data);
  } else {
    xhr.send();
  }
}

document.getElementById('get_csrf_token').addEventListener('click', function(event) {
  event.preventDefault()
  api_url = document.getElementById('api_url').value;

  var token_url = api_url + "v0/token/"
  makeJSONRequest('GET', token_url, function(rsp) {
    csrf_token = rsp.data;
    document.getElementById('csrf_token').innerHTML = csrf_token;
  });
  return false;
});

document.getElementById('login_form').addEventListener('submit', function(event) {
  event.preventDefault();

  var login_url = api_url + "v0/login/"

  var fields = ['username', 'password', 'server'];
  var data = fields.map(function(f){
    return f + '=' + document.getElementById(f).value
  });
  data = data.join('&');

  makeJSONRequest('POST', login_url, function(rsp) {
    // Will get eventContext if login OK
    var ctx = rsp.eventContext;
    var message = "User ID: " + ctx.userId + ", Member of Groups: " + ctx.memberOfGroups;
    document.getElementById('event_context').innerHTML = message;

    loadProjects();
  }, data);

  return false;
});

function loadProjects() {
  var projects_url = api_url + "v0/m/	projects/";
  makeJSONRequest('GET', projects_url, function(rsp) {
    var projectsHtml = rsp.data.map(function(p){
      return '<span>' + p['@id'] + ':' + p.Name + '</span>';
    });
    document.getElementById('api_projects').innerHTML = projectsHtml.join(" | ");
  });
}
