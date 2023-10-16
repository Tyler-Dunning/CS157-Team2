<%@ page import="java.sql.*"%>
<html>
  <head>
    <title>Three Tier Architecture Demo</title>
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
        String password = "thomasoh5";
        try {
            
            java.sql.Connection con; 
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/pickup_finder?autoReconnect=true&useSSL=false",user, password);
            //out.println(db + " database successfully opened.<br/><br/>");
            
            out.println("Initial entries in table \"courts\": <br/>");
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM courts");
            while (rs.next()) {
                out.println(rs.getInt(1) + " | " + rs.getString(2) + " | " + rs.getInt(3) + " | " + rs.getFloat(4) + "<br/><br/>");
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