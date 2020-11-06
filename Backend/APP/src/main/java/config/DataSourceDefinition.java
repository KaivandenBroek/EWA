package config;

import javax.ejb.Stateless;

@javax.annotation.sql.DataSourceDefinition(
        name = "java:comp/env/jdbc/Ziggo_EWA",
        className = "com.mysql.cj.jdbc.MysqlXADataSource",
        url = "jdbc:mysql://oege.ie.hva.nl:3306/zveermaz",
        user = "veermaz",
        password = "joG2oKTQ5pTb+y")
@Stateless

public class DataSourceDefinition {
}
