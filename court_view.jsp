<%@ page import="java.sql.*"%>
<html>
    <head>
        <title>View Court</title>
        <h1>Court: <%= request.getParameter("courtID")%></h1>
    </head>
    
    <div>
        <%
            String db = "pickup_finder";
            String user; // assumes database name is the same as username
            user = "root";
        String password = "???"; // put your password in
            String currentuser = request.getParameter("currentuser");
            String court = request.getParameter("courtID");
            boolean isJoined = false;

            try {
                
                java.sql.Connection con; 
                Class.forName("com.mysql.jdbc.Driver");
                con = DriverManager.getConnection("jdbc:mysql://localhost:3306/pickupfinder?autoReconnect=true&useSSL=false",user, password);
                //out.println(db + " database successfully opened.<br/><br/>");
                
                out.println("Users on Court<br/>");
                Statement stmt = con.createStatement();
                ResultSet rs = stmt.executeQuery("SELECT user_id FROM useroncourt WHERE court_id = " + court);

                while (rs.next()) {
                    out.println(rs.getString(1) + "<br>");
                    if(rs.getString(1).equals(currentuser)) {isJoined = true;}
                }
                rs.close();
                stmt.close();
                con.close();
                                
            } catch(SQLException e) { 
                out.println("SQLException caught: " + e.getMessage()); 
            }

        %>
    </div>

        <div>
    
        <form>
            <input type="hidden" name="court" id="court" value="<%= request.getParameter("courtID") %>">
            <input type="hidden" name="user" id="user" value="<%= request.getParameter("currentuser") %>">

            <input type="submit" value="Join Court">
        </form>
        <%
            String userF = request.getParameter("user");
            String courtF = request.getParameter("court");

            try {
                
                java.sql.Connection con; 
                Class.forName("com.mysql.jdbc.Driver");
                con = DriverManager.getConnection("jdbc:mysql://localhost:3306/pickupfinder?autoReconnect=true&useSSL=false",user, password);
                //out.println(db + " database successfully opened.<br/><br/>");

                String sql = "INSERT INTO useroncourt(user_id, court_id) VALUES(?,?)";
                PreparedStatement stmt = con.prepareStatement(sql);

                stmt.setString(1, userF);
                int courtInt = 0;
                if(userF != null) {courtInt = Integer.parseInt(courtF);}
                stmt.setInt(2, courtInt);

                int result = stmt.executeUpdate();

                stmt.close();
                con.close();
                
                response.sendRedirect("court_view.jsp?currentuser=" + userF + "&courtID=" + courtF);
                                
            } 
            catch(SQLException e) { 
                out.println("SQLException caught: " + e.getMessage()); 
            }
            

        %>

    </div>
    
    <% out.println("<a href='browse_court.jsp?currentuser=" + request.getParameter("currentuser") + "'>Back to Browse</a>"); %>
    
</html>