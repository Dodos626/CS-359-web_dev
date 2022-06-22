function check_email_valid(e){

  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      enable_button();

    }else{
      disable_button()
      alert(xhr.responseText)
    }
  };

  xhr.open('POST', 'Email_check?');
  xhr.setRequestHeader('Content-type','application/json;charset=UTF-8');

  xhr.send(JSON.stringify({email:e.target.value}));
}


function disable_button(){
  document.getElementById("button_bottom").disabled = true;

}
function enable_button(){
  document.getElementById("button_bottom").disabled = false;

}
document.getElementById("whole_form").addEventListener("submit",change_user);
function change_user(e){
  e.preventDefault()

  obj = form_to_obj(e)
  console.log()

  var xhr = new XMLHttpRequest();

  xhr.onload = function () {
    let obj2;
    if (xhr.readyState === 4 && xhr.status === 200) {
      obj2 = JSON.parse(xhr.responseText)
      obj.username = obj2.username
      obj.amka = obj2.amka
      obj.lat = obj2.lat
      obj.lon = obj2.lon

      //inside obj is the user i want to put
      update_user_to_database(obj)
    }
  };

  xhr.open('GET', 'Change_info?');
  xhr.setRequestHeader('Content-type','application/json;charset=UTF-8');

  xhr.send();



}

function form_to_obj(event_submit){


  const form = event_submit.target.elements;

  let obj = {
    password: form.pwd.value,
    email:form.email.value
  }
  obj.type_of_user = "default user"
  obj.type_of_doctor = null
  obj.extra_info = null

  obj.firstname = form.name.value
  obj.lastname = form.surname.value
  obj.birthdate = form.date_birth.value

  if(form.gender_other.checked){
    obj.gender = form.gender_other.value
  }else if(form.gender_female.checked){
    obj.gender = form.gender_female.value
  }else {
    obj.gender = form.gender_male.value
  }

  obj.country = form.country.value
  obj.city = form.city.value
  obj.address = form.adress.value
  obj.telephone = form.telephone.value
  obj.height = form.height.value
  obj.weight = form.weight.value
  if (form.blood_yes.checked){
    obj.blooddonor = 1
  }else{
    obj.blooddonor = 0
  }
  obj.bloodtype = form.type_of_blood.value

  return obj
}


function update_user_to_database(obj){
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      alert("your preferences changed")

    }else{

      alert(xhr.responseText)
    }
  };

  xhr.open('POST', 'Update_User?');
  xhr.setRequestHeader('Content-type','application/json;charset=UTF-8');

  xhr.send(JSON.stringify(obj));
}