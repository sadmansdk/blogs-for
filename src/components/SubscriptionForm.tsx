import { useState } from "react";
import { addSubscription } from "@/lib/firestore";
import { motion } from "framer-motion";

interface SubscriptionFormProps {
  className?: string;
}

const SubscriptionForm = ({ className = "" }: SubscriptionFormProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      await addSubscription(email);
      setStatus("success");
      setMessage("Thank you for subscribing!");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-l-md text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blog-primary"
            required
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-blog-primary px-4 py-2 rounded-r-md hover:bg-blog-secondary transition-colors text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </div>
        {message && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-sm ${
              status === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </motion.p>
        )}
      </form>
    </div>
  );
};

export default SubscriptionForm; 