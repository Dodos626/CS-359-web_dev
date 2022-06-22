
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.sql.SQLException;
import java.util.Objects;

import database.tables.EditDoctorTable;
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
        response.setStatus(401);
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
                table.addDoctorFromJSON(data);
                out.print(table.databaseToJSON(user2.getUsername(),user2.getPassword()));
                response.setStatus(200);
            } catch (ClassNotFoundException | SQLException e) {
                response.setStatus(500);
            }


        }else{
            EditSimpleUserTable table = new EditSimpleUserTable();

            try {
                table.addSimpleUserFromJSON(data);
                out.print(table.databaseUserToJSON(user2.getUsername(),user2.getPassword()));
                response.setStatus(200);
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

}
