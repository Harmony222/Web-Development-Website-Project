document.addEventListener("DOMContentLoaded", bindButtons);


function bindButtons() {
    document.getElementById('postsubmit').addEventListener('click', function(event) {
        var req = new XMLHttpRequest();
        var formData = $('#postForm').serializeArray();

        var objData = {}
        for (let el of formData) {
            objData[el.name] = el.value;
        }

        req.open('POST', '/newplant', true);
        req.setRequestHeader('Content-Type', 'application/json');

        req.addEventListener('load', function() {
            if (req.status >= 200 && req.status < 400) {
                console.log(req.status);
                window.location.assign('/purchase');
            } else {
                console.log("Error in network request: " + req.statusText);
            }
        });
        req.send(JSON.stringify(objData));
        event.preventDefault();
    })
}


var plantselector = document.querySelector("#selectplant");

plantselector.addEventListener("change", (event) => {
    let email = document.getElementById("contactemail");
    email.textContent = `Contact email: ${event.target.value}`;

    email.addEventListener("click", function() {
        window.open(`mailto:${event.target.value}`);
    })
})

$('.ui.checkbox')
  .checkbox()
;