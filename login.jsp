<%@ page import="java.sql.*"%>
<!DOCTYPE html>
<html>
<head>
    <title>Login Page</title>
</head>
<body>

<h2>Login</h2>

<form>
    <label for="username">Username:</label><br>
    <input type="text" id="username" name="username"><br><br>

    <label for="password">Password:</label><br>
    <input type="password" id="password" name="password"><br><br>

    <input type="submit" value="Login"><br><br>
</form>

<p><a href="#">Forgot password?</a></p>
<p><a href="create_account.jsp">Create Account...</a></p>

<%
    String db = "pickup_finder";
    String user = "root";
        String password = "???"; // put your password in

    String username = request.getParameter("username");
    String userpass = request.getParameter("password");


    try {
        java.sql.Connection con; 
        Class.forName("com.mysql.jdbc.Driver");
        con = DriverManager.getConnection("jdbc:mysql://localhost:3306/pickupfinder?autoReconnect=true&useSSL=false",user, password);
        out.println(db + " database successfully opened.<br/><br/>");
        
        Statement stmt = con.createStatement();
        ResultSet rs = stmt.executeQuery("SELECT password FROM users WHERE user_id = '" + username + "'");
        if(rs.next()){

            String realPass = rs.getString(1);

            if(realPass.equals(userpass))
            {
                response.sendRedirect("mainpage.jsp?currentuser=" + username);
            }
        }
        rs.close();
        stmt.close();

        con.close();
        
    } catch(SQLException e) { 
        out.println("SQLException caught: " + e.getMessage()); 
    }

%>

</body>
</html>
