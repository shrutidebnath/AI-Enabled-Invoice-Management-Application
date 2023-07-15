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
 * Servlet implementation class AddServlet
 */
@WebServlet("/AddServlet")
public class AddServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private InvoiceDaoImpl invoiceDaoImpl;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public AddServlet() {
		super();
		try {
			invoiceDaoImpl = new InvoiceDaoImpl();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		// TODO Auto-generated constructor stub
	}

	public void addInvoice(Invoice invoice) throws SQLException {
		invoiceDaoImpl.insertInvoice(invoice);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
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
		Invoice inv = gson.fromJson(jsonData, Invoice.class);
		
		try {
			addInvoice(inv);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		PrintWriter out = response.getWriter();
		
		out.println("Data added successfully");

		
		out.close();
	}
}
