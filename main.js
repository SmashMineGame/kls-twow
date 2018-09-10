if (Date.now() > 1536274800000 + 604800000) {
	var index = 2;
}
if (Date.now() > 1536274800000) {
	var index = 1;
}
if (Date.now() < 1536274800000) {
	var index = 0;
}

if (index !== 0) {
  firebase.database().ref('prompts').once(index).then(function(snapshot) {
    document.getElementById('prompt').innerHTML = snapshot;
  });
  document.getElementById('submit').disabled = false;
}

document.getElementById('responseInputForm').addEventListener('submit', saveResponse);

function saveResponse(e) {
  if (document.getElementById('responseInput').value === '' || document.getElementById('nameInput').value === '' || document.getElementById('emailInput').value === '') {
    alert('Please fill out all fields before submitting.');
  } else {
    var responseDesc = document.getElementById('responseInput').value;
    var responseAuthor = document.getElementById('nameInput').value;
    var responseEmail = document.getElementById('emailInput').value;
    var response = {
      description: responseDesc,
      email: responseEmail,
      date: Date.now()
    };

    firebase.database().ref('prompt ' + index + '/responses/' + responseAuthor).set(response);
    document.getElementById('submit').disabled = true;
    document.getElementById('submit').innerHTML = 'Thanks!';
    document.getElementById('responseInput').value = '';
    document.getElementById('nameInput').value = '';
    document.getElementById('emailInput').value = '';
  }
  e.preventDefault();
}
