package com.highradius.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.highradius.implementation.InvoiceDaoImpl;
import com.highradius.model.Invoice;

/**
 * Servlet implementation class DataLoadingServlet
 */
@WebServlet("/DataLoadingServlet")
public class DataLoadingServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private InvoiceDaoImpl invoiceDaoImpl;
	
	List<Invoice> theList;

	/**
	 * @throws SQLException
	 * @see HttpServlet#HttpServlet()
	 */
	public DataLoadingServlet() {
		super();
		try {
			invoiceDaoImpl = new InvoiceDaoImpl();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		// TODO Auto-generated constructor stub
	}

	public List<Invoice> getInvoice() throws SQLException {
		return invoiceDaoImpl.getInvoices();
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "GET PUT DELETE POST");
		response.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");

		try {
			
			theList = getInvoice();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		// TODO Auto-generated method stub
		response.setContentType("application/json");

		
		PrintWriter out = response.getWriter();

		
		Gson gson = new Gson();
		String jsonString = gson.toJson(theList);

		
		out.println(jsonString);

		// Close the output stream
		out.close();
	}
}
