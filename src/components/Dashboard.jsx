
import React from "react";
import { useOutreach } from "@/contexts/OutreachContext";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Users, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

function Dashboard() {
  const { outreaches } = useOutreach();
  const navigate = useNavigate();

  const today = new Date();
  const todayOutreaches = outreaches.filter(
    outreach => format(new Date(outreach.createdAt), "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
  );

  const stats = {
    contacted: todayOutreaches.length,
    deals: todayOutreaches.filter(o => o.status === "Deal Done ✅").length,
    pending: outreaches.filter(o => o.status === "Waiting").length,
    followUps: outreaches.filter(o => o.followUpDate && new Date(o.followUpDate) >= today).length
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold text-gray-500">
  Dashboard
</h1>
        <Button onClick={() => navigate("/add")} className="bg-blue-600 hover:bg-blue-700">
          <PlusCircle className="w-5 h-5 mr-2" />
          New Outreach
        </Button>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <motion.div variants={item} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Contacted Today</p>
              <p className="text-2xl font-bold text-gray-500">{stats.contacted}</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Deals Closed Today</p>
              <p className="text-2xl font-bold text-gray-500">{stats.deals}</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Responses</p>
              <p className="text-2xl font-bold text-gray-500">{stats.pending}</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Upcoming Follow-ups</p>
              <p className="text-2xl font-bold text-gray-500">{stats.followUps}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-500 mb-4">Today's Outreach</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {todayOutreaches.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {todayOutreaches.map((outreach) => (
                <div key={outreach.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-500">{outreach.clientName}</h3>
                      <p className="text-sm text-gray-600">{outreach.platform} - {outreach.outreachType}</p>
                    </div>
                    <span className={cn(
                      "px-2 py-1 text-sm rounded-full",
                      outreach.status === "Deal Done ✅" && "bg-green-100 text-green-800",
                      outreach.status === "Waiting" && "bg-yellow-100 text-yellow-800",
                      outreach.status === "No Response" && "bg-red-100 text-red-800",
                      outreach.status === "Follow-up Scheduled" && "bg-blue-100 text-blue-800"
                    )}>
                      {outreach.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No outreach activities today. Start by adding a new outreach Now!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
