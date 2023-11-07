<%@ page import="java.sql.*"%>
<html>
    <head>
        <title>Pickup Finder</title>
    </head>
    <body>
        <h1>Pickup Finder</h1>
        <p><a href="browse_court.jsp">Browse Court</a></p>
        <p><a href="create_event.jsp">Create Event</a></p>
        <p><a href="login.jsp">Login</a></p>


        <p>Friends<p>

        <%
        String db = "pickup_finder";
        String user = "root";
        String password = "Pickle456"; // put your password in

        String currentuser = request.getParameter("currentuser");


        try {
            java.sql.Connection con; 
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/pickupfinder?autoReconnect=true&useSSL=false",user, password);
            //out.println(db + " database successfully opened.<br/><br/>");

            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT user2 FROM friends WHERE user1 = '" + currentuser + "'");
            while(rs.next()){

                out.println("<p>");
                out.println(rs.getString(1) + "<a href='login.jsp'>Message</a>");
                out.println("<p>");
            }

            rs = stmt.executeQuery("SELECT user1 FROM friends WHERE user2 = '" + currentuser + "'");
            while(rs.next()){
                out.println("<p>");
                out.println(rs.getString(1) + "<a href='login.jsp'>Message</a>");
                out.println("<p>");
            }
            rs.close();

            stmt.close();

            con.close();

        } catch(SQLException e) { 
            //out.println("SQLException caught: " + e.getMessage()); 
        }


        %>
    </body>
</html>