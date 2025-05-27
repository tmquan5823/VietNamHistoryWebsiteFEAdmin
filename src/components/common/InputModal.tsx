import React, { useState, useEffect } from "react";

interface InputModalProps {
  open: boolean;
  title: string;
  description?: string;
  onCancel: () => void;
  onConfirm: (inputValue: string) => void;
  confirmText?: string;
  cancelText?: string;
  confirmClass?: string;
  placeholder?: string;
}

const InputModal: React.FC<InputModalProps> = ({
  open,
  title,
  description,
  onCancel,
  onConfirm,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  confirmClass = "bg-red-500 text-white hover:bg-red-600",
  placeholder = "Nhập lý do...",
}) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (open) setInputValue("");
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[350px]">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        {description && <p className="mb-4">{description}</p>}
        <input
          className="w-full border border-gray-300 rounded px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
        />
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            className={`px-4 py-2 rounded ${confirmClass}`}
            onClick={() => onConfirm(inputValue)}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputModal;
