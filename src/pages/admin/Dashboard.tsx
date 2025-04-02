import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogManagement from "./BlogManagement";
import SubscriptionManagement from "@/components/admin/SubscriptionManagement";
import { FileText, Mail, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"blog" | "subscriptions">("blog");
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/admin/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button
          onClick={handleSignOut}
          variant="outline"
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 mb-8 border-b">
        <button
          onClick={() => setActiveTab("blog")}
          className={`flex items-center space-x-2 px-4 py-2 ${
            activeTab === "blog"
              ? "border-b-2 border-blog-primary text-blog-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <FileText className="w-5 h-5" />
          <span>Blog Posts</span>
        </button>
        <button
          onClick={() => setActiveTab("subscriptions")}
          className={`flex items-center space-x-2 px-4 py-2 ${
            activeTab === "subscriptions"
              ? "border-b-2 border-blog-primary text-blog-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Mail className="w-5 h-5" />
          <span>Subscriptions</span>
        </button>
      </div>

      {/* Content */}
      <div className="mt-8">
        {activeTab === "blog" ? (
          <BlogManagement />
        ) : (
          <SubscriptionManagement />
        )}
      </div>
    </div>
  );
};

export default Dashboard; 