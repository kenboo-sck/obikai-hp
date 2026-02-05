import AdminEditClient from "./AdminEditClient";

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

// 管理画面も常に最新の状態を取得
export const dynamic = "force-dynamic";

export default function Page() {
  return <AdminEditClient />;
}