package com.highradius.servlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.highradius.implementation.InvoiceDaoImpl;

/**
 * Servlet implementation class DataDeletingServlet
 */
@WebServlet("/DataDeletingServlet")
public class DataDeletingServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private InvoiceDaoImpl invoiceDaoImpl;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public DataDeletingServlet() {
		super();
		try {
			invoiceDaoImpl = new InvoiceDaoImpl();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		// TODO Auto-generated constructor stub
	}

	public void deleteInvoice(int[] idList) throws SQLException {
		invoiceDaoImpl.deleteInvoice(idList);
	}

	/**
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "GET PUT DELETE POST");
		response.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
		BufferedReader reader = new BufferedReader(new InputStreamReader(request.getInputStream()));
		StringBuilder jsonBuilder = new StringBuilder();
		String line;
		while ((line = reader.readLine()) != null) {
			jsonBuilder.append(line);
		}
		reader.close();

		String jsonData = jsonBuilder.toString();
		
		Gson gson = new Gson();
		ReceivedData_Delete recv = gson.fromJson(jsonData, ReceivedData_Delete.class);
		
		try {
			deleteInvoice(recv.idList);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		PrintWriter out = response.getWriter();
		
		out.println("Data deleted successfully");

		
		out.close();
	}

}

class ReceivedData_Delete {
	public int[] idList;
}
