import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface HistoryDocumentFormProps {
  periods: Array<{ id: number; name: string }>;
  onCreateDocument: (data: any) => void;
  loading: boolean;
}

export const HistoryDocumentForm: React.FC<HistoryDocumentFormProps> = ({
  periods,
  onCreateDocument,
  loading,
}) => {
  const { register, handleSubmit, control, reset } = useForm();
  const types = [
    { id: 1, name: "Giai đoạn" },
    { id: 2, name: "Sự kiện" },
  ];

  const onSubmit = async (data: any) => {
    try {
      await onCreateDocument(data);
      reset();
    } catch (e) {
      // không reset nếu thất bại
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Tiêu đề</label>
        <Input
          {...register("title", { required: true })}
          placeholder="Nhập tiêu đề"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Loại tài liệu</label>
        <Controller
          name="type_id"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              value={field.value?.toString() || ""}
              onValueChange={field.onChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn loại tài liệu" />
              </SelectTrigger>
              <SelectContent>
                {types.map((type) => (
                  <SelectItem key={type.id} value={type.id.toString()}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Giai đoạn lịch sử</label>
        <Controller
          name="period_id"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              value={field.value?.toString() || ""}
              onValueChange={field.onChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn giai đoạn" />
              </SelectTrigger>
              <SelectContent>
                {periods.map((period) => (
                  <SelectItem key={period.id} value={period.id.toString()}>
                    {period.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Năm bắt đầu</label>
        <Input
          type="number"
          {...register("start_year", { required: true })}
          placeholder="Năm bắt đầu"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Năm kết thúc</label>
        <Input
          type="number"
          {...register("end_year", { required: true })}
          placeholder="Năm kết thúc"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Nội dung</label>
        <Controller
          name="content"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <ReactQuill
              theme="snow"
              value={field.value || ""}
              onChange={field.onChange}
            />
          )}
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">URL hình ảnh</label>
        <Input
          {...register("image", { required: true })}
          placeholder="Nhập URL hình ảnh"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Từ khóa</label>
        <Input
          {...register("key_words", { required: true })}
          placeholder="Nhập từ khóa (phân tách bởi dấu phẩy nếu nhiều)"
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Đang tạo..." : "Tạo tài liệu"}
      </Button>
    </form>
  );
};
