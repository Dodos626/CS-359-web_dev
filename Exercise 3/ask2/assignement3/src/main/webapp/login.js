


document.getElementById("login_form").addEventListener("submit",login);
function login(e){

    let obj = {
        username: e.target.elements.username.value,
        password: e.target.elements.pwd.value
    }

    e.preventDefault()
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            window.location.href=xhr.responseText

        }else{
            document.getElementById("for_errors").innerHTML = "<th></th><th><span style=\"color:red\">"+xhr.responseText+"</span></th><th></th>";
        }
    };

    xhr.open('POST', 'Login?');
    xhr.setRequestHeader('Content-type','application/json;charset=UTF-8');

    xhr.send(JSON.stringify(obj));

}