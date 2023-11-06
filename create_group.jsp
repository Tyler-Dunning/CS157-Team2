<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>

<html>
    <body>
        <h1>Create group</h1>
        <form>
            <label for="type">Enter Group ID:</label><br>
            <input type="text" id="group" name="groupid" required><br><br>    
            
            <label for="description">Description:</label><br>
            <input type="text" id="description" name="description"><br><br>

            <label>Group Visibility:</label><br>
            <input type="radio" name="groupIsPrivate" value="true" id="privateRadio" required>
            <label for="privateRadio">Private</label><br>
    
            <input type="radio" name="groupIsPrivate" value="false" id="publicRadio">
            <label for="publicRadio">Public</label><br><br>

            <input type="submit" value="Create"><br><br>
        </form>
        <% 
            String db = "pickup_finder";
            String user; // assumes database name is the same as username
            user = "root";
            String password = "???"; // put your password in
            String gid = request.getParameter("groupid");
            String description = request.getParameter("description");
            String privateStr = request.getParameter("groupIsPrivate");
            int isPrivate = "true".equals(privateStr) ? 1 : 0;


            try {
                java.sql.Connection con; 
                Class.forName("com.mysql.jdbc.Driver");
                con = DriverManager.getConnection("jdbc:mysql://localhost:3306/pickup_finder?autoReconnect=true&useSSL=false",user, password);
                //out.println(db + " database successfully opened.<br/><br/>");
                
                Statement stmt = con.createStatement();
                int result = stmt.executeUpdate("INSERT INTO playerGroups(group_id, group_is_private, group_desc) values('"+ gid + "','" + isPrivate + "','" + description + "')");
                
                stmt.close();
                con.close();
                if (result > 0) {
                    %>
                    <h3>Group Inserted Successfully!</h3>
                    <%
                } else {
                    %>
                    <h3>Failed to Insert Group.</h3>
                    <%
                }
            } catch(SQLException e) { 
                out.println("SQLException caught: " + e.getMessage()); 
            }
        %>
    </body>
</html> 