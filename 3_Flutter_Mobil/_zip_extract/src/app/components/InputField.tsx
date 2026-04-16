import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

interface InputFieldProps {
  type: "email" | "password";
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export function InputField({ type, placeholder, value, onChange }: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const Icon = type === "email" ? Mail : Lock;
  const inputType = type === "password" && !showPassword ? "password" : "text";

  return (
    <div
      className={`relative flex items-center h-[52px] rounded-xl border-2 transition-all ${
        isFocused ? "border-[#1A237E]" : "border-gray-300"
      } bg-white px-4`}
    >
      <Icon className="w-5 h-5 text-gray-400 mr-3" />
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="flex-1 outline-none bg-transparent text-[#1C1C1E] placeholder:text-gray-400"
      />
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="ml-2"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5 text-gray-400" />
          ) : (
            <Eye className="w-5 h-5 text-gray-400" />
          )}
        </button>
      )}
    </div>
  );
}
