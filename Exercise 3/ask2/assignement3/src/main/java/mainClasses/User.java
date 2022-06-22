/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package mainClasses;


/**
 *
 * @author Mike
 */
public class User {
    String username,email,password,firstname,lastname,birthdate;
    String gender;
    String amka;
    String country,city,address;
    Double lat,lon;
    String telephone;
    int height;
    double weight;
    int blooddonor;
    String bloodtype;
    String extra_info;
    String type_of_doctor;
    String type_of_user;
    User (){

    }

    public String gettype_of_user(){return type_of_user;}
    public void settype_of_user(String type_of_user){this.type_of_user = type_of_user;}

    public String getExtra_info(){return extra_info;}
    public void setExtra_info(String extra_info){this.extra_info = extra_info;}

    public String getType_of_doctor(){return  type_of_doctor;}
    public void setType_of_doctor(String type_of_doctor){this.type_of_doctor=type_of_doctor;}
    
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }
    
    
    
    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }
    

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

   
    
    public String getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(String birthDate) {
        this.birthdate = birthDate;
    }

   
    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

 
    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLon() {
        return lon;
    }

    public void setLon(Double lon) {
        this.lon = lon;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

  
    public int isBloodDonor() {
        return blooddonor;
    }

    public String getAmka() {
        return amka;
    }

    public void setAmka(String amka) {
        this.amka = amka;
    }


    public int getBlooddonor() {
        return blooddonor;
    }

    public void setBlooddonor(int blooddonor) {
        this.blooddonor = blooddonor;
    }

    public void setBloodDonor(int bloodDonor) {
        this.blooddonor = bloodDonor;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getBloodtype() {
        return bloodtype;
    }

    public void setBloodtype(String bloodtype) {
        this.bloodtype = bloodtype;
    }

    
}
