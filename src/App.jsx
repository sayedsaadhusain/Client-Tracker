
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Dashboard from "@/components/Dashboard";
import ClientList from "@/components/ClientList";
import AddOutreach from "@/components/AddOutreach";
import Analytics from "@/components/Analytics";
import Layout from "@/components/Layout";
import { OutreachProvider } from "@/contexts/OutreachContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <OutreachProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/clients" element={<ClientList />} />
              <Route path="/add" element={<AddOutreach />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </Layout>
          <Toaster />
        </Router>
      </OutreachProvider>
    </ThemeProvider>
  );
}

export default App;
