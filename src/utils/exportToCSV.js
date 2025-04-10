
export function exportToCSV(outreaches) {
  const headers = [
    "Client Name",
    "Platform",
    "Outreach Type",
    "Status",
    "Follow-up Date",
    "Notes",
    "Created At"
  ];

  const csvContent = [
    headers.join(","),
    ...outreaches.map(outreach => [
      `"${outreach.clientName}"`,
      `"${outreach.platform}"`,
      `"${outreach.outreachType}"`,
      `"${outreach.status}"`,
      outreach.followUpDate || "",
      `"${outreach.notes || ""}"`,
      new Date(outreach.createdAt).toLocaleDateString()
    ].join(","))
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", `outreach_data_${new Date().toISOString().split("T")[0]}.csv`);
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
