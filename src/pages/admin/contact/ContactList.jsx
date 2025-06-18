import React, { useEffect, useState } from "react";
import {
    SidebarProvider,
    SidebarTrigger,
} from "../../../components/ui/sidebar";
import { AppSidebar } from "../../../components/app-sidebar";
import { Pencil, Trash2, FileDown } from "lucide-react";
import * as XLSX from "xlsx";
import { contactRepository } from "../../../repositories/contactRepository";
import { EditDialog } from "../../../components/edit-dialog";
import { DeleteDialog } from "../../../components/delete-dialog";

const ContactList = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const [contacts, setContacts] = useState([]);

    const fetchContacts = async () => {
        try {
            const response = await contactRepository.getAllContacts();
            setContacts(response || []);
        } catch (error) {
            console.error("Failed to fetch contacts:", error);
        }
    };

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredContacts);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");
        XLSX.writeFile(workbook, "contacts.xlsx");
    };

    const filteredContacts = contacts.filter(
        (c) =>
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.phone.includes(searchTerm)
    );

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="p-4 bg-gray-50 min-h-screen w-full">
                <SidebarTrigger />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <h1 className="text-xl sm:text-2xl font-bold">
                        Contact List
                    </h1>
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
                    >
                        <FileDown className="w-4 h-4" />
                        Export
                    </button>
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full sm:w-1/2 px-4 py-2 border rounded shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="w-full overflow-x-auto">
                    <table className="min-w-full bg-white border rounded shadow text-sm">
                        <thead className="bg-gray-100 text-left font-semibold text-gray-600">
                            <tr>
                                <th className="px-4 py-3 whitespace-nowrap">
                                    Name
                                </th>
                                <th className="px-4 py-3 whitespace-nowrap">
                                    Email
                                </th>
                                <th className="px-4 py-3 whitespace-nowrap">
                                    Message
                                </th>
                                <th className="px-4 py-3 whitespace-nowrap">
                                    Created At
                                </th>
                                <th className="px-4 py-3 text-center whitespace-nowrap">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {filteredContacts.length > 0 ? (
                                filteredContacts.map((contact) => (
                                    <tr
                                        key={contact.id}
                                        className="border-t hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            {contact.name}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            {contact.email}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            {contact.message}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            {new Date(
                                                contact.created_at
                                            ).toLocaleDateString("en-GB")}
                                        </td>

                                        <td className="px-4 py-3 flex justify-center gap-3 whitespace-nowrap">
                                            <EditDialog
                                                id={contact.id}
                                                onUpdateSuccess={fetchContacts}
                                            />
                                            <DeleteDialog
                                                id={contact.id}
                                                onContactDeleted={fetchContacts}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="px-4 py-3 text-center text-gray-400"
                                    >
                                        No contacts found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </SidebarProvider>
    );
};

export default ContactList;
