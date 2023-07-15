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
import com.highradius.model.Invoice;

/**
 * Servlet implementation class DataEditingServlet
 */
@WebServlet("/DataEditingServlet")
public class DataEditingServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private InvoiceDaoImpl invoiceDaoImpl;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public DataEditingServlet() {
		super();
		try {
			invoiceDaoImpl = new InvoiceDaoImpl();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		// TODO Auto-generated constructor stub
	}

	void InvoiceUpdate(int id, Invoice invoice) throws SQLException {
		invoiceDaoImpl.updateInvoice(id, invoice);
	}

	/**
	 * @see HttpServlet#doPut(HttpServletRequest, HttpServletResponse)
	 */
	protected void doPut(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "GET PUT DELETE POST");
		response.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
		response.setContentType("application/json");

		BufferedReader reader = new BufferedReader(new InputStreamReader(request.getInputStream()));
		StringBuilder jsonBuilder = new StringBuilder();
		String line;
		while ((line = reader.readLine()) != null) {
			jsonBuilder.append(line);
		}
		reader.close();

		String jsonData = jsonBuilder.toString();
	
		Gson gson = new Gson();
		ReceivedData_PUT recv = gson.fromJson(jsonData, ReceivedData_PUT.class);
		try {
			InvoiceUpdate(recv.id, recv.invoice);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		PrintWriter out = response.getWriter();
		
		out.println("Data edited successfully");

		// Close the output stream
		out.close();
	}
}

class ReceivedData_PUT {
	public int id;
	public Invoice invoice;
}
