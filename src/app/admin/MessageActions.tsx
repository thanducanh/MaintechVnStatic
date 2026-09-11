"use client";

import { deleteMessage, restoreMessage, permanentlyDeleteMessage } from "@/actions/contact";
import { Trash2, RefreshCw, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function DeleteMessageButton({ id }: { id: number }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Chuyển tin nhắn này vào thùng rác?")) return;
    const res = await deleteMessage(id);
    if (res.error) toast.error(res.error);
    else {
      toast.success("Đã chuyển vào thùng rác");
      router.refresh();
    }
  }

  return (
    <button onClick={handleDelete} className="text-red-500 hover:text-red-700 p-1" title="Xóa vào thùng rác">
      <Trash2 size={18} />
    </button>
  );
}

export function TrashActions({ id }: { id: number }) {
  const router = useRouter();

  async function handleRestore() {
    const res = await restoreMessage(id);
    if (res.error) toast.error(res.error);
    else {
      toast.success("Đã khôi phục");
      router.refresh();
    }
  }

  async function handlePermanentDelete() {
    if (!confirm("Xóa vĩnh viễn tin nhắn này? Bạn không thể hoàn tác!")) return;
    const res = await permanentlyDeleteMessage(id);
    if (res.error) toast.error(res.error);
    else {
      toast.success("Đã xóa vĩnh viễn");
      router.refresh();
    }
  }

  return (
    <div className="flex gap-2">
      <button onClick={handleRestore} className="text-blue-500 hover:text-blue-700 p-1" title="Hoàn tác">
        <RefreshCw size={18} />
      </button>
      <button onClick={handlePermanentDelete} className="text-red-500 hover:text-red-700 p-1" title="Xóa vĩnh viễn">
        <XCircle size={18} />
      </button>
    </div>
  );
}
