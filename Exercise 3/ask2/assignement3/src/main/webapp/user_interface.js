var flag = true;
function change_info2(){
    if(flag){

        $("#for_printing").load("change_info.html");
        obj = take_fields_from_server();

    }else{
        document.getElementById("for_printing").innerHTML = " ";
    }
    flag = !flag

}


function take_fields_from_server(e){

    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            change_input(xhr.responseText)
        }
    };

    xhr.open('GET', 'Change_info?');
    xhr.setRequestHeader('Content-type','application/json;charset=UTF-8');

    xhr.send();

}

function change_input(response){
    obj = JSON.parse(response)

    document.getElementById("email").value = obj.email
    document.getElementById("pwd").value = obj.password
    document.getElementById("rpwd").value = obj.password

    document.getElementById("name").value = obj.firstname

    document.getElementById("surname").value = obj.lastname

    document.getElementById("date_birth").value = obj.birthdate


    document.getElementById("city").value = obj.city

    document.getElementById("adress").value = obj.address
    document.getElementById("telephone").value = obj.telephone
    document.getElementById("telephone").value = obj.telephone
    document.getElementById("height").value = obj.height

    document.getElementById("weight").value = obj.weight





}

function get_bmi(){
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            let obj = JSON.parse(xhr.responseText)
            fetch_bmi(obj)
        }
    };

    xhr.open('GET', 'Change_info?');
    xhr.setRequestHeader('Content-type','application/json;charset=UTF-8');

    xhr.send();
}

function fetch_bmi(obj){
    flag = true
    const data = null;
    document.getElementById("for_printing").innerHTML=" ";
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {

            let toprint = JSON.parse(xhr.responseText)

            document.getElementById("for_printing").innerHTML+= "<br> BMI: "+toprint.data.bmi+" <br>";
            document.getElementById("for_printing").innerHTML+= "Health considered: "+toprint.data.health+" <br>";
            document.getElementById("for_printing").innerHTML+= " Ideal Bmi: "+toprint.data.healthy_bmi_range+" <br>";

            fetch_ideal_weight(obj)
        }
    });
    let date = obj.birthdate.substr(0,4);

    var today = new Date();
    date = today.getFullYear() - date

    xhr.open("GET", "https://fitness-calculator.p.rapidapi.com/bmi?age="+date+"&weight="+obj.weight+"&height="+obj.height);
    xhr.setRequestHeader("x-rapidapi-host", "fitness-calculator.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "6cab81b3a0mshde4d9cfc7706312p1fe652jsn97d06a35803c");

    xhr.send(data);
}

function fetch_ideal_weight(obj){
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            let toprint = JSON.parse(xhr.responseText)
            document.getElementById("for_printing").innerHTML+= "Your ideal weight with the <b>Devine</b> formula is " + toprint.data.Devine +" kg";
        }
    });
    if(obj.gender !== "Other"){
        let gender = "male"
        if (obj.gender==="Female"){
            gender = "female"
        }
        xhr.open("GET", "https://fitness-calculator.p.rapidapi.com/idealweight?gender="+gender+"&height="+obj.height);
        xhr.setRequestHeader("x-rapidapi-host", "fitness-calculator.p.rapidapi.com");
        xhr.setRequestHeader("x-rapidapi-key", "6cab81b3a0mshde4d9cfc7706312p1fe652jsn97d06a35803c");

        xhr.send(data);
    }else{
        document.getElementById("for_printing").innerHTML+= "Your ideal weight with the <b>Devine</b> formula cant be calculated because of gender left unknown";

    }

}


function get_doctors(){
    flag = true
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            obj = JSON.parse(xhr.responseText)
            console.log(obj)
            build_doctor_table(obj)

        }
    };

    xhr.open('POST', 'Get_Doctors?');
    xhr.setRequestHeader('Content-type','application/json;charset=UTF-8');

    xhr.send();
}

function build_doctor_table(obj){
    let form = document.getElementById("for_printing")
    let string = "<table id=\"doctors_table\"" +
                                "style=\'border: 1px solid black; " +
                                "margin-bottom: 2%;" +
                                "border-collapse: collapse;'>" +
        "<tr><td>Firstname</td><td>Lastname</td><td>Address</td><td>city</td><td>information</td><td>specialty</td><td>telephone</td></tr>"

    for (let i = 0 ; i < obj.doctors.length ; i++){
        string+="<tr><td>"+obj.doctors[i].firstname+
            "</td><td>"+obj.doctors[i].lastname+"</td><td>"+obj.doctors[i].address+
            "</td><td>"+obj.doctors[i].city+"</td><td>"+obj.doctors[i].doctor_info+
            "</td><td>"+obj.doctors[i].specialty+"</td><td>"+obj.doctors[i].telephone+"</td></tr>"
    }

    string += "</table>"

    form.innerHTML=string;
}
