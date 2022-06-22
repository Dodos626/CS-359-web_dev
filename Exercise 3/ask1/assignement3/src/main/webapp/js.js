
/*FOR PASSWORD MATCHING AND STRENGTH*/
document.getElementById("whole_form").addEventListener("submit",checkPasswordMatch);
function checkPasswordMatch(event_submit) {
  /*stops html from reloading*/
  event_submit.preventDefault();
  
  /*i find the target*/
  const form = event_submit.target.elements;
  
  pwd = form.pwd.value;
  rpwd = form.rpwd.value;
  // If Not same i make something write in a new tr 
  if (pwd != rpwd) {
      passwordnotmatch();
  }else{
    passwordsdidmatch();
  }
}

function passwordnotmatch(){

  const row = document.getElementById("for_printing");
  
  row.innerHTML = "<th></th><th><span style=\"color:#ff0000\">Passwords did not match !</span></th><th></th>";
  
}
function passwordsdidmatch(){
  const row = document.getElementById("for_printing");
  row.innerHTML = "";
}


/*FOR PASSWORD VISIBILITY*/

document.getElementById("password_visibility").addEventListener("click",toggle_pwd_visibility);

function toggle_pwd_visibility(event_visibility){
  event_visibility.preventDefault();
  const pwd_input = document.getElementById("pwd");
  const type = pwd_input.getAttribute('type');
  if(type == "password"){
    
    pwd_input.setAttribute('type',"text");
  }else{
    pwd_input.setAttribute('type',"password");
  }
}

/*FOR PASSWORD STRENGTH*/

document.getElementById("pwd").addEventListener("input",checkPasswordStrength);

function checkPasswordStrength(e){
  const text = e.target.value;
  /**
   * i split the text to a character array
   * and make a new array to hold the unique characters
   */
  const character_array = text.split('');
  const unique_character_array=[];
  let numbers_in_password = 0;
  let flag_for_character_more_than_half = 0;
  
  for(var i=0; i<text.length;i++){
    if(text[i]<=9){
      numbers_in_password ++ ;
    }
    /**
    * i filter the character array and look if there is a character with length more
    * than half of the current text length
    */
    if(character_array.filter((value)=> value == character_array[i]).length >= text.length/2){
      flag_for_character_more_than_half = 1;
    }
    /**
    * i search to see if the unique array has a character as the character array [i]
    * if i dont find any i push the one coz its unique 
    */
    if(unique_character_array.some((value)=> value == character_array[i])==0){
      unique_character_array.push(character_array[i]);
    }
  }

    const row = document.getElementById("str_pwd");
    if(text.length<8){
      row.innerHTML = "";
    } 
    else if(numbers_in_password >= text.length/2){
      row.innerHTML = "<th></th><th><span style=\"color:red\">Weak password !</span></th><th></th>";
    }else if(flag_for_character_more_than_half){
      row.innerHTML = "<th></th><th><span style=\"color:red\">weak password !</span></th><th></th>";
    }else if(unique_character_array.length >= text.length*8/10){
      row.innerHTML = "<th></th><th><span style=\"color:green\">Strong password !</span></th><th></th>";
    }
    else{
      row.innerHTML = "<th></th><th><span style=\"color:orange\">Medium password !</span></th><th></th>";
    }
    
  
  
}


/*FOR DOCTOR TYPE*/
document.getElementById("doctor_checked").addEventListener("click",doctor_selected);

function doctor_selected(e){
  const row = document.getElementById("doctor_type");
  const Address_change = document.getElementById("Address_change");
  const input_field = document.getElementById("input_for_doctor");
  const  input_field_input= '<th style="text-align: right;"><label><b>Extra information:</b></label></th>\
                <th>\
                  <input type="text" name="extra_info" id="extra_info">\
                </th>\
                <th>\
                  <!--empty on purpose-->\
                </th>';
  const html_code_doctor_button ='<th style="text-align: right;"><label><b>Type of doctor:</b></label></th>\
  <th>\
    <input type=\"radio\" id =\"type_of_doctor\" name=\"type_of_doctor\" value=\"pathologist\" checked>Pathologist\
    <input type=\"radio\" id =\"type_of_doctor2\" name=\"type_of_doctor\"  value=\"general doctor\">General\
  </th>\
  <th>\
    <!--empty on purpose-->\
  </th>';


  input_field.innerHTML = input_field_input;
  Address_change.innerHTML="Address of office:";
  row.innerHTML = html_code_doctor_button;
}

document.getElementById("default_selected").addEventListener("click",default_selected);
function default_selected(e){
  const input_field = document.getElementById("input_for_doctor");
  input_field.innerHTML="";
  const row = document.getElementById("doctor_type");
  row.innerHTML= "";
  const Address_change = document.getElementById("Address_change");
  Address_change.innerHTML="Address:";
}


/*FOR SOCIAL SEQURITY NUMBER*/
document.getElementById("whole_form").addEventListener("submit",check_social_sequrity);

