import { useState, useEffect } from "react";
import { getSubscriptions, deleteSubscription } from "@/lib/firestore";
import { Mail, Calendar, Trash2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import AlertDialog from "@/components/ui/AlertDialog";

interface Subscription {
  id: string;
  email: string;
  subscribedAt: string;
}

const SubscriptionManagement = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    subscriptionId: string | null;
  }>({
    isOpen: false,
    subscriptionId: null,
  });

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const data = await getSubscriptions();
      setSubscriptions(data as Subscription[]);
    } catch (err) {
      setError("Failed to fetch subscriptions");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleteDialog({ isOpen: true, subscriptionId: id });
  };

  const confirmDelete = async () => {
    if (!deleteDialog.subscriptionId) return;

    try {
      await deleteSubscription(deleteDialog.subscriptionId);
      setSubscriptions(subscriptions.filter(sub => sub.id !== deleteDialog.subscriptionId));
    } catch (err) {
      setError("Failed to delete subscription");
      console.error(err);
    } finally {
      setDeleteDialog({ isOpen: false, subscriptionId: null });
    }
  };

  const handleExportCSV = () => {
    const csvContent = [
      ["Email", "Subscription Date"],
      ...subscriptions.map(sub => [
        sub.email,
        new Date(sub.subscribedAt).toLocaleDateString()
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscriptions-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blog-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Subscribed Email</h2>
        <Button
          onClick={handleExportCSV}
          className="bg-blog-primary hover:bg-blog-secondary text-white flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subscription Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subscriptions.map((subscription) => (
              <tr key={subscription.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-2" />
                    <div className="text-sm font-medium text-gray-900">
                      {subscription.email}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <div className="text-sm text-gray-500">
                      {new Date(subscription.subscribedAt).toLocaleDateString()}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(subscription.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {subscriptions.length === 0 && (
        <div className="text-center py-12">
          <Mail className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No subscriptions</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding a new subscription.
          </p>
        </div>
      )}

      <AlertDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, subscriptionId: null })}
        onConfirm={confirmDelete}
        title="Delete Subscription"
        description="Are you sure you want to delete this subscription? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default SubscriptionManagement; 