import React, { useState, useEffect } from 'react';
import { Apple } from 'lucide-react';

export default function LoginApp() {
  const [activeScreen, setActiveScreen] = useState('main'); // 'main', 'login', 'signup'
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  
  // 인증 관련 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState('');
  const [signupError, setSignupError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // 로컬 스토리지에서 로그인 정보 확인
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsLoggedIn(true);
      } catch (error) {
        console.error('로그인 정보 파싱 실패:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);
  
  // ID 로그인 처리
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);
    
    // 실제로는 서버 API 호출을 해야 합니다
    // 여기서는 간단한 검증만 수행합니다
    setTimeout(() => {
      if (id === 'user1' && password === 'password1') {
        const userData = { id, loginType: 'email' };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setIsLoggedIn(true);
        setActiveScreen('main');
      } else {
        setLoginError('아이디 또는 비밀번호가 올바르지 않습니다');
      }
      setIsLoading(false);
    }, 1000); // 로딩 시뮬레이션
  };
  
  // 카카오 로그인 처리
  const handleKakaoLogin = () => {
    setIsLoading(true);
    
    // 실제로는 카카오 SDK를 사용해야 합니다
    // 여기서는 로그인 성공으로 가정합니다
    setTimeout(() => {
      const userData = { id: 'kakao_user', loginType: 'kakao' };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsLoggedIn(true);
      setIsLoading(false);
    }, 1000); // 로딩 시뮬레이션
  };
  
  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
    setId('');
    setPassword('');
  };
  
  // 메인 화면 (로그인 옵션)
  const MainScreen = () => (
    <div className="flex flex-col items-center justify-start h-full pt-10 bg-white">
      <h1 className="text-2xl font-bold mb-10">유유팩과 함께하는 미래</h1>
      
      <div className="flex flex-col w-full max-w-xs gap-4 px-4">
        {/* 카카오 로그인 버튼 */}
        <button 
          onClick={handleKakaoLogin}
          className="flex items-center justify-center w-full py-3 bg-yellow-300 rounded-md"
        >
          <span className="mr-2">🗨️</span> 
          카카오로그인
        </button>
        
        {/* 이메일 로그인 버튼 */}
        <button 
          onClick={() => setActiveScreen('login')}
          className="flex items-center justify-center w-full py-3 bg-purple-600 text-white rounded-md"
        >
          <span className="mr-2">✉️</span>
          이메일로 로그인
        </button>
      </div>
      
      <div className="absolute bottom-5 text-gray-400 text-xs">
        © YOUPAC 2023
      </div>
    </div>
  );
  
  // 이메일 로그인 화면
  const LoginScreen = () => (
    <div className="flex flex-col items-center justify-center h-full bg-white">
      <div className="bg-black text-white rounded-lg p-6 w-full max-w-xs">
        <h2 className="text-xl font-bold mb-6 text-center">ID로 로그인</h2>
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="ID"
              className="w-full p-3 rounded text-black"
              required
            />
          </div>
          
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 rounded text-black"
              required
            />
          </div>
          
          {loginError && (
            <p className="text-red-500 text-sm mb-4">{loginError}</p>
          )}
          
          <div className="text-gray-400 text-sm mb-6 text-center">
            <span className="cursor-pointer">ID 찾기</span> / <span className="cursor-pointer">Password 찾기</span>
          </div>
          
          <button
            type="submit"
            className="w-full py-3 bg-white text-black rounded-md font-medium"
            disabled={isLoading}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  );
  
  // 로그인 성공 화면
  const SuccessScreen = () => (
    <div className="flex flex-col items-center justify-center h-full bg-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">로그인 성공!</h2>
        <p className="mb-6">안녕하세요, {user?.id}님!</p>
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-red-500 text-white rounded-md"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
  
  // 현재 상태에 따라 화면 렌더링
  return (
    <div className="h-screen w-full">
      {isLoggedIn ? (
        <SuccessScreen />
      ) : (
        activeScreen === 'main' ? (
          <MainScreen />
        ) : (
          <LoginScreen />
        )
      )}
    </div>
  );
}