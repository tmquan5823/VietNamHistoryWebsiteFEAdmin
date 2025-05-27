// Hàm xử lý hiển thị năm
export function formatYear(year: number) {
    return year < 0 ? `${Math.abs(year)} TCN` : year;
  }