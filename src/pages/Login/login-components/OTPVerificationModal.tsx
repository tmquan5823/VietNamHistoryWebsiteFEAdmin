import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { authApi } from "@/api/authApi";
import { toast } from "@/components/ui/sonner";
import { useMutation } from "@tanstack/react-query";

interface OTPVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

const OTPVerificationModal: React.FC<OTPVerificationModalProps> = ({
  isOpen,
  onClose,
  email,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
  const [activeInput, setActiveInput] = useState<number>(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [countdown, setCountdown] = useState<number>(60);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, countdown]);

  const { mutate: verifyOtp, isPending: isVerifying } = useMutation({
    mutationFn: () =>
      authApi.verifyEmailWithQuery({ email, otp: otp.join("") }),
    onSuccess: () => {
      toast.success("Xác thực email thành công");
      onClose();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Xác thực thất bại");
    },
  });

  const { mutate: resendOtp, isPending: isResending } = useMutation({
    mutationFn: () => authApi.resendOtp(email),
    onSuccess: () => {
      toast.success("Đã gửi lại mã OTP");
      setCountdown(60);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Gửi lại OTP thất bại");
    },
  });

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      setActiveInput(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      setActiveInput(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.join("").length === 4) {
      verifyOtp();
    } else {
      toast.error("Vui lòng nhập đủ mã OTP");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Xác thực Email</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          <p className="text-sm text-gray-500 text-center">
            Chúng tôi đã gửi mã OTP đến email {email}
          </p>
          <div className="flex gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center border rounded-md focus:outline-none focus:border-[#5D4037] text-lg"
                autoFocus={index === activeInput}
              />
            ))}
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button
              onClick={handleVerify}
              disabled={isVerifying || otp.join("").length !== 4}
              className="bg-[#5D4037] hover:bg-[#5D4037]/90"
            >
              {isVerifying ? "Đang xác thực..." : "Xác thực"}
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => resendOtp()}
                disabled={isResending || countdown > 0}
              >
                Gửi lại mã
              </Button>
              {countdown > 0 && (
                <span className="text-sm text-gray-500">({countdown}s)</span>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OTPVerificationModal;
