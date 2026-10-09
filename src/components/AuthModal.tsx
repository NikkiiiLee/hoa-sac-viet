import React, { useState } from 'react';
import { UserProfile } from '../types/costume';
import {
  X,
  Loader2,
  Sparkles,
  ShieldCheck,
  Mail,
  Lock,
  KeyRound,
  User,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

interface RegisteredAccount {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

const DEFAULT_ACCOUNTS: RegisteredAccount[] = [
  {
    name: 'Minh An (UEH)',
    email: 'minhan.ueh@gmail.com',
    password: '••••••••',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
  },
];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);

  // Danh sách tài khoản đã đăng ký (lưu trữ localStorage + mẫu Minh An UEH)
  const [registeredAccounts, setRegisteredAccounts] = useState<RegisteredAccount[]>(() => {
    try {
      const raw = localStorage.getItem('hoasacviet_registered_users');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const hasDemo = parsed.some(
            (u) => u.email.toLowerCase() === 'minhan.ueh@gmail.com'
          );
          return hasDemo ? parsed : [...DEFAULT_ACCOUNTS, ...parsed];
        }
      }
    } catch (e) {}
    return DEFAULT_ACCOUNTS;
  });

  // Login form states (mặc định nạp sẵn tài khoản demo mẫu Minh An UEH)
  const [email, setEmail] = useState('minhan.ueh@gmail.com');
  const [password, setPassword] = useState('••••••••');

  // Register form states
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  // Notification / Alert message state
  const [notice, setNotice] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  if (!isOpen) return null;

  // 1-Click Google Auth (Demo)
  const handleGoogleAuth = () => {
    setIsLoadingGoogle(true);
    setNotice(null);
    setTimeout(() => {
      setIsLoadingGoogle(false);
      onLoginSuccess({
        name: 'Minh An (UEH)',
        email: 'minhan.ueh@gmail.com',
        avatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        role: 'member',
      });
      onClose();
    }, 700);
  };

  // Xử lý Đăng Ký tài khoản mới: KHÔNG đăng nhập ngay, lưu tài khoản và chuyển sang bước Đăng Nhập
  const handleEmailRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice(null);

    const trimmedName = registerName.trim();
    const trimmedEmail = registerEmail.trim().toLowerCase();
    const trimmedPassword = registerPassword.trim();

    if (!trimmedName) {
      setNotice({ type: 'error', message: 'Vui lòng nhập Họ và Tên của bạn!' });
      return;
    }

    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setNotice({ type: 'error', message: 'Vui lòng nhập địa chỉ email hợp lệ!' });
      return;
    }

    if (trimmedPassword.length < 6) {
      setNotice({ type: 'error', message: 'Mật khẩu phải chứa ít nhất 6 ký tự!' });
      return;
    }

    // Kiểm tra xem tài khoản đã tồn tại chưa
    const existing = registeredAccounts.find(
      (acc) => acc.email.toLowerCase() === trimmedEmail
    );
    if (existing) {
      setNotice({
        type: 'error',
        message: `Email "${trimmedEmail}" đã được đăng ký trước đó. Vui lòng chuyển sang tab Đăng Nhập!`,
      });
      return;
    }

    setIsLoadingEmail(true);
    setTimeout(() => {
      setIsLoadingEmail(false);

      const newAccount: RegisteredAccount = {
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword,
        avatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      };

      const updated = [...registeredAccounts, newAccount];
      setRegisteredAccounts(updated);
      try {
        localStorage.setItem('hoasacviet_registered_users', JSON.stringify(updated));
      } catch (err) {}

      // YÊU CẦU: CHƯA ĐĂNG NHẬP NGAY, CHUYỂN QUA BƯỚC ĐĂNG NHẬP VỚI TÀI KHOẢN VỪA ĐĂNG KÝ
      setAuthTab('login');
      setEmail(trimmedEmail);
      setPassword(trimmedPassword);
      setRegisterName('');
      setRegisterEmail('');
      setRegisterPassword('');

      setNotice({
        type: 'success',
        message: `🎉 Tạo tài khoản "${trimmedName}" thành công! Vui lòng bấm "Đăng Nhập" để truy cập hệ thống.`,
      });
    }, 600);
  };

  // Xử lý Đăng Nhập: Kiểm tra tài khoản đã đăng ký rồi mới cho đăng nhập
  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice(null);

    const inputEmail = email.trim().toLowerCase();
    const inputPassword = password;

    if (!inputEmail) {
      setNotice({ type: 'error', message: 'Vui lòng nhập email đăng nhập!' });
      return;
    }

    // Kiểm tra tài khoản trong danh sách đăng ký
    const matchedAccount = registeredAccounts.find(
      (acc) => acc.email.toLowerCase() === inputEmail
    );
    const isDemoAccount = inputEmail === 'minhan.ueh@gmail.com';

    // Nếu tài khoản chưa đăng ký
    if (!matchedAccount && !isDemoAccount) {
      setNotice({
        type: 'error',
        message: `❌ Tài khoản "${email}" chưa được đăng ký! Bạn cần tạo tài khoản trước khi đăng nhập.`,
      });
      return;
    }

    // Kiểm tra mật khẩu
    if (matchedAccount) {
      const isDemoMatch =
        isDemoAccount &&
        (inputPassword === '••••••••' || inputPassword === matchedAccount.password || inputPassword.length >= 6);

      if (!isDemoMatch && inputPassword !== matchedAccount.password) {
        setNotice({
          type: 'error',
          message: '❌ Mật khẩu không chính xác! Vui lòng kiểm tra lại.',
        });
        return;
      }
    }

    setIsLoadingEmail(true);
    setTimeout(() => {
      setIsLoadingEmail(false);
      const userToLogin = matchedAccount || {
        name: 'Minh An (UEH)',
        email: 'minhan.ueh@gmail.com',
        avatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      };

      onLoginSuccess({
        name: userToLogin.name,
        email: userToLogin.email,
        avatar:
          userToLogin.avatar ||
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        role: 'member',
      });
      onClose();
    }, 600);
  };

  // Nạp lại tài khoản demo mẫu Minh An UEH
  const handleResetToDemoAccount = () => {
    setEmail('minhan.ueh@gmail.com');
    setPassword('••••••••');
    setNotice({
      type: 'success',
      message: 'Đã nạp sẵn tài khoản demo mẫu Minh An (UEH).',
    });
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Khung chứa Modal: max-w-[440px], max-h-[90vh], bg Giấy Dó #FFFDF9 */}
      <div className="relative max-w-[440px] w-full max-h-[90vh] overflow-y-auto bg-[#FFFDF9] rounded-2xl p-6 sm:p-7 border border-amber-200/80 shadow-2xl">
        {/* Nút đóng dấu (×) cố định góc trên bên phải */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#F2EFE9] hover:bg-[#E5E0D8] text-stone-600 hover:text-[#A82824] flex items-center justify-center text-lg font-bold transition-all shadow-2xs cursor-pointer"
          title="Đóng cửa sổ"
        >
          ✕
        </button>

        {/* Tiêu đề & Dòng mô tả ngắn gọn */}
        <div className="text-center pt-1">
          <h2 className="font-display font-bold text-xl text-slate-900 text-center">
            Gia Nhập Họa Sắc Việt
          </h2>
          <p className="text-xs text-amber-900/80 text-center mt-1 mb-4 font-body leading-relaxed">
            Đăng nhập để đồng bộ đám mây & lưu không giới hạn tủ đồ Lookbook cá nhân.
          </p>
        </div>

        {/* Thanh tab chuyển đổi (Segmented Control): Đăng Nhập / Tạo Tài Khoản */}
        <div className="grid grid-cols-2 p-1 bg-amber-100/60 rounded-xl mb-4 text-xs font-semibold font-body">
          <button
            type="button"
            onClick={() => {
              setAuthTab('login');
              setNotice(null);
            }}
            className={`py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              authTab === 'login'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-amber-900/70 hover:text-amber-950'
            }`}
          >
            <span>🔑</span> Đăng Nhập
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthTab('register');
              setNotice(null);
            }}
            className={`py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              authTab === 'register'
                ? 'bg-white text-[#A82824] shadow-xs font-bold'
                : 'text-amber-900/70 hover:text-[#A82824]'
            }`}
          >
            <span>✨</span> Tạo Tài Khoản
          </button>
        </div>

        {/* Thông báo Thành công / Lỗi (Alert Banner) */}
        {notice && (
          <div
            className={`p-3 rounded-xl text-xs flex items-start gap-2.5 mb-3.5 border animate-in fade-in duration-200 ${
              notice.type === 'success'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-red-50 border-red-200 text-[#B83227]'
            }`}
          >
            <span className="text-base shrink-0">
              {notice.type === 'success' ? '🎉' : '⚠️'}
            </span>
            <div className="flex-1 text-left leading-relaxed">
              <span className="font-medium">{notice.message}</span>
              {notice.type === 'error' && notice.message.includes('chưa được đăng ký') && (
                <button
                  type="button"
                  onClick={() => {
                    setNotice(null);
                    setRegisterEmail(email);
                    setAuthTab('register');
                  }}
                  className="block mt-1 font-bold text-[#A82824] underline hover:text-red-900 cursor-pointer"
                >
                  👉 Bấm vào đây để tạo tài khoản ngay
                </button>
              )}
            </div>
          </div>
        )}

        {/* 1-Click Google Social Auth (Luôn hỗ trợ đăng nhập 1-chạm tài khoản mẫu) */}
        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={isLoadingGoogle || isLoadingEmail}
          className="w-full py-2.5 px-4 bg-white hover:bg-stone-50 text-[#2C241D] font-bold text-xs sm:text-sm rounded-xl border-2 border-[#D6CEBE] hover:border-[#A82824] shadow-xs transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-98 disabled:opacity-60 mb-3"
        >
          {isLoadingGoogle ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#A82824]" />
              <span>Đang đồng bộ Google...</span>
            </>
          ) : (
            <>
              {/* Google Multi-color SVG */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.8C6.2 7.2 8.9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.6l3.7 2.9c2.2-2 3.7-5 3.7-8.7z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.3 14.8c-.2-.8-.4-1.6-.4-2.5s.2-1.7.4-2.5L1.6 7C.6 9 0 11.2 0 13.5s.6 4.5 1.6 6.5l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.1-6.7-5L1.6 17c1.9 3.9 5.8 7 10.4 7z"
                />
              </svg>
              <span>🔴 Tiếp tục với Google (1-Click Demo Minh An)</span>
            </>
          )}
        </button>

        {/* Divider */}
        <div className="relative flex py-1 items-center mb-3">
          <div className="flex-grow border-t border-[#D6CEBE]/70"></div>
          <span className="flex-shrink mx-3 text-[11px] text-[#7A6E5F] italic">
            {authTab === 'login' ? '— hoặc dùng Email sinh viên —' : '— hoặc tạo bằng Email mới —'}
          </span>
          <div className="flex-grow border-t border-[#D6CEBE]/70"></div>
        </div>

        {/* Form tương ứng: Đăng Nhập hoặc Đăng Ký */}
        {authTab === 'login' ? (
          <form onSubmit={handleEmailLogin} className="space-y-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-[#5C5346] block text-left">
                  Email sinh viên / cá nhân
                </label>
                <button
                  type="button"
                  onClick={handleResetToDemoAccount}
                  className="text-[10.5px] text-[#8A5A19] hover:text-[#5C3B0E] font-medium underline cursor-pointer"
                  title="Nạp lại email demo: minhan.ueh@gmail.com"
                >
                  ⚡ Nạp tài khoản demo
                </button>
              </div>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#7A6E5F] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (notice) setNotice(null);
                  }}
                  placeholder="minhan.ueh@gmail.com"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white rounded-xl border border-[#D6CEBE] text-[#2C241D] font-medium focus:outline-hidden focus:border-[#A82824]"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#5C5346] block text-left">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#7A6E5F] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (notice) setNotice(null);
                  }}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white rounded-xl border border-[#D6CEBE] text-[#2C241D] font-medium focus:outline-hidden focus:border-[#A82824]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoadingGoogle || isLoadingEmail}
              className="w-full py-2.5 px-4 bg-[#A82824] hover:bg-[#8d1d0b] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-[#A82824]/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-60"
            >
              {isLoadingEmail ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang xác thực tài khoản...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Đăng Nhập</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleEmailRegister} className="space-y-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#5C5346] block text-left">
                Họ và Tên
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#7A6E5F] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={registerName}
                  onChange={(e) => {
                    setRegisterName(e.target.value);
                    if (notice) setNotice(null);
                  }}
                  placeholder="Ví dụ: Nguyễn Minh An"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white rounded-xl border border-[#D6CEBE] text-[#2C241D] font-medium focus:outline-hidden focus:border-[#A82824]"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#5C5346] block text-left">
                Email sinh viên / cá nhân
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#7A6E5F] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={registerEmail}
                  onChange={(e) => {
                    setRegisterEmail(e.target.value);
                    if (notice) setNotice(null);
                  }}
                  placeholder="name@domain.com"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white rounded-xl border border-[#D6CEBE] text-[#2C241D] font-medium focus:outline-hidden focus:border-[#A82824]"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#5C5346] block text-left">
                Mật khẩu khởi tạo
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#7A6E5F] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={registerPassword}
                  onChange={(e) => {
                    setRegisterPassword(e.target.value);
                    if (notice) setNotice(null);
                  }}
                  placeholder="Tối thiểu 6 ký tự"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-white rounded-xl border border-[#D6CEBE] text-[#2C241D] font-medium focus:outline-hidden focus:border-[#A82824]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoadingGoogle || isLoadingEmail}
              className="w-full py-2.5 px-4 bg-[#A82824] hover:bg-[#8d1d0b] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-[#A82824]/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-60"
            >
              {isLoadingEmail ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang đăng ký tài khoản...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>✨ Đăng Ký Tài Khoản</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Footer info note */}
        <div className="text-center pt-3 border-t border-[#D6CEBE]/50 mt-3">
          <span className="text-[10.5px] text-[#7A6E5F] flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>
              {authTab === 'login'
                ? 'Bản demo tự động nạp sẵn tài khoản mẫu Minh An (UEH)'
                : 'Sau khi đăng ký, bạn sẽ chuyển sang bước đăng nhập để truy cập'}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