function check_social_sequrity(e){
  const ssn = document.getElementById("ssn").value;
  const date_of_birth = document.getElementById("date_birth").value;
  
  
  let date_array = date_of_birth.split("-");
  
  date_array[0] =  date_array[0].substring(2);
  
  let final_date=date_array[2]+date_array[1]+date_array[0];
  
  let final_ssn=ssn[0];
  
  for(let i = 1 ; i < 6 ; i ++){
    final_ssn = final_ssn + ssn[i];
  }
  
  const ssn_alert_td = document.getElementById("ssn_alert_td");
  if(final_date!=final_ssn){
    ssn_alert_td.innerHTML = "<span style=\"color:red\">SSN doesnt match date of birth</span>"
  }else{
    ssn_alert_td.innerHTML = "(11 digits )"
  }
}

/*FOR TERMS CHECKBOX */

document.getElementById("whole_form").addEventListener("submit",check_terms_check_box);

function check_terms_check_box(e){
  const terms_td = document.getElementById("terms_td");
  const terms_value = document.getElementById("terms").checked;
  if(terms_value){
    terms_td.innerHTML = "(thanks for selling your soul)";
  }else{
    terms_td.innerHTML = "<span style=\"color:red\">Please accept to register</span>";
  }
}

document.getElementById("whole_form").addEventListener("submit",submit_form_to_Server);
function submit_form_to_Server(e) {


  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(JSON.parse(xhr.responseText))
      if(JSON.parse(xhr.responseText).user_id !=null){
        alert("i eggrafi sas pragmatopoiithike me epitixa")
      }else{
        alert("i eggrafi sas pragmatopoiithike me epitixia alla prepei na sas egkrinei o admin")
      }
      document.getElementById("whole_form").reset()
    }else{
      alert(xhr.responseText)
    }
  };

  xhr.open('POST', 'GetUser?');
  xhr.setRequestHeader('Content-type','application/json;charset=UTF-8');

  xhr.send(JSON.stringify(form_to_obj(e)));


}
function form_to_obj(event_submit){
  let coords = return_coords();

  const form = event_submit.target.elements;

  let obj = {
    password: form.pwd.value,
    username: form.username.value,
    email:form.email.value
  }

  if (form.default_selected.checked){
    obj.type_of_user = "default user"
    obj.type_of_doctor = null
    obj.extra_info = null
  }else{
    obj.type_of_user = "doctor user"
    if (!form.type_of_doctor2.checked){
      obj.specialty = "pathologist"
    }else{
      obj.specialty = "general doctor"
    }
    obj.doctor_info = form.extra_info.value
  }
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
  obj.amka = form.ssn.value
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
  if (coords != null){
    obj.lat = coords.lat
    obj.lon = coords.lon
  }else{
    obj.lat = null
    obj.lon = null
  }
  return obj
}

document.getElementById("username").addEventListener("input",check_username_valid);
function check_username_valid(e){
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      enable_button();

    }else{
      disable_button()
      alert(xhr.responseText)
    }
  };

  xhr.open('POST', 'Username_check?');
  xhr.setRequestHeader('Content-type','application/json;charset=UTF-8');

  xhr.send(JSON.stringify({username:e.target.value}));
}

document.getElementById("email").addEventListener("input",check_email_valid);
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

document.getElementById("ssn").addEventListener("input",check_ssn_valid);
function check_ssn_valid(e){
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      enable_button();

    }else{
      disable_button()
      alert(xhr.responseText)
    }
  };

  xhr.open('POST', 'Amka_check?');
  xhr.setRequestHeader('Content-type','application/json;charset=UTF-8');

  xhr.send(JSON.stringify({amka:e.target.value}));
}

/** a function that requests the coords and then waits till it gets a response */
function return_coords(){
  const data = null;
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  let ret_obj = {}

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      obj = JSON.parse(xhr.responseText);

      if(Object.keys(obj).length === 0){
        ret_obj=null
      }else{

        ret_obj.lat = obj[0].lat
        ret_obj.lon = obj[0].lon
      }
    }
  });

  let addressName=document.getElementById("adress").value;

  let city=document.getElementById("city").value;
  let country=document.getElementById("country").value;

  let address=addressName+" "+city+" "+country;


  xhr.open("GET", "https://forward-reverse-geocoding.p.rapidapi.com/v1/search?q="+address+"&acceptlanguage=en&polygon_threshold=0.0" ,false );
  xhr.setRequestHeader("x-rapidapi-host", "forward-reverse-geocoding.p.rapidapi.com");
  xhr.setRequestHeader("x-rapidapi-key", "6cab81b3a0mshde4d9cfc7706312p1fe652jsn97d06a35803c");
  xhr.send(data);

  return ret_obj

}

function disable_button(){
  document.getElementById("button_bottom").disabled = true;

}
function enable_button(){
  document.getElementById("button_bottom").disabled = false;

}