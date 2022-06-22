
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
  
  row.innerHTML = "<th></th><th><span style=\"color:red\">Passwords did not match !</span></th><th></th>";
  
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
    <input type=\"radio\" name=\"type_of_doctor\" value=\"pathologist\" checked>Pathologist\
    <input type=\"radio\" name=\"type_of_doctor\"  value=\"general doctor\">General\
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
