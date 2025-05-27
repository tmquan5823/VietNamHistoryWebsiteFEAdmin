import React, { useState } from "react";
import SectionContainer from "../../components/common/SectionContainer";
import { useMutation } from "@tanstack/react-query";
import { imageRestoreApi } from "@/api/imageRestore";

const ImageRestoration: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [showOriginal, setShowOriginal] = useState(false);
  const [modeState, setModeState] = useState<{
    colorize: boolean;
    enhance: boolean;
  }>({ colorize: true, enhance: true });

  const { mutate: restoreImage, isPending: isRestoring } = useMutation({
    mutationFn: (params: { image: File; mode: string }) =>
      imageRestoreApi.restoreImage(params),
    onSuccess: (blob) => {
      const url = URL.createObjectURL(blob);
      setRestoredImage(url);
    },
    onError: (error) => {
      console.error("Lỗi khi phục chế ảnh:", error);
    },
  });

  const getModeString = () => {
    const modes = [];
    if (modeState.colorize) modes.push("colorize");
    if (modeState.enhance) modes.push("enhance");
    return modes.join(",");
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setModeState((prev) => ({ ...prev, [name]: checked }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setRestoredImage(null);
      setShowOriginal(false);
      setSelectedImage(file);
      restoreImage({ image: file, mode: getModeString() });
      event.target.value = "";
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setRestoredImage(null);
      setShowOriginal(false);
      setSelectedImage(file);
      restoreImage({ image: file, mode: getModeString() });
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDownload = () => {
    if (restoredImage) {
      const link = document.createElement("a");
      link.href = restoredImage;
      link.download = "restored-image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <SectionContainer
      title="Phục chế ảnh"
      subtitle="Khôi phục lại những hình ảnh lịch sử quý giá với công nghệ trí tuệ nhân tạo"
      className="bg-white"
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
          <h3 className="text-center text-gray-600 mb-6">Tải ảnh lên</h3>

          <div className="mb-4 flex flex-col items-center">
            <label className="mb-2 font-medium text-gray-700">
              Chọn chế độ phục chế:
            </label>
            <div className="flex gap-4">
              <label>
                <input
                  type="checkbox"
                  name="colorize"
                  checked={modeState.colorize}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-1">Phục chế màu</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="enhance"
                  checked={modeState.enhance}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-1">Tăng chất lượng</span>
              </label>
            </div>
          </div>

          {/* Upload Area */}
          <div
            className={`border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors ${
              !modeState.colorize && !modeState.enhance
                ? "opacity-50 pointer-events-none"
                : ""
            }`}
            onClick={() => {
              if (modeState.colorize || modeState.enhance)
                document.getElementById("imageInput")?.click();
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {/* Upload Icon */}
            <div className="w-16 h-16 mx-auto mb-4">
              <svg
                className="w-full h-full text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
            </div>

            <p className="text-gray-700 mb-2">
              Bấm để chọn ảnh hoặc kéo thả vào đây
            </p>
            <p className="text-sm text-gray-500">
              PNG, JPG hoặc GIF (tối đa 5MB)
            </p>

            <input
              type="file"
              id="imageInput"
              className="hidden"
              accept="image/png,image/jpeg,image/gif"
              onChange={handleImageUpload}
            />
          </div>

          {/* Restored Image Preview */}
          {isRestoring && (
            <div className="mt-8 text-center text-orange-500">
              Đang phục chế ảnh...
            </div>
          )}
          {restoredImage && selectedImage && !isRestoring && (
            <div className="mt-8">
              <h3 className="text-center text-gray-600 mb-4">
                Ảnh đã được phục chế
              </h3>
              <div className="relative">
                <img
                  src={
                    showOriginal
                      ? URL.createObjectURL(selectedImage)
                      : restoredImage
                  }
                  alt={showOriginal ? "Original" : "Restored"}
                  className="w-full rounded-lg shadow-md"
                />
                <div className="mt-4 flex justify-between items-center">
                  <button
                    className="flex items-center text-orange-500 hover:text-orange-600 font-medium"
                    onClick={() => setShowOriginal((v) => !v)}
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    {showOriginal ? "Xem ảnh phục chế" : "Xem ảnh gốc"}
                  </button>
                  <button
                    className="flex items-center text-gray-700 hover:text-gray-800 font-medium"
                    onClick={handleDownload}
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Tải ảnh về máy
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </SectionContainer>
  );
};

export default ImageRestoration;
