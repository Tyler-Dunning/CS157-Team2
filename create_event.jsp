<%@ page import="java.sql.*"%>
<%@ page import="java.util.*"%>

<html>
    <body>
        <h1>Create event</h1>
        
        <form>
            <label for="type">Event Name:</label><br>
            <input type="text" id="type" name="type"><br><br>

            <label for="max">Max Teams:</label><br>
            <input type="text" id="max" name="max"><br><br>

            <label for="team_size">Team Size:</label><br>
            <input type="text" id="team_size" name="team_size"><br><br>
            
            <label for="date">Date:</label><br>
            <input type="date" id="date" name="date"><br><br>
            
            <label for="time">Start Time:</label><br>
            <input type="text" id="time" name="time"><br><br>
            
            <label for="description">Description:</label><br>
            <input type="text" id="description" name="description"><br><br>

            <label for="court_id">Court:</label><br>
            <input type="text" id="court_id" name="court_id"><br><br>

            <input type="submit" value="Create"><br><br>

            
        </form>
        <% 
            String db = "pickup_finder";
            String user; // assumes database name is the same as username
            user = "root";
            String password = "Pickle456"; // put your password in

            String eid = request.getParameter("type");
            String d = request.getParameter("date");
            String sizeString = request.getParameter("team_size");
            String maxString = request.getParameter("max");
            String description = request.getParameter("description");
            String court_idString = request.getParameter("court_id");
            String startTime = request.getParameter("time");

            try {
                
                java.sql.Connection con; 
                Class.forName("com.mysql.jdbc.Driver");
                con = DriverManager.getConnection("jdbc:mysql://localhost:3306/pickupfinder?autoReconnect=true&useSSL=false",user, password);
                //out.println(db + " database successfully opened.<br/><br/>");
                
                String sql = "INSERT INTO playerEvents(event_name, court_id, event_date, max_teams, team_size, event_desc) VALUES(?, ?, ?, ?, ?, ?)";
                PreparedStatement preparedStatement = con.prepareStatement(sql);
                preparedStatement.setString(1, eid);
                preparedStatement.setString(2, court_idString);
                preparedStatement.setString(3, d + " " + startTime);
                preparedStatement.setString(4, maxString);
                preparedStatement.setString(5, sizeString);
                preparedStatement.setString(6, description);

                int result = preparedStatement.executeUpdate();

                preparedStatement.close();


                con.close();
            } catch(SQLException e) { 
                out.println("SQLException caught: " + e.getMessage()); 
            }
        %>
    </body>
</html> 