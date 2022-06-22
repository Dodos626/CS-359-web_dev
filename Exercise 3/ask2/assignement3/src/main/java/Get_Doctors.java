import com.google.gson.Gson;
import database.tables.EditDoctorTable;
import database.tables.EditSimpleUserTable;
import mainClasses.Doctor;
import mainClasses.User;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;

@WebServlet(name = "Get_Doctors", value = "/Get_Doctors")
public class Get_Doctors extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        EditDoctorTable table = new EditDoctorTable();
        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        StringBuffer sb = new StringBuffer("{\"doctors\":[");
        try {
            ArrayList<Doctor> array = table.databaseToDoctors();
            for (int i = 0 ; i < array.size() ; i++){
                if (array.get(i).getCertified()==1){
                    sb.append(table.databaseToJSON(array.get(i).getUsername(),array.get(i).getPassword()) + ",");
                }
            }

            sb.deleteCharAt(sb.length()-1);
            sb.append("]}");

            System.out.println(sb);
            out.println(sb);
            response.setStatus(200);
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
            response.setStatus(500);
        }






        out.flush();
    }


}
