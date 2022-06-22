

import static java.lang.System.out;

import database.tables.EditSimpleUserTable;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import mainClasses.SimpleUser;

/**
 *
 * @author micha
 */
@WebServlet(name = "GetUser")
class GetUser extends HttpServlet {

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



        response.setContentType("text/html");
        PrintWriter pw = response.getWriter();
        pw.print("Url: " + request.getRequestURL().toString() + "<br/>");
        pw.print("Uri: " + request.getRequestURI() + "<br/>");
        pw.print("Scheme: " + request.getScheme() + "<br/>");
        pw.print("Server Name: " + request.getServerName() + "<br/>");
        pw.print("Port: " + request.getServerPort() + "<br/>");
        pw.print("Context Path: " + request.getContextPath() + "<br/>");
        pw.print("Servlet Path: " + request.getServletPath() + "<br/>");
        pw.print("Path Info: " + request.getPathInfo() + "<br/>");
        pw.print("Query: " + request.getQueryString());





    }




    protected void natinkanwdogetmet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        System.out.print("till this good");
        response.setContentType("text/html;charset=UTF-8");
        String username=request.getParameter("username");
        String password=request.getParameter("password");
        System.out.print(password + username);
        try (PrintWriter out = response.getWriter()) {

            /* TODO output your page here. You may use following sample code. */
            EditSimpleUserTable eut = new EditSimpleUserTable();
            SimpleUser su = eut.databaseToSimpleUser(username, password);
            if(su==null){
                response.setStatus(404);
            }
            else{
                String json = eut.simpleUserToJSON(su);
                out.println(json);
                response.setStatus(200);
            }
        } catch (SQLException ex) {
            Logger.getLogger(GetUser.class.getName()).log(Level.SEVERE, null, ex);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(GetUser.class.getName()).log(Level.SEVERE, null, ex);
        }
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
//        processRequest(request, response);
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

    public String testservler(){ return "it works";}
}
