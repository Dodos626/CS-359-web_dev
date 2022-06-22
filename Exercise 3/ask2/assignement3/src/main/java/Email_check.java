
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.sql.SQLException;


import database.tables.EditDoctorTable;
import mainClasses.User;
import com.google.gson.Gson;
import database.tables.EditSimpleUserTable;

@WebServlet(name = "Email_check", value = "/Email_check")
public class Email_check extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        BufferedReader reader = request.getReader();
        String data = getJSONFromAjax(reader);

        System.out.println(data);

        Gson gson = new Gson();

        User user2 = gson.fromJson(data, User.class);


        EditSimpleUserTable table = new EditSimpleUserTable();
        EditDoctorTable table1 = new EditDoctorTable();

        try {
            String db_user_email = table.isThereUserEmail(user2.getEmail());
            String db_user_email1 = table1.isThereUserEmail(user2.getEmail());


            if (db_user_email==null && db_user_email1 == null){
                response.setStatus(200);
            }else{
                out.print("email already exists");
                response.setStatus(406);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
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
