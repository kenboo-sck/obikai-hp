"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, orderBy, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function NewsManagement() {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [filteredNews, setFilteredNews] = useState<any[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchNews = async () => {
    try {
      const q = query(collection(db, "news"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[];
      const sortedData = data.sort((a: any, b: any) => {
        const aTime = a.createdAt?.seconds || 0;
        const bTime = b.createdAt?.seconds || 0;
        return bTime - aTime;
      });
      setNewsList(sortedData);
      setFilteredNews(sortedData);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // フィルター処理
  useEffect(() => {
    let filtered = [...newsList];

    // カテゴリフィルター
    if (categoryFilter !== "ALL") {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    // ステータスフィルター
    if (statusFilter !== "ALL") {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    setFilteredNews(filtered);
    setCurrentPage(1); // フィルター変更時は1ページ目に戻る
  }, [categoryFilter, statusFilter, newsList]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("この記事を削除しますか？")) return;
    try {
      await deleteDoc(doc(db, "news", id));
      alert("削除しました");
      fetchNews();
    } catch (error) {
      console.error("Error deleting news:", error);
      alert("削除に失敗しました");
    }
  };

  // ページネーション計算
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredNews.slice(startIndex, endIndex);

  const getCategoryLabel = (category: string) => {
    const labels: any = {
      "INFO": "お知らせ",
      "EVENT": "イベント",
      "CAMPAIGN": "キャンペーン",
      "HOLIDAY": "休館日"
    };
    return labels[category] || category;
  };

  return (
    <div className="space-y-4 font-sans max-w-7xl mx-auto">
      {/* フィルターUI */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 flex-1">
          <label className="text-xs font-bold text-gray-700 shrink-0">カテゴリ:</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded text-sm outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">すべて</option>
            <option value="INFO">お知らせ</option>
            <option value="EVENT">イベント</option>
            <option value="CAMPAIGN">キャンペーン</option>
            <option value="HOLIDAY">休館日</option>
          </select>
        </div>

        <div className="flex items-center gap-2 flex-1">
          <label className="text-xs font-bold text-gray-700 shrink-0">ステータス:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded text-sm outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">すべて</option>
            <option value="published">公開</option>
            <option value="draft">下書き</option>
          </select>
        </div>

        <div className="sm:ml-auto text-sm text-gray-500 text-right">
          全{filteredNews.length}件
        </div>
      </div>

      {/* 記事一覧 */}
      {currentItems.length === 0 ? (
        <p className="text-center py-8 text-gray-400 font-medium">記事がありません</p>
      ) : (
        <div className="space-y-3">
          {currentItems.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm gap-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                {item.image && (
                  <Image src={item.image} alt={item.title} width={60} height={60} className="object-cover flex-shrink-0 rounded" unoptimized />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <div className="font-bold text-gray-900 text-sm truncate max-w-[200px]">{item.title}</div>
                    <span className={`text-[10px] px-2 py-0.5 font-bold rounded ${item.status === 'published'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-yellow-100 text-yellow-700'
                      }`}>
                      {item.status === 'published' ? '公開' : '下書き'}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-2">
                    <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                      {getCategoryLabel(item.category)}
                    </span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto justify-end">
                <Link
                  href={`/admin/edit/${item.id}`}
                  className="flex-1 sm:flex-none text-center bg-white border border-gray-300 text-gray-700 px-4 py-2 font-bold text-xs rounded hover:bg-gray-50 transition-all"
                >
                  編集
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex-1 sm:flex-none text-center bg-white border border-red-200 text-red-600 px-4 py-2 font-bold text-xs rounded hover:bg-red-50 transition-all"
                >
                  削除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ページネーション */}
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 font-bold text-sm rounded transition-all ${currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
              }`}
          >
            ← 前へ
          </button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 font-bold text-sm rounded transition-all ${currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 font-bold text-sm rounded transition-all ${currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
              }`}
          >
            次へ →
          </button>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [coach, setCoach] = useState("");
  const [location, setLocation] = useState("");
  const [target, setTarget] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [color, setColor] = useState("#2563eb");
  const [status, setStatus] = useState("OPEN");
  const [loading, setLoading] = useState(false);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [authLoading, setAuthLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const router = useRouter();

  const weekLabels = ["月曜日 (MON)", "火曜日 (TUE)", "水曜日 (WED)", "木曜日 (THU)", "金曜日 (FRI)", "土曜日 (SAT)", "日曜日 (SUN)"];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/admin/login");
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const fetchSchedules = async () => {
    try {
      const q = query(collection(db, "schedules"), orderBy("startTime", "asc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const sortedData = data.sort((a: any, b: any) => (a.dayOfWeek || 0) - (b.dayOfWeek || 0));
      setSchedules(sortedData);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  useEffect(() => {
    if (user) fetchSchedules();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "schedules"), {
        title,
        coach,
        location,
        target,
        dayOfWeek: Number(dayOfWeek),
        startTime,
        endTime,
        color,
        status,
        createdAt: new Date(),
      });
      alert("スケジュールを追加しました");
      setTitle("");
      setCoach("");
      setLocation("");
      setTarget("");
      setDayOfWeek(0);
      setStartTime("");
      setEndTime("");
      fetchSchedules();
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setTitle(item.title);
    setCoach(item.coach || "");
    setLocation(item.location || "");
    setTarget(item.target || "");
    setDayOfWeek(item.dayOfWeek || 0);
    setStartTime(item.startTime || "");
    setEndTime(item.endTime || "");
    setColor(item.color);
    setStatus(item.status);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    setLoading(true);
    try {
      const docRef = doc(db, "schedules", editingId);
      await updateDoc(docRef, {
        title,
        coach,
        location,
        target,
        dayOfWeek: Number(dayOfWeek),
        startTime,
        endTime,
        color,
        status,
        updatedAt: new Date(),
      });
      alert("スケジュールを更新しました");
      setEditingId(null);
      setTitle("");
      setCoach("");
      setLocation("");
      setTarget("");
      setDayOfWeek(0);
      setStartTime("");
      setEndTime("");
      setColor("#2563eb");
      setStatus("OPEN");
      fetchSchedules();
    } catch (error) {
      console.error("Error updating document:", error);
      alert("更新に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setCoach("");
    setLocation("");
    setTarget("");
    setDayOfWeek(0);
    setStartTime("");
    setEndTime("");
    setColor("#2563eb");
    setStatus("OPEN");
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("このスケジュールを削除しますか？")) return;
    try {
      await deleteDoc(doc(db, "schedules", id));
      alert("削除しました");
      fetchSchedules();
    } catch (error) {
      console.error("Error deleting document:", error);
      alert("削除に失敗しました");
    }
  };

  if (authLoading) return <div className="pt-40 text-center font-bold text-blue-600 animate-pulse">読み込み中...</div>;

  return (
    <div className="pt-32 px-6 max-w-6xl mx-auto pb-20 font-sans text-gray-800">

      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">管理ダッシュボード</h1>
          <p className="text-sm text-gray-500 mt-2">スケジュールとニュースを管理できます</p>
        </div>
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <Link
            href="/admin/create"
            className="flex-1 sm:flex-none text-center bg-blue-600 text-white px-6 py-3 font-bold text-sm hover:bg-blue-700 transition-all rounded-full shadow-md"
          >
            + ニュース作成
          </Link>
          <button
            onClick={() => auth.signOut()}
            className="flex-1 sm:flex-none text-center border border-gray-300 text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-bold text-sm px-6 py-3 rounded-full transition-all"
          >
            ログアウト
          </button>
        </div>
      </div>

      {/* スケジュール追加・編集フォーム */}
      <form onSubmit={editingId ? handleUpdate : handleSubmit} className="bg-white text-gray-800 p-6 md:p-8 mb-12 shadow-lg border border-blue-100 rounded-xl">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-blue-600">
            {editingId ? "スケジュール編集" : "スケジュール追加"}
          </h2>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="text-gray-500 hover:text-gray-700 font-bold text-sm"
            >
              キャンセル
            </button>
          )}
        </div>
        <p className="text-xs text-gray-500 mb-6">
          {editingId
            ? "既存のスケジュールを編集して更新できます"
            : "新しいクラスやイベントをスケジュールに追加します"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2">クラス名・イベント名</label>
              <input
                type="text"
                placeholder="例: BJJクラス、キックボクシング"
                className="w-full bg-gray-50 border border-gray-300 p-3 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2">インストラクター名</label>
              <input
                type="text"
                placeholder="例: 山田太郎"
                className="w-full bg-gray-50 border border-gray-300 p-3 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={coach}
                onChange={(e) => setCoach(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2">場所（教室名など）</label>
              <input
                type="text"
                placeholder="例: 川東教室、七葉コミュニティセンター"
                className="w-full bg-gray-50 border border-gray-300 p-3 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2">対象（学年など）</label>
              <input
                type="text"
                placeholder="例: 年中〜小1、一般"
                className="w-full bg-gray-50 border border-gray-300 p-3 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2">曜日</label>
              <select
                className="w-full bg-gray-50 border border-gray-300 p-3 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={dayOfWeek}
                onChange={(e) => setDayOfWeek(Number(e.target.value))}
                required
              >
                {weekLabels.map((label, idx) => (
                  <option key={idx} value={idx}>{label}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-2">開始時間</label>
                <input
                  type="time"
                  className="w-full bg-gray-50 border border-gray-300 p-3 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-2">終了時間</label>
                <input
                  type="time"
                  className="w-full bg-gray-50 border border-gray-300 p-3 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2">ステータス</label>
              <select
                className="w-full bg-gray-50 border border-gray-300 p-3 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="OPEN">受付中</option>
                <option value="CLOSED">満員</option>
                <option value="SPECIAL">特別クラス</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-2">カラー（カレンダー表示用）</label>
              <input
                type="color"
                className="w-full h-12 bg-transparent cursor-pointer rounded border border-gray-300"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
          </div>
        </div>

        <button
          disabled={loading}
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 transition-all rounded-lg shadow-md"
        >
          {loading ? "処理中..." : (editingId ? "スケジュールを更新" : "スケジュールを追加")}
        </button>
      </form>

      {/* 既存スケジュール一覧 */}
      <div className="bg-white p-6 md:p-8 shadow-lg border border-gray-100 mb-12 rounded-xl">
        <button
          type="button"
          onClick={() => setIsScheduleOpen(!isScheduleOpen)}
          className="w-full flex justify-between items-center group"
        >
          <div>
            <h2 className="text-xl font-bold text-gray-900 text-left">登録済みスケジュール</h2>
            <p className="text-xs text-gray-500 mt-2 text-left">既存のスケジュールを編集・削除できます。</p>
          </div>
          <div className="text-2xl text-gray-400 group-hover:text-blue-600 transition-colors">
            {isScheduleOpen ? '▼' : '▶'}
          </div>
        </button>

        {isScheduleOpen && (
          <div className="space-y-4 mt-6">
            {schedules.length === 0 ? (
              <p className="text-center py-8 text-gray-400 font-medium">スケジュールがありません</p>
            ) : (
              schedules.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors gap-4">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div style={{ backgroundColor: item.color }} className="w-3 h-3 flex-shrink-0 rounded-full"></div>
                    <div>
                      <div className="font-bold text-sm text-gray-800">{item.title}</div>
                      <div className="text-xs text-gray-500">
                        {weekLabels[item.dayOfWeek]} {item.startTime} - {item.endTime}
                        {item.location && <span className="ml-2">@ {item.location}</span>}
                        {item.target && <span className="ml-2 text-blue-600 font-bold">[{item.target}]</span>}
                        {item.coach && <span className="ml-2">| In: {item.coach}</span>}
                        <span className={`ml-2 px-2 py-0.5 rounded text-[10px] text-white ${item.status === "OPEN" ? "bg-green-500" : item.status === "CLOSED" ? "bg-red-500" : "bg-yellow-500"}`}>
                          {item.status === "OPEN" ? "受付中" : item.status === "CLOSED" ? "満員" : "特別"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex-1 sm:flex-none bg-white border border-blue-500 text-blue-600 px-4 py-2 font-bold text-xs rounded hover:bg-blue-50 transition-all"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex-1 sm:flex-none bg-white border border-red-400 text-red-500 px-4 py-2 font-bold text-xs rounded hover:bg-red-50 transition-all"
                    >
                      削除
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* ニュース管理 */}
      <div className="bg-white p-6 md:p-8 shadow-lg border border-gray-100 rounded-xl">
        <div className="mb-6 border-b border-gray-100 pb-4">
          <h2 className="text-xl font-bold text-gray-900">ニュース管理</h2>
          <p className="text-xs text-gray-500 mt-2">公開済みのニュース記事を編集・削除できます。新しい記事は上部の「+ ニュース作成」ボタンから作成してください。</p>
        </div>
        <NewsManagement />
      </div>
    </div>
  );
}