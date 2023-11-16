<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>
<!DOCTYPE html>
<html>
<head>
    <title>Create Account</title>
</head>
<body>

<h2>Create Account</h2>

<form>
    <label for="username">Username:</label><br>
    <input type="text" id="username" name="username"><br><br>

    <label for="password">Password:</label><br>
    <input type="password" id="password" name="password"><br><br>

    <label for="email">Email:</label><br>
    <input type="email" id="email" name="email"><br><br>

    <input type="submit" value="Verify Account"><br><br>
</form>
<% 
            String db = "pickup_finder";
            String user; // assumes database name is the same as username
            user = "root";
        String password = "???"; // put your password in
            String username = request.getParameter("username");
            String userPass = request.getParameter("password");
            String email = request.getParameter("email");
            String uid = username + userPass;
            try {
                
                java.sql.Connection con; 
                Class.forName("com.mysql.jdbc.Driver");
                con = DriverManager.getConnection("jdbc:mysql://localhost:3306/pickup_finder?autoReconnect=true&useSSL=false",user, password);
                //out.println(db + " database successfully opened.<br/><br/>");
                
                Statement stmt = con.createStatement();
                int result = stmt.executeUpdate("INSERT INTO user_accounts(userid, username, password, email) values('"+ uid + "','" + username + "','" + userPass + "','" + email + "')");
                
                stmt.close();
                con.close();
            } catch(SQLException e) { 
                out.println("SQLException caught: " + e.getMessage()); 
            }
        %>
</body>
</html>





