import { PageContainer } from "@/components/common/PageContainer";
import { useDashboardHook } from "@/hook/useDashboardHook";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  FaUsers,
  FaFileAlt,
  FaComments,
  FaQuestionCircle,
} from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const cardStyles = [
  "from-blue-100 to-blue-50 border-blue-400 text-blue-600",
  "from-green-100 to-green-50 border-green-400 text-green-600",
  "from-purple-100 to-purple-50 border-purple-400 text-purple-600",
  "from-orange-100 to-orange-50 border-orange-400 text-orange-600",
];
const cardIcons = [
  <FaUsers size={32} />, // user
  <FaComments size={32} />, // forum
  <FaQuestionCircle size={32} />, // quiz
  <FaFileAlt size={32} />, // doc
];

const Dashboard = () => {
  const { data, isLoading, error } = useDashboardHook.dashboardQuery();

  if (isLoading) return <div className="text-center py-10">Đang tải...</div>;
  if (error || !data)
    return (
      <div className="text-center py-10 text-red-500">Lỗi tải dữ liệu</div>
    );

  // Chuẩn bị dữ liệu cho biểu đồ
  const chartLabels =
    data.userCreatedByMonth?.map((item) => `${item.month}/${item.year}`) || [];
  const chartData = data.userCreatedByMonth?.map((item) => item.count) || [];

  const cardData = [
    {
      value: data.userCount,
      label: "Tổng tài khoản người dùng",
      style: cardStyles[0],
      icon: cardIcons[0],
    },
    {
      value: data.approvedForumPostCount,
      label: "Bài viết diễn đàn",
      style: cardStyles[1],
      icon: cardIcons[1],
    },
    {
      value: data.publishedQuizSetCount,
      label: "Bộ câu hỏi",
      style: cardStyles[2],
      icon: cardIcons[2],
    },
    {
      value: data.documentCountsByType.reduce((sum, d) => sum + d.count, 0),
      label: "Tổng tài liệu",
      style: cardStyles[3],
      icon: cardIcons[3],
    },
  ];

  return (
    <PageContainer title="Bảng điều khiển">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {cardData.map((card) => (
          <div
            key={card.label}
            className={`bg-gradient-to-br ${card.style} border-2 shadow-lg hover:shadow-2xl transition-shadow duration-200 rounded-xl p-6 flex flex-col items-center group cursor-pointer`}
          >
            <div className="mb-2 group-hover:scale-110 transition-transform">
              {card.icon}
            </div>
            <div
              className={`text-4xl font-extrabold group-hover:scale-110 transition-transform ${
                card.style.split(" ")[2]
              }`}
            >
              {card.value}
            </div>
            <div className="text-gray-700 mt-2 font-medium text-center group-hover:text-black transition-colors">
              {card.label}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
        <div className="font-semibold mb-4 text-lg">
          Số lượng tài liệu theo loại
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.documentCountsByType.map((doc) => (
            <div
              key={doc.type_id}
              className="border-2 border-orange-200 rounded-xl p-4 flex flex-col items-center bg-orange-50 hover:bg-orange-100 transition-colors"
            >
              <div className="text-2xl font-bold text-orange-600">
                {doc.count}
              </div>
              <div className="text-gray-700 font-medium mt-1">
                {doc.type_name}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="font-semibold mb-4 text-lg">
          Biểu đồ đăng ký user theo tháng
        </div>
        <Bar
          data={{
            labels: chartLabels,
            datasets: [
              {
                label: "Số user đăng ký",
                data: chartData,
                backgroundColor: "#3b82f6",
                borderRadius: 6,
                barPercentage: 0.6,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              title: { display: false },
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: { color: "#222" },
              },
              y: {
                grid: { color: "#eee" },
                ticks: { color: "#222" },
              },
            },
          }}
        />
      </div>
    </PageContainer>
  );
};

export default Dashboard;
