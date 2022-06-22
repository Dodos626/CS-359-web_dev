import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "Logout", value = "/Logout")
public class Logout extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(200);
        HttpSession session=request.getSession(true);
        out.println("login.html");
        session.removeAttribute("username");
        session.removeAttribute("password");
        out.flush();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        HttpSession session=request.getSession(true);
        if(session.getAttribute("username")==null){
            response.setStatus(403);
            out.println("login.html");
        }else{
            response.setStatus(200);
            out.println(session.getAttribute("username").toString());
        }


        out.flush();
    }


}
