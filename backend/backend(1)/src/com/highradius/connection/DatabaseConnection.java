package com.highradius.connection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.highradius.model.Invoice;

public class DatabaseConnection {

	private static List<Invoice> invoices;
	Statement statement;

	public DatabaseConnection() throws SQLException {
		// Database connection details
		String url = "jdbc:mysql://localhost:3306/h2h"; // JDBC URL for connecting to the database
		String name = "root"; // UserName
		String password = "12345678"; // Password

		// SQL query to retrieve data
		try {
			// Load the MySQL JDBC driver
			Class.forName("com.mysql.cj.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		try {
			// Establish the database connection
			Connection con = DriverManager.getConnection(url, name, password);
			statement = con.createStatement();

		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public void addInvoice(Invoice invoice) throws SQLException {
		String query = "INSERT INTO h2h_oap (CUSTOMER_ORDER_ID, SALES_ORG, DISTRIBUTION_CHANNEL, DIVISION, RELEASED_CREDIT_VALUE,PURCHASE_ORDER_TYPE, COMPANY_CODE, ORDER_CREATION_DATE,ORDER_CREATION_TIME, CREDIT_CONTROL_AREA, SOLD_TO_PARTY,ORDER_AMOUNT, REQUESTED_DELIVERY_DATE, ORDER_CURRENCY, CREDIT_STATUS,CUSTOMER_NUMBER, AMOUNT_IN_USD, UNIQUE_CUST_ID) VALUES ("
				+ invoice.getCUSTOMER_ORDER_ID() + "," + invoice.getSALES_ORG() + ",'"
				+ invoice.getDISTRIBUTION_CHANNEL() + "','" + invoice.getDIVISION() + "',"
				+ invoice.getRELEASED_CREDIT_VALUE() + ",'" + invoice.getPURCHASE_ORDER_TYPE() + "',"
				+ invoice.getCOMPANY_CODE() + ",'" + invoice.getORDER_CREATION_DATE() + "','"
				+ invoice.getORDER_CREATION_TIME() + "','" + invoice.getCREDIT_CONTROL_AREA() + "',"
				+ invoice.getSOLD_TO_PARTY() + "," + invoice.getORDER_AMOUNT() + ",'"
				+ invoice.getREQUESTED_DELIVERY_DATE() + "','" + invoice.getORDER_CURRENCY() + "','"
				+ invoice.getCREDIT_STATUS() + "'," + invoice.getCUSTOMER_NUMBER() + "," + invoice.getAMOUNT_IN_USD()
				+ "," + invoice.getUNIQUE_CUST_ID() + ")";
		statement.executeUpdate(query);

	}

	public List<Invoice> getInvoices() throws SQLException {
		invoices = new ArrayList<>();
		String query = "SELECT * FROM h2h_oap LIMIT 2000";
		ResultSet result = statement.executeQuery(query);
		
		while (result.next()) {
			Invoice inv = new Invoice();
			inv.setID(result.getInt(1));
			inv.setCUSTOMER_ORDER_ID(result.getInt(2));
			inv.setSALES_ORG(result.getInt(3));
			inv.setDISTRIBUTION_CHANNEL(result.getString(4));
			inv.setDIVISION(result.getString(5));
			inv.setRELEASED_CREDIT_VALUE(result.getDouble(6));
			inv.setPURCHASE_ORDER_TYPE(result.getString(7));
			inv.setCOMPANY_CODE(result.getInt(8));
			inv.setORDER_CREATION_DATE(result.getString(9));
			inv.setORDER_CREATION_TIME(result.getString(10));
			inv.setCREDIT_CONTROL_AREA(result.getString(11));
			inv.setSOLD_TO_PARTY(result.getInt(12));
			inv.setORDER_AMOUNT(result.getDouble(13));
			inv.setREQUESTED_DELIVERY_DATE(result.getString(14));
			inv.setORDER_CURRENCY(result.getString(15));
			inv.setCREDIT_STATUS(result.getString(16));
			inv.setCUSTOMER_NUMBER(result.getInt(17));
			inv.setAMOUNT_IN_USD(result.getDouble(18));
			inv.setUNIQUE_CUST_ID(result.getLong(19));
			invoices.add(inv);

		}
		result.close();
		return invoices;
	}

	public void updateInvoice(int id, Invoice invoice) throws SQLException {
		String query = "UPDATE h2h_oap SET CUSTOMER_ORDER_ID =" + invoice.getCUSTOMER_ORDER_ID() + ", SALES_ORG = "
				+ invoice.getSALES_ORG() + ", DISTRIBUTION_CHANNEL = '" + invoice.getDISTRIBUTION_CHANNEL()
				+ "', DIVISION = '" + invoice.getDIVISION() + "', RELEASED_CREDIT_VALUE = '"
				+ invoice.getRELEASED_CREDIT_VALUE() + "',PURCHASE_ORDER_TYPE = '" + invoice.getPURCHASE_ORDER_TYPE()
				+ "', COMPANY_CODE = '" + invoice.getCOMPANY_CODE() + "', ORDER_CREATION_DATE = '"
				+ invoice.getORDER_CREATION_DATE() + "',ORDER_CREATION_TIME = '" + invoice.getORDER_CREATION_TIME()
				+ "', CREDIT_CONTROL_AREA = '" + invoice.getCREDIT_CONTROL_AREA() + "',SOLD_TO_PARTY = '"
				+ invoice.getSOLD_TO_PARTY() + "',ORDER_AMOUNT= '" + invoice.getSOLD_TO_PARTY()
				+ "', REQUESTED_DELIVERY_DATE = '" + invoice.getREQUESTED_DELIVERY_DATE() + "', ORDER_CURRENCY = '"
				+ invoice.getORDER_CURRENCY() + "', CREDIT_STATUS = '" + invoice.getCREDIT_STATUS()
				+ "',CUSTOMER_NUMBER = '" + invoice.getCUSTOMER_NUMBER() + "',AMOUNT_IN_USD = '"
				+ invoice.getAMOUNT_IN_USD() + "', UNIQUE_CUST_ID = '" + invoice.getUNIQUE_CUST_ID()
				+ "' WHERE Sl_no = " + id;
		statement.executeUpdate(query);

	}

	private static String buildDeleteQuery(int[] idList) {
		StringBuilder queryBuilder = new StringBuilder();
		queryBuilder.append("DELETE FROM h2h_oap WHERE Sl_no IN (");
		for (int i = 0; i < idList.length; i++) {
			queryBuilder.append(idList[i]);
			if (i < idList.length - 1) {
				queryBuilder.append(", ");
			}
		}
		queryBuilder.append(");");
		return queryBuilder.toString();
	}

	public void deleteInvoice(int[] idList) throws SQLException {
		String query = buildDeleteQuery(idList);
		statement.executeUpdate(query);
	}
}
