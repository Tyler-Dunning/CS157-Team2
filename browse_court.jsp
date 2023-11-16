<%@ page import="java.sql.*"%>
<html>
  <head>
    <title>Browse Courts</title>
  </head>
  <body>
    <h1>Browse Court</h1>
    <style>
      table {
        border-collapse: collapse;
      }
    
      td.address {
        padding-left: 20px;
        padding-right: 20px;
      }
    </style>

    <table border="1">
      <tr>
        <td>Court ID</td>
        <td class="address">address</td>
        <td>Number of Hoops</td>
        <td>Condition</td>
      </tr>
    </table>
    <% 
     String db = "pickup_finder";
        String user; // assumes database name is the same as username
          user = "root";
        String password = "???"; // put your password in
        String currentuser = request.getParameter("currentuser");
        try {
            
            java.sql.Connection con; 
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/pickupfinder?autoReconnect=true&useSSL=false",user, password);
            //out.println(db + " database successfully opened.<br/><br/>");
            
            out.println("Initial entries in table \"courts\": <br/>");
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM courts");
            while (rs.next()) {
                out.println(rs.getInt(1) + " | " + rs.getString(2) + " | " + rs.getString(3) + " | " + rs.getString(4) + " | " + rs.getInt(5) + " | " + rs.getString(6) +  "<br/>");
                Statement tempStatement = con.createStatement();
                ResultSet tempRs = tempStatement.executeQuery("SELECT COUNT(*) FROM useroncourt WHERE court_id = " + rs.getInt(1));
                int c = 0;
                if(tempRs.next())
                {
                  c = tempRs.getInt(1);
                }
                out.println("Current players: " + c + " <a href='court_view.jsp?courtID=" + rs.getInt(1) + "&currentuser=" + currentuser + "' >View Court</a><br><br>");
                
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
