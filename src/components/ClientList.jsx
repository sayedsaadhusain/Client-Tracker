
import React, { useState, useMemo } from "react";
import { useOutreach } from "@/contexts/OutreachContext";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

function ClientList() {
  const { outreaches } = useOutreach();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPlatform, setFilterPlatform] = useState("all");

  const filteredOutreaches = useMemo(() => {
    return outreaches
      .filter(outreach => 
        outreach.clientName.toLowerCase().includes(search.toLowerCase()) ||
        outreach.notes?.toLowerCase().includes(search.toLowerCase())
      )
      .filter(outreach => filterStatus === "all" ? true : outreach.status === filterStatus)
      .filter(outreach => filterPlatform === "all" ? true : outreach.platform === filterPlatform)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [outreaches, search, filterStatus, filterPlatform]);

  const platforms = ["all", ...new Set(outreaches.map(o => o.platform))];
  const statuses = ["all", "Waiting", "No Response", "Deal Done ✅", "Follow-up Scheduled"];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-500 mb-8">Client List</h1>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Search clients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex gap-4">
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
          <select
            value={filterPlatform}
            onChange={(e) => setFilterPlatform(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {platforms.map(platform => (
              <option key={platform} value={platform}>
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {statuses.map(status => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  </div>

  <div className="divide-y divide-gray-200 dark:divide-gray-700">
    {filteredOutreaches.map((outreach, index) => (
      <motion.div
        key={outreach.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="font-medium text-gray-700 dark:text-gray-200">{outreach.clientName}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {outreach.platform} - {outreach.outreachType}
            </p>
            {outreach.notes && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{outreach.notes}</p>
            )}
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {format(new Date(outreach.createdAt), "MMM d, yyyy")}
            </span>
            <span className={cn(
              "px-2 py-1 text-sm rounded-full",
              outreach.status === "Deal Done ✅" && "bg-green-100 text-green-800 dark:bg-green-200/20 dark:text-green-400",
              outreach.status === "Waiting" && "bg-yellow-100 text-yellow-800 dark:bg-yellow-200/20 dark:text-yellow-400",
              outreach.status === "No Response" && "bg-red-100 text-red-800 dark:bg-red-200/20 dark:text-red-400",
              outreach.status === "Follow-up Scheduled" && "bg-blue-100 text-blue-800 dark:bg-blue-200/20 dark:text-blue-400"
            )}>
              {outreach.status}
            </span>
            {outreach.followUpDate && (
              <span className="text-sm text-purple-600 dark:text-purple-400">
                Follow-up: {format(new Date(outreach.followUpDate), "MMM d, yyyy")}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    ))}
    {filteredOutreaches.length === 0 && (
      <div className="p-8 text-center text-gray-500 dark:text-gray-400">
        No outreach activities found matching your filters.
      </div>
    )}
  </div>
</div>

    </div>
  );
}

export default ClientList;
