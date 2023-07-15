package com.highradius.implementation;

import java.sql.SQLException;
import java.util.List;

import com.highradius.model.Invoice;

public interface InvoiceDao {
	List<Invoice> getInvoices() throws SQLException;

	void insertInvoice(Invoice invoice) throws SQLException;

	void updateInvoice(int id, Invoice invoice) throws SQLException;

	void deleteInvoice(int[] idList) throws SQLException;
}
