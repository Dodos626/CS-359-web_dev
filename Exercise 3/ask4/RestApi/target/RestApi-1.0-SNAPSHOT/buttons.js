function kataxwrisi(){
    
    obj = {
        "amka": "0",
        "blood_sugar": "0",
        "cholesterol": "0",
        "iron": "0",
        "medical_center": "0",
        "test_date": "0",
        "vitamin_b12": "0",
        "vitamin_d3": "0"
    }


    obj.amka = document.getElementById("amka_kataxwrisi").value;
    obj.test_date = document.getElementById("test_date_kataxwrisi").value;
    obj.medical_center = document.getElementById("medical_center_kataxwrisi").value;


    if(document.getElementById("blood_sugar_kataxwrisi").value != ""){
        obj.blood_sugar = document.getElementById("blood_sugar_kataxwrisi").value;
    }
    if(document.getElementById("vitamin_b12_kataxwrisi").value != ""){
        obj.vitamin_b12 = document.getElementById("vitamin_b12_kataxwrisi").value;
    }
    if(document.getElementById("iron_kataxwrisi").value != ""){
        obj.iron = document.getElementById("iron_kataxwrisi").value;
    }
    if(document.getElementById("vitamin_d3_kataxwrisi").value != ""){
        obj.vitamin_d3 = document.getElementById("vitamin_d3_kataxwrisi").value;
    }
    if(document.getElementById("cholesterol_kataxwrisi").value != ""){
        obj.cholesterol = document.getElementById("cholesterol_kataxwrisi").value;
    }
    
    
    
    

    



    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            alert(xhr.responseText)

        }else{
            console.log(xhr.responseText)
        }
    };

    xhr.open('POST', 'http://localhost:8080/RestApi_war/newBloodTest');
    xhr.setRequestHeader('Content-type','application/json;charset=UTF-8');
    console.log(obj);
    xhr.send(JSON.stringify(obj));


}


function anaktisi(){


    let obj = {
        "amka":"01018012345",
        "fromDate":null,
        "toDate":null
    }


    if(document.getElementById("fromDate_anaktisi").value != ""){
        obj.fromDate=document.getElementById("fromDate_anaktisi").value;
    }
    if(document.getElementById("toDate_anaktisi").value != ""){
        obj.toDate=document.getElementById("toDate_anaktisi").value;
    }

    obj.amka=document.getElementById("amka_anaktisi").value

    let str = "http://localhost:8080/RestApi_war/BloodTests/"+obj.amka;

    if(obj.fromDate!= null){
        if(obj.toDate!=null){
            str += "?fromDate="+obj.fromDate+"&toDate="+obj.toDate
        }else{
            str += "?fromDate="+obj.fromDate
        }
    }else if(obj.toDate!=null){
        str += "?toDate="+obj.toDate
    }


    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            console.log(xhr.responseText)

        }else{
            alert(xhr.responseText)
        }
    };

    xhr.open('Get', str);
    xhr.setRequestHeader('Content-type','application/json;charset=UTF-8');
    
    xhr.send();
}


function search(){
    let obj = {
        "amka":"01018012345",
        "measure":"cholesterol"
    }

    obj.amka=document.getElementById("amka_search").value
    obj.measure=document.getElementById("measure_search").value

    
    let str = "http://localhost:8080/RestApi_war/bloodTestMeasure/"+obj.amka +"/"+obj.measure;

    


    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            console.log(xhr.responseText)

        }else{
            alert(xhr.responseText)
        }
    };

    xhr.open('Get', str);
    xhr.setRequestHeader('Content-type','application/json;charset=UTF-8');
    
    xhr.send();
}

function ananewsi(){
    let obj = {
        "bloodTestID":"4",
        "measure":"vitamin_d3",
        "value":"32.00"
    }

    obj.bloodTestID = document.getElementById("bloodTestID_ananewsi").value
    obj.measure = document.getElementById("measure_ananewsi").value
    obj.value = document.getElementById("value_ananewsi").value


    let str = "http://localhost:8080/RestApi_war/bloodTest/"+obj.bloodTestID +"/"+obj.measure+"/"+obj.value;

    


    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            console.log(xhr.responseText)

        }else{
            alert(xhr.responseText)
        }
    };

    xhr.open('PUT', str);
    xhr.setRequestHeader('Content-type','application/json;charset=UTF-8');
    
    xhr.send();
}

function diagrafi(){
    let obj = {
        "bloodTestID":"2"
    }
    obj.bloodTestID = document.getElementById("bloodTestID_diagrafi").value;

    let str = "http://localhost:8080/RestApi_war/bloodTestDeletion/"+obj.bloodTestID;

    


    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            console.log(xhr.responseText)

        }else{
            alert(xhr.responseText)
        }
    };

    xhr.open('DELETE', str);
    xhr.setRequestHeader('Content-type','application/json;charset=UTF-8');
    
    xhr.send();
}