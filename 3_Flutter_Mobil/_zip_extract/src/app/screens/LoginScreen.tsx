import { useState } from "react";
import { useNavigate } from "react-router";
import { ShoppingBag } from "lucide-react";
import { InputField } from "../components/InputField";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    navigate("/home");
  };

  const handleGuestLogin = () => {
    navigate("/home");
  };

  const handleSignUp = () => {
    // Navigate to sign up or show sign up modal
    console.log("Sign up clicked");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A237E] to-[#283593] flex flex-col items-center justify-center px-4">
      {/* Mobile Container */}
      <div className="w-full max-w-[393px] flex flex-col items-center">
        {/* Logo Block */}
        <div className="flex flex-col items-center mb-12">
          <div className="w-[90px] h-[90px] bg-white rounded-3xl shadow-[0_8px_20px_rgba(0,0,0,0.2)] flex items-center justify-center mb-4">
            <ShoppingBag className="w-12 h-12 text-[#FF6D00]" />
          </div>
          <h1 className="text-white text-[32px] font-bold mb-1">NovaStore</h1>
          <p className="text-white/70 text-sm">Alışverişte yeni bir boyut</p>
        </div>

        {/* Form Card */}
        <div className="w-full bg-white rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.12)] p-7 space-y-4">
          <div className="space-y-2 mb-6">
            <h2 className="text-[22px] font-bold text-[#1C1C1E]">Giriş Yap</h2>
            <p className="text-[13px] text-gray-500">Hesabınıza erişim sağlayın</p>
          </div>

          <div className="space-y-4">
            <InputField
              type="email"
              placeholder="E-posta adresiniz"
              value={email}
              onChange={setEmail}
            />
            
            <InputField
              type="password"
              placeholder="Şifreniz"
              value={password}
              onChange={setPassword}
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full h-[52px] bg-[#1A237E] text-white rounded-xl font-semibold hover:bg-[#303F9F] transition-colors mt-6"
          >
            Giriş Yap
          </button>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">veya</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button
            onClick={handleGuestLogin}
            className="w-full h-[52px] bg-white border-2 border-[#1A237E] text-[#1A237E] rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            Misafir Olarak Devam Et
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-white/80 text-sm">
            Hesabınız yok mu?{" "}
            <button onClick={handleSignUp} className="text-white font-semibold underline">
              Üye Ol
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}