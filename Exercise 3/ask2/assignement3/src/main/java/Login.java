import com.google.gson.Gson;

import database.tables.EditSimpleUserTable;
import mainClasses.SimpleUser;
import mainClasses.User;


import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

@WebServlet(name = "Login", value = "/Login")
public class Login extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {


        HttpSession session=request.getSession(true);

        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        BufferedReader reader = request.getReader();
        String data = getJSONFromAjax(reader);

        Gson gson = new Gson();

        User user2 = gson.fromJson(data, User.class);
        EditSimpleUserTable table = new EditSimpleUserTable();

        try {
            SimpleUser user = table.databaseToSimpleUser(user2.getUsername(),user2.getPassword());

            if (user == null){
                response.setStatus(401);
                out.println("username or password is wrong");
            }else{
                out.println("user_interface.html");


                session.setAttribute("username",user2.getUsername());
                session.setAttribute("password",user2.getPassword());
                response.setStatus(200);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }




        out.flush();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(200);
        HttpSession session=request.getSession(true);
        if(session.getAttribute("username")==null){
            out.println("login.html");

        }else{
            //user is already logged in
            out.println("user_interface.html");
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
}
