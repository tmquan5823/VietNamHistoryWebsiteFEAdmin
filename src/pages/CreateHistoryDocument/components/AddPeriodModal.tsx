import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AddPeriodModalProps {
  onAddPeriod: (data: any) => void;
  loading: boolean;
}

export const AddPeriodModal: React.FC<AddPeriodModalProps> = ({
  onAddPeriod,
  loading,
}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");

  const handleAdd = () => {
    if (
      !name.trim() ||
      !description.trim() ||
      !startYear.trim() ||
      !endYear.trim()
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    if (isNaN(Number(startYear)) || isNaN(Number(endYear))) {
      toast.error("Năm phải là số");
      return;
    }
    if (Number(startYear) > Number(endYear)) {
      toast.error("Năm bắt đầu phải nhỏ hơn hoặc bằng năm kết thúc");
      return;
    }
    onAddPeriod({
      name,
      description,
      start_year: Number(startYear),
      end_year: Number(endYear),
    });
    setOpen(false);
    setName("");
    setDescription("");
    setStartYear("");
    setEndYear("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mb-4">
          + Thêm giai đoạn
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm giai đoạn mới</DialogTitle>
        </DialogHeader>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên giai đoạn"
        />
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Mô tả giai đoạn"
        />
        <Input
          value={startYear}
          onChange={(e) => setStartYear(e.target.value)}
          placeholder="Năm bắt đầu"
          type="number"
        />
        <Input
          value={endYear}
          onChange={(e) => setEndYear(e.target.value)}
          placeholder="Năm kết thúc"
          type="number"
        />
        <DialogFooter>
          <Button onClick={handleAdd} disabled={loading}>
            {loading ? "Đang thêm..." : "Thêm"}
          </Button>
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Huỷ
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
