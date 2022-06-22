package com.assignment3.ask4.rest;


import com.google.gson.Gson;
import database.DB_Connection;
import database.tables.EditBloodTestTable;
import mainClasses.BloodTest;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import javax.ws.rs.core.Response;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Objects;


@Path("/")
public class HelloRestService {
    @GET // This annotation indicates GET request
    @Path("/hello")
    public Response hello() {
        return Response.status(200).entity("this is an easter egg").build();
    }


    @POST
    @Path("/newBloodTest")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response main(String json) {
        Gson gson=new Gson();
        BloodTest bd=gson.fromJson(json, BloodTest.class);
        bd.setValues();

        String check_fields = check_blood_types_fields(bd);
        if (check_fields==null){
            EditBloodTestTable table = new EditBloodTestTable();
            try {
                if (table.databaseToBloodTest(bd.getAmka(),bd.getTest_date())!=null)
                {
                    return Response.status(403).entity("i eksetasi sas iparxei idi sto sistima").build();
                }else{
                    table.addBloodTestFromJSON(json);
                }
            } catch (SQLException | ClassNotFoundException e) {
                e.printStackTrace();
            }

        }else {
            return Response.status(406).entity(check_fields).build();
        }


        return Response.status(200).entity("eksetasi kataxwrithike me epitixia").build();



    }
    public String check_blood_types_fields(BloodTest bd){

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd");
        Date date = new Date();
        String now_date = formatter.format(date);
        String user_date = bd.getTest_date();

        if (bd.getAmka()==null){
            return "amka is missing";
        }else if (bd.getTest_date() == null ){
            return "date of the test is missing";
        }else if (bd.getMedical_center() == null){
            return "medical center of the test is missing";
        }else if( bd.getCholesterol_level() == null && bd.getBlood_sugar_level() == null &&  bd.getVitamin_b12_level() == null &&  bd.getIron_level() == null &&  bd.getVitamin_d3_level() == null){
            return "extra information is missing";
        }else if(bd.getCholesterol() < 0){
            return "cholesterol number not accepted please give something above 0";
        }else if(bd.getBlood_sugar() <0){
            return "blood sugar number not accepted please give something above 0";
        }else if(bd.getVitamin_d3()<0){
            return "vitamin d3 number not accepted please give something above 0";
        }else if(bd.getIron()<0){
            return "iron number not accepted please give something above 0";
        }else if(bd.getVitamin_b12()<0){
            return "vitamin b12 number not accepted please give something above 0";
        }else if (Integer.parseInt(user_date.substring(0,4)) > Integer.parseInt(now_date.substring(0,4))){
            return "date cant be a future one";
        }else if (Integer.parseInt(user_date.substring(5,7)) > Integer.parseInt(now_date.substring(5,7))){
            return "date cant be a future one";
        }else if (Integer.parseInt(user_date.substring(5,7)) == Integer.parseInt(now_date.substring(5,7))){
            //if month is the same only then we check for the day
            if (Integer.parseInt(user_date.substring(8,10)) > Integer.parseInt(now_date.substring(8,10))) {
                return "date cant be a future one";
            }
        }





        return null;
    }

