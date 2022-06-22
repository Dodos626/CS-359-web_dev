package com.assignment3.ask4.client;

import java.io.IOException;

public class main {
    public static final String ANSI_RESET = "\u001B[0m";
    public static final String ANSI_BLACK = "\u001B[30m";
    public static final String ANSI_RED = "\u001B[31m";
    public static final String ANSI_GREEN = "\u001B[32m";
    public static final String ANSI_YELLOW = "\u001B[33m";
    public static final String ANSI_BLUE = "\u001B[34m";
    public static final String ANSI_PURPLE = "\u001B[35m";
    public static final String ANSI_CYAN = "\u001B[36m";
    public static final String ANSI_WHITE = "\u001B[37m";

    public static void main(String args[]){
        Rest_Client test = new Rest_Client();

        try {
            System.out.println(ANSI_BLACK+"testing: adding \n"+ANSI_GREEN+"expected output : i eksetasi sas kataxwrithike me epitixia"+ANSI_RESET);
            test.kataxwrisi_eksetasewn();
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            System.out.println(ANSI_BLACK+"testing: adding \n"+ANSI_GREEN+"expected output : i eksetasi sas iparxei sto sistima"+ANSI_RESET);
            test.kataxwrisi_eksetasewn();
        } catch (IOException e) {
            e.printStackTrace();
        }

        try{
            System.out.println(ANSI_BLACK+"testing: anaktisi with 4 ways\n"+ANSI_GREEN+"expected output : multiple json"+ANSI_RESET);
            System.out.println(ANSI_CYAN+"only amka given"+ANSI_RESET);
            test.anaktisi_eksetasewn(0);
            System.out.println(ANSI_CYAN+"amka, fromDate and toDate given"+ANSI_RESET);
            test.anaktisi_eksetasewn(1);
            System.out.println(ANSI_CYAN+"only amka and fromDate given"+ANSI_RESET);
            test.anaktisi_eksetasewn(2);
            System.out.println(ANSI_CYAN+"only amka and toDate given"+ANSI_RESET);
            test.anaktisi_eksetasewn(3);
        } catch (IOException e) {
            e.printStackTrace();
        }

        try{
            System.out.println(ANSI_BLACK+"testing: search with 3 ways\n"+ANSI_GREEN+"expected output : multiple json"+ANSI_RESET);
            System.out.println(ANSI_CYAN+"amka = 01018012345 , measure = cholesterol"+ANSI_RESET);
            test.search_eksetasewn("01018012345","cholesterol");
            System.out.println(ANSI_CYAN+"amka = 01018012345 , measure = iron"+ANSI_RESET);
            test.search_eksetasewn("01018012345","iron");
            System.out.println(ANSI_CYAN+"amka = 01018012345 , measure = blood_sugar"+ANSI_RESET);
            test.search_eksetasewn("01018012345","blood_sugar");

        } catch (IOException e) {
            e.printStackTrace();
        }

        try{
            System.out.println(ANSI_BLACK+"testing: ananewsi with 2 ways\n"+ANSI_GREEN+"expected output : success message"+ANSI_RESET);

            System.out.println(ANSI_CYAN+"id = 6 , measure = cholesterol , search it , then change it to 20 and then search it again"+ANSI_RESET);

            test.search_eksetasewn("01018012345","cholesterol");
            test.ananewsi_eksetasewn("6","cholesterol",20.0);
            test.search_eksetasewn("01018012345","cholesterol");

            System.out.println(ANSI_CYAN+"id = 6 , measure = iron , search it , then change it to 20 and then search it again"+ANSI_RESET);
            test.search_eksetasewn("01018012345","iron");
            test.ananewsi_eksetasewn("6","iron",20.0);
            test.search_eksetasewn("01018012345","iron");

            System.out.println(ANSI_GREEN+"making the values again 0"+ANSI_RESET);
            test.ananewsi_eksetasewn("6","cholesterol",0);
            test.ananewsi_eksetasewn("6","iron",0);

        } catch (IOException e) {
            e.printStackTrace();
        }

        try{
            System.out.println(ANSI_BLACK+"deleting: search with 2 ways\n"+ANSI_GREEN+"expected output : success / failure message"+ANSI_RESET);
            System.out.println(ANSI_CYAN+"id = 12 "+ANSI_RESET);
            test.diagrafi_eksetasewn("12");
            System.out.println(ANSI_CYAN+"id = 12 "+ANSI_RESET);
            test.diagrafi_eksetasewn("12");

        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
