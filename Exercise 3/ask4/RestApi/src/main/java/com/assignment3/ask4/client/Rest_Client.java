package com.assignment3.ask4.client;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.logging.Level;
import java.util.logging.Logger;

import static javax.ws.rs.core.HttpHeaders.ACCEPT;
import static javax.ws.rs.core.HttpHeaders.CONTENT_TYPE;

public class Rest_Client {

    private HttpClient client = new DefaultHttpClient();
    private HttpPost kataxwrisi;
    private HttpGet anaktisi;
    private HttpGet search;
    private HttpPut ananewsi;
    private HttpDelete diagrafi;
    private static final String URL = "http://localhost:8080/RestApi_war/";
    private String serviceName;

    public void kataxwrisi_eksetasewn() throws IOException{

        String eksetasi = "{" +
                "        \"amka\": \"01018012345\",\n" +
                "        \"blood_sugar\": \"20\",\n" +
                "        \"cholesterol\": \"45.0\",\n" +
                "        \"iron\": \"12.0\",\n" +
                "        \"medical_center\": \"thessaloniki agios loukas\",\n" +
                "        \"test_date\": \"2019-04-04\",\n" +
                "        \"vitamin_b12\": \"0\",\n" +
                "        \"vitamin_d3\": \"0\"\n" +
                "    }";

        try {
            serviceName = "newBloodTest";
            kataxwrisi = new HttpPost(URL+serviceName);
            kataxwrisi.addHeader(ACCEPT , "application/json");
            kataxwrisi.addHeader(CONTENT_TYPE , "application/json");
            StringEntity toSend = new StringEntity(eksetasi);
            kataxwrisi.setEntity(toSend);
            HttpResponse response = client.execute(kataxwrisi);
            int responseCode = response.getStatusLine().getStatusCode();
            BufferedReader rd = new BufferedReader(new
                    InputStreamReader(response.getEntity().getContent()));
            String line = "";
            while ((line = rd.readLine()) != null) {
                System.out.println(line); }
        } catch (Exception ex) {
            Logger.getLogger(Rest_Client.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

    public void anaktisi_eksetasewn(int i) throws IOException{
        switch (i) {
            case 1 -> serviceName = "BloodTests/01018012345?fromDate=2000-01-01&toDate=2021-12-31";
            case 2 -> serviceName = "BloodTests/01018012345?fromDate=2021-12-11";
            case 3 -> serviceName = "BloodTests/01018012345?toDate=2021-12-31";
            default -> serviceName = "BloodTests/01018012345";
        }
        try {
            anaktisi = new HttpGet(URL+serviceName);
            anaktisi.addHeader(ACCEPT,"application/json");
            HttpResponse response = client.execute(anaktisi);
            BufferedReader rd = new BufferedReader(new
                    InputStreamReader(response.getEntity().getContent()));
            String line = "";
            while ((line = rd.readLine()) != null) {
                System.out.println(line);
            }
        } catch (Exception ex) {
            Logger.getLogger(Rest_Client.class.getName()).log(Level.SEVERE, null, ex);
        }


    }

    public void search_eksetasewn(String amka , String measure) throws IOException{
        serviceName = "bloodTestMeasure/"+amka+"/"+measure;
        try {
            search = new HttpGet(URL+serviceName);
            search.addHeader(ACCEPT,"application/json");
            HttpResponse response = client.execute(search);
            BufferedReader rd = new BufferedReader(new
                    InputStreamReader(response.getEntity().getContent()));
            String line = "";
            while ((line = rd.readLine()) != null) {
                System.out.println(line);
            }
        } catch (Exception ex) {
            Logger.getLogger(Rest_Client.class.getName()).log(Level.SEVERE, null, ex);
        }


    }

    public void ananewsi_eksetasewn(String bloodtest_id, String measure , double value) throws IOException {
        try {
            serviceName = "bloodTest";
            ananewsi = new HttpPut(URL + serviceName + "/" + bloodtest_id + "/" + measure+ "/" + value);
            ananewsi.addHeader(ACCEPT, "application/json");
            HttpResponse response = client.execute(ananewsi);
            int responseCode = response.getStatusLine().getStatusCode();
            BufferedReader rd = new BufferedReader(new
                    InputStreamReader(response.getEntity().getContent()));
            String line = "";
            while ((line = rd.readLine()) != null) {
                System.out.println(line);
            }
        } catch (Exception ex) {
            Logger.getLogger(Rest_Client.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void diagrafi_eksetasewn(String bloodtest_id) throws IOException {
        try {
            serviceName = "bloodTestDeletion";
            diagrafi = new HttpDelete(URL + serviceName + "/" + bloodtest_id);
            diagrafi.addHeader(ACCEPT, "application/json");
            HttpResponse response = client.execute(diagrafi);
            int responseCode = response.getStatusLine().getStatusCode();
            BufferedReader rd = new BufferedReader(new
                    InputStreamReader(response.getEntity().getContent()));
            String line = "";
            while ((line = rd.readLine()) != null) {
                System.out.println(line);
            }
        } catch (Exception ex) {
            Logger.getLogger(Rest_Client.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
