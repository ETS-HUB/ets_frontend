"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Logout03Icon } from "hugeicons-react";
import { createClient } from "@/lib/supabase-browser";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        toast.error("Failed to logout");
        return;
      }

      toast.success("Logged out successfully");
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 text-secondary w-full cursor-pointer transition-colors"
    >
      <Logout03Icon className="w-5 h-5" />
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}
