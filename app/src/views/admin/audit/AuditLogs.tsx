import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState('');
  const [user, setUser] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  useEffect(() => { fetchLogs(); }, []);
  const fetchLogs = async () => {
    // Replace with real API call
    const res = await fetch(`/api/admin/audit?user=${user}&action=${search}&from=${from}&to=${to}`);
    setLogs(await res.json());
  };

  const exportCSV = () => {
    const ws = XLSX.utils.json_to_sheet(logs);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'AuditLogs');
    XLSX.writeFile(wb, 'audit_logs.xlsx');
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Audit Logs', 14, 16);
    doc.autoTable({
      head: [['User', 'Action', 'Resource', 'Resource ID', 'Timestamp']],
      body: logs.map(l => [l.user_email, l.action, l.resource, l.resource_id, l.timestamp]),
    });
    doc.save('audit_logs.pdf');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Audit Logs</h1>
      <div className="flex gap-2 mb-4">
        <input placeholder="User" value={user} onChange={e => setUser(e.target.value)} className="border p-2 rounded" />
        <input placeholder="Action" value={search} onChange={e => setSearch(e.target.value)} className="border p-2 rounded" />
        <input type="date" value={from} onChange={e => setFrom(e.target.value)} className="border p-2 rounded" />
        <input type="date" value={to} onChange={e => setTo(e.target.value)} className="border p-2 rounded" />
        <button onClick={fetchLogs} className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
        <button onClick={exportCSV} className="bg-green-600 text-white px-4 py-2 rounded">Export CSV</button>
        <button onClick={exportPDF} className="bg-gray-600 text-white px-4 py-2 rounded">Export PDF</button>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Action</th>
            <th className="p-2 border">Resource</th>
            <th className="p-2 border">Resource ID</th>
            <th className="p-2 border">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, i) => (
            <tr key={i}>
              <td className="p-2 border">{log.user_email}</td>
              <td className="p-2 border">{log.action}</td>
              <td className="p-2 border">{log.resource}</td>
              <td className="p-2 border">{log.resource_id}</td>
              <td className="p-2 border">{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}