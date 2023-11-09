<%@ page import="java.sql.*"%>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chat Message System</title>
</head>
<body>

  <div style="height:400px;width:800px;border:1px solid #ccc;font:16px/26px Georgia, Garamond, Serif;overflow:auto;">
    <%
    
        String db = "pickup_finder";
        String user = "root";
        String password = "???"; // put your password in
        try {
            
            java.sql.Connection con; 
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/pickupfinder?autoReconnect=true&useSSL=false",user, password);
            //out.println(db + " database successfully opened.<br/><br/>");
            
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT sender_id, content, time_sent FROM messages NATURAL JOIN messageinfriends where friendship_id = " + request.getParameter("friendID"));
            
            while (rs.next()) 
            {
                out.println(rs.getString(1) + ": " + rs.getString(2) + "<br/>" + rs.getString(3) + "<br/><br/>");
            }
            rs.close();
            stmt.close();
            con.close();
        } catch(SQLException e) { 
            out.println("SQLException caught: " + e.getMessage()); 
        }

    %>
  </div>

  <form>
    <label for="message-input">Message:</label><br>
    <input type="text" id="message-input" name="message-input">

    <input type="hidden" id="current" name="current" value= "<%= request.getParameter("currentuser") %>">
    <input type="hidden" id="friend" name="friend" value= "<%= request.getParameter("friendID") %>">

    <input type="submit" value="Send">

  </form>

    <%
        if(request.getParameter("message-input") != null && request.getParameter("friend") != null && request.getParameter("current") != null){
        String content = request.getParameter("message-input");
        String sender = request.getParameter("current");
        String friendString = request.getParameter("friend");
        int friend = 0;
        if(friendString != null && !friendString.equals("")) 
        {
            friend = Integer.parseInt(friendString);
        }
    

        try {
            
            java.sql.Connection con; 
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/pickupfinder?autoReconnect=true&useSSL=false",user, password);
            //out.println(db + " database successfully opened.<br/><br/>");
            
            String sql = "INSERT INTO messages(content, time_sent, sender_id) VALUES(?, ?, ?)";
            
            PreparedStatement stmt = con.prepareStatement(sql);
            stmt.setString(1, content);
            stmt.setTimestamp(2, new Timestamp(System.currentTimeMillis()));
            stmt.setString(3, sender);

            stmt.executeUpdate();
            stmt.close();

            
            Statement stamt = con.createStatement();
            ResultSet rs = stamt.executeQuery("SELECT LAST_INSERT_ID() FROM messages");

            int mID = 0;
            if (rs.next()) {
                mID = rs.getInt(1);
            }

            String sql2 = "INSERT INTO messageinfriends(message_id, friendship_id) VALUES(?, ?)";
            PreparedStatement stmt2 = con.prepareStatement(sql2);
            stmt2.setInt(1, mID);
            stmt2.setInt(2, friend);

            stmt2.executeUpdate();
            stmt2.close();


            con.close();
            response.sendRedirect("friend_chat.jsp?currentuser=" + sender + "&friendID=" + friend);
        } catch(SQLException e) { 
            out.println("SQLException caught: " + e.getMessage()); 
        }
        }

    %>
</body>
</html>
