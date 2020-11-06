package nl.hva.ewa;

import org.junit.Test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class TestConnection {

    private Connection dbConnection;

    @Test
    public void getConnection() throws ClassNotFoundException, SQLException {
        final String JDBCURL = "jdbc:mysql://oege.ie.hva.nl/zveermaz";
        final String USER = "veermaz";
        final String PASS = "joG2oKTQ5pTb+y";

        Class.forName("com.mysql.cj.jdbc.Driver");
        dbConnection = DriverManager.getConnection(JDBCURL, USER, PASS);
//        System.out.println(dbConnection.isValid(10));

        if(dbConnection.isValid(10)){
            System.out.println("connected");

        }else{
            System.out.println("fout");
        }

    }




}
