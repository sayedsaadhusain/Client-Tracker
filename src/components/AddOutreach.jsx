
import React from "react";
import { useOutreach } from "@/contexts/OutreachContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

function AddOutreach() {
  const { addOutreach } = useOutreach();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    try {
      addOutreach(data);
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add outreach",
        variant: "destructive"
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <h1 className="text-2xl font-bold text-gray-500 mb-8">Add New Outreach 📝</h1>

      <form className="space-y-6 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Client Name</label>
    <input type="text" name="clientName" required
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500" />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Platform</label>
    <select name="platform" required
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
      <option value="LinkedIn">LinkedIn</option>
      <option value="Email">Email</option>
      <option value="Fiverr">Fiverr</option>
      <option value="Upwork">Upwork</option>
      <option value="Facebook">Facebook</option>
      <option value="Instagram">Instagram</option>
    </select>
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Outreach Type</label>
    <select name="outreachType" required
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
      <option value="DM">DM</option>
      <option value="Cold Email">Cold Email</option>
      <option value="Gig Proposal">Gig Proposal</option>
      <option value="Post Comment">Post Comment</option>
      <option value="Direct Call">Direct Call</option>
    </select>
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
    <select name="status" required
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
      <option value="Waiting">Waiting</option>
      <option value="No Response">No Response</option>
      <option value="Deal Done ✅">Deal Done ✅</option>
      <option value="Follow-up Scheduled">Follow-up Scheduled</option>
    </select>
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Follow-up Date</label>
    <input type="date" name="followUpDate"
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Notes</label>
    <textarea name="notes" rows="3"
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"></textarea>
  </div>

  <div className="flex justify-end space-x-4">
    <button type="button"
      className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-gray-300 dark:border-gray-600 bg-background dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 h-10 px-4 py-2">
      Cancel
    </button>
    <button type="submit"
      className="inline-flex items-center justify-center rounded-md text-sm font-medium text-white h-10 px-4 py-2 bg-blue-600 hover:bg-blue-700">
      Add Outreach
    </button>
  </div>
</form>

    </motion.div>
  );
}

export default AddOutreach;
