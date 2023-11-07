<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>

<html>
    <body>
        <h1>Join Group</h1>
        <form>
            <label for="type">Enter Group ID:</label><br>
            <input type="text" id="group" name="groupid" required><br><br>    

            <label for="type">Enter User ID:</label><br>
            <input type="text" id="user" name="userid" required><br><br>    

            <input type="submit" value="Join"><br><br>
        </form>
        <% 
            String db = "pickup_finder";
            String user; 
            user = "root";
            String password = "???"; 
            String gid = request.getParameter("groupid");
            String uid = request.getParameter("userid");
            
            try {
                java.sql.Connection con; 
                Class.forName("com.mysql.jdbc.Driver");
                con = DriverManager.getConnection("jdbc:mysql://localhost:3306/"+db+"?autoReconnect=true&useSSL=false",user, password);
                
                Statement stmt = con.createStatement();
                ResultSet rs = stmt.executeQuery("SELECT group_is_private FROM pickup_finder.playerGroups WHERE group_id = '" + gid + "';");
                if(rs.next()) {
                    int groupIsPrivate = rs.getInt(1); 
                    if(groupIsPrivate == 1) {
                        int updateResult = stmt.executeUpdate("INSERT INTO userInGroup(user_id, group_id) values('"+ uid + "','" + gid + "')");
                        if(updateResult > 0) { // Check if the insert was successful
                            out.println("<h3>Group Joined!</h3>");
                        } else {
                            out.println("<h3>Failed to join the group.</h3>");
                        }
                    } else {
                        out.println("<h3>Failed to join, selected group is private.</h3>");
                    }

                } else {
                    // Handle the case where no results are returned
                    out.println("<h3>No matching groups found or group insertion failed.</h3>");
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