    @GET
    @Path("/BloodTests/{amka}")
    public Response main(@PathParam("amka") String amka,
                         @QueryParam("fromDate") String fromDate,
                         @QueryParam("toDate") String toDate){

        if (amka ==null){
            return Response.status(406).entity("amka missing").build();
        }else if (fromDate !=null && toDate != null){
            if (Integer.parseInt(fromDate.substring(0,4)) > Integer.parseInt(toDate.substring(0,4))){
                return Response.status(422).entity("dates given conflict").build();
            }else if (Integer.parseInt(fromDate.substring(5,7)) > Integer.parseInt(toDate.substring(5,7))){
                return Response.status(422).entity("dates given conflict").build();
            }else if (Integer.parseInt(fromDate.substring(5,7)) == Integer.parseInt(toDate.substring(5,7))){
                //if month is the same only then we check for the day
                if (Integer.parseInt(fromDate.substring(8,10)) > Integer.parseInt(toDate.substring(8,10))) {
                    return Response.status(422).entity("dates given conflict").build();
                }
            }
        }
        if (fromDate == null){
            fromDate = "0";
        }
        if (toDate == null){
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd");
            Date date = new Date();
            toDate = formatter.format(date);
        }

        EditBloodTestTable table = new EditBloodTestTable();
        try {
            String bloodtest_return = table.databaseToBloodTestwithdates(amka,fromDate,toDate);
            if (Objects.equals(bloodtest_return, "{[]}")){
                return Response.status(400).entity("kamia eksetasi den exei kataxwrithei akoma").build();
            }else{
                return Response.status(200).entity(bloodtest_return).build();


            }
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        }
        return Response.status(400).entity("kamia eksetasi den exei kataxwrithei akoma").build();



    }




    @GET
    @Path("/bloodTestMeasure/{amka}/{measure}")
    public Response main(@PathParam("amka") String amka,
                         @PathParam("measure") String measure){
        EditBloodTestTable table = new EditBloodTestTable();

        if (!( Objects.equals(measure,"cholesterol") ||
                Objects.equals(measure,"blood_sugar") ||
                Objects.equals(measure,"iron") ||
                Objects.equals(measure,"vitamin_d3") ||
                Objects.equals(measure,"vitamin_b12") )){
            return Response.status(406).entity("cholesterol , blood_sugar , iron , vitamin_d3 " +
                    "and vitamin_b12 only accepted as measure param").build();
        }


        try {
            String ret = table.databaseToBloodTestMeasurements(amka,measure);
            if (Objects.equals(ret, "{[]}")){
                return Response.status(406).entity("amka not found").build();
            }else{
                return Response.status(200).entity(ret).build();
            }
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        }

        return Response.status(500).entity("something went terribly wrong").build();
    }

    @PUT
    @Path("/bloodTest/{bloodTestID}/{measure}/{value}")
    public Response main(@PathParam("bloodTestID") int bloodTestID,
                         @PathParam("measure") String measure,
                         @PathParam("value") Double value){

        if (!( Objects.equals(measure,"cholesterol") ||
                Objects.equals(measure,"blood_sugar") ||
                Objects.equals(measure,"iron") ||
                Objects.equals(measure,"vitamin_d3") ||
                Objects.equals(measure,"vitamin_b12") )){
            return Response.status(406).entity("cholesterol , blood_sugar , iron , vitamin_d3 " +
                    "and vitamin_b12 only accepted as measure param").build();
        }
        EditBloodTestTable table = new EditBloodTestTable();
        try {
            if (Objects.equals(table.updateBloodTest2(bloodTestID,measure,value),"ok")){
                return Response.status(200).entity("the table has been updated").build();
            }else{
                return Response.status(500).entity("internal server error").build();
            }
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        }


        return Response.status(500).entity("internal server error").build();
    }


    @DELETE
    @Path("/bloodTestDeletion/{bloodTestID}")
    public Response main(@PathParam("bloodTestID") int bloodTestID){

        Boolean flag = true;
        ResultSet rs;
        Connection con = null;
        try {
            con = DB_Connection.getConnection();
            Statement stmt = con.createStatement();
            rs = stmt.executeQuery("SELECT * FROM bloodtest WHERE bloodtest_id= '" + bloodTestID +"'");
            rs.next();
            System.out.println(DB_Connection.getResultsToJSON(rs));
            stmt.close();
            con.close();
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
            flag = false;
        }


        if (!flag){
            return Response.status(403).entity("blood test id not found").build();
        }


        EditBloodTestTable table = new EditBloodTestTable();

        try {
            table.deleteBloodTest(bloodTestID);
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
            return Response.status(403).entity("blood test id not found").build();
        }

        return Response.status(200).entity("i eksetasi diagraftike me epitixia").build();
    }

}