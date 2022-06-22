
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.sql.SQLException;
import java.util.Objects;

import database.tables.EditDoctorTable;
import mainClasses.Doctor;
import mainClasses.SimpleUser;
import mainClasses.User;
import com.google.gson.Gson;
import database.tables.EditSimpleUserTable;


/**
 *
 * @author micha
 */
@WebServlet(name = "GetUser")
public class GetUser extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request  servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException      if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, SQLException, ClassNotFoundException {

        //
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">

    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request  servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException      if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        /**unauthorised request*/
        response.setStatus(404);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        BufferedReader reader = request.getReader();
        String data = getJSONFromAjax(reader);

        System.out.println(data);

        Gson gson = new Gson();

        User user2 = gson.fromJson(data, User.class);

        if(Objects.equals(user2.gettype_of_user(), "doctor user")){

            EditDoctorTable table = new EditDoctorTable();

            try {
                Doctor user = gson.fromJson(data, Doctor.class);
                user.setUsername(filter(user.getUsername()));
                user.setEmail(filter(user.getEmail()));
                user.setFirstname(filter(user.getFirstname()));
                user.setLastname(filter(user.getLastname()));
                user.setCity(filter(user.getCity()));
                user.setAddress(filter(user.getAddress()));
                user.setDoctor_info(filter(user.getDoctor_info()));


                table.addNewDoctor(user);



                out.print(table.databaseToJSON(user.getUsername(),user.getPassword()));
                response.setStatus(201);
            } catch (ClassNotFoundException | SQLException e) {
                response.setStatus(500);
            }


        }else{
            EditSimpleUserTable table = new EditSimpleUserTable();

            try {
                SimpleUser user = gson.fromJson(data , SimpleUser.class);


                user.setUsername(filter(user.getUsername()));
                user.setEmail(filter(user.getEmail()));
                user.setFirstname(filter(user.getFirstname()));
                user.setLastname(filter(user.getLastname()));
                user.setCity(filter(user.getCity()));
                user.setAddress(filter(user.getAddress()));
                table.addNewSimpleUser(user);
                out.print(table.databaseUserToJSON(user.getUsername(),user.getPassword()));
                response.setStatus(201);
            } catch (ClassNotFoundException | SQLException e) {
                response.setStatus(500);
            }


        }

        out.flush();

    }

    public static String getJSONFromAjax(BufferedReader reader) throws IOException {
        StringBuilder buffer = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            buffer.append(line);
        }
        String data = buffer.toString();
        return data;
    }
    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

    public static String filter(String input) {
        if (!hasSpecialChars(input)) {
            return(input);
        }
        StringBuffer filtered =new StringBuffer(input.length());
        char c;
        for(int i=0; i<input.length(); i ++) {
            c = input.charAt(i);
            switch(c) {
                case '<': filtered.append("&lt;"); break;
                case '>': filtered.append("&gt;"); break;
                case '"': filtered.append("&quot;"); break;
                case '&': filtered.append("&amp;"); break;
                default: filtered.append(c);
            }
        }
        return filtered.toString();
    }

    public static boolean hasSpecialChars(String input){
        for (int i = 0 ; i < input.length() ; i++){
            if (input.charAt(i) == '<' || input.charAt(i) == '"' ||input.charAt(i) == '&' ||input.charAt(i) == '>' ){
                return true;
            }
        }
        return false;

    }
}
