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
  const handleLogin = async () => {
    // 입력 검증
    if (!id.trim()) {
      setLoginError('아이디를 입력해주세요.');
      return;
    }
    if (!password) {
      setLoginError('비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setLoginError('');
    
    try {
      // 실제 구현 시에는 아래 주석을 해제하고 실제 API 엔드포인트로 변경
      /*
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '로그인에 실패했습니다.');
      }

      const userData = await response.json();
      */
      
      // 임시 로그인 처리 (개발용, 실제 구현 시 제거)
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 지연
      const userData = { id, name: '사용자', email: 'user@example.com' };
      
      // 로그인 성공 처리
      setUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(userData));
      alert('로그인 성공!');
      
      // 입력 필드 초기화
      setId('');
      setPassword('');
      
      // 메인 화면으로 이동
      setActiveScreen('main');
      
    } catch (error) {
      console.error('로그인 실패:', error);
      setLoginError(error.message || '로그인에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  // 회원가입 처리
  const handleSignupSubmit = async () => {
    // 입력 검증
    if (!id.trim()) {
      setSignupError('아이디를 입력해주세요.');
      return;
    }
    if (!password) {
      setSignupError('비밀번호를 입력해주세요.');
      return;
    }
    if (password !== confirmPassword) {
      setSignupError('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setSignupError('유효한 이메일을 입력해주세요.');
      return;
    }
    if (!termsAccepted) {
      setSignupError('이용약관에 동의해주세요.');
      return;
    }

    setIsLoading(true);
    setSignupError('');
    
    try {
      // 실제 구현 시에는 아래 주석을 해제하고 실제 API 엔드포인트로 변경
      /*
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, password, email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '회원가입에 실패했습니다.');
      }

      const userData = await response.json();
      */
      
      // 임시 회원가입 처리 (개발용, 실제 구현 시 제거)
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 지연
      
      // 회원가입 성공 처리
      alert('회원가입 성공! 로그인 화면으로 이동합니다.');
      
      // 입력 필드 초기화
      setId('');
      setPassword('');
      setConfirmPassword('');
      setEmail('');
      setTermsAccepted(false);
      
      // 로그인 화면으로 이동
      setActiveScreen('login');
      
    } catch (error) {
      console.error('회원가입 실패:', error);
      setSignupError(error.message || '회원가입에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  // 로그아웃 처리
  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    alert('로그아웃 되었습니다.');
  };

  // 소셜 로그인 핸들러
  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    
    try {
      // 실제 구현에서는 OAuth 프로세스를 시작
      // 예: window.location.href = `/api/auth/${provider.toLowerCase()}`;
      
      // 임시 처리 (개발용, 실제 구현 시 제거)
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 지연
      
      alert(`${provider} 로그인은 아직 구현 중입니다.`);
    } catch (error) {
      console.error(`${provider} 로그인 실패:`, error);
      alert(`${provider} 로그인에 실패했습니다. 다시 시도해주세요.`);
    } finally {
      setIsLoading(false);
    }
  };

  // ID/PW 로그인 화면 이동
  const handleIDPWLogin = () => {
    setActiveScreen('login');
    setLoginError('');
  };

  // 회원가입 화면으로 이동
  const handleSignup = () => {
    setActiveScreen('signup');
    setSignupError('');
  };

  // 뒤로 가기
  const handleGoBack = () => {
    setActiveScreen('main');
    setId('');
    setPassword('');
    setLoginError('');
  };

  // 키보드 포커스 핸들러
  const handleInputFocus = () => {
    setIsKeyboardVisible(true);
  };

  const handleInputBlur = () => {
    setIsKeyboardVisible(false);
  };

  // 로그인 성공 후 화면
  if (isLoggedIn && user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">환영합니다!</h2>
          <p className="mb-4">
            <strong>{user.name || user.id}</strong>님, 성공적으로 로그인했습니다.
          </p>
          <button
            onClick={handleLogout}
            className="w-full bg-black text-white py-3 rounded-lg font-medium"
          >
            로그아웃
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg">
            <p className="text-center">로딩 중...</p>
          </div>
        </div>
      )}
      
      {activeScreen === 'main' && (
        <div className="w-full max-w-md px-4">
          <div className="mb-16 text-left">
            <h1 className="text-4xl font-bold mb-1">우유팩과</h1>
            <h1 className="text-4xl font-bold mb-1">함께하는</h1>
            <h1 className="text-4xl font-bold">미래</h1>
          </div>
          
          {/* 소셜 로그인 버튼들 */}
          <div className="space-y-4">
            <button 
              onClick={() => handleSocialLogin('카카오')}
              className="flex items-center justify-center w-full py-3 rounded-full bg-yellow-400 text-black font-medium"
              disabled={isLoading}
            >
              <span className="bg-black text-white rounded-full p-1 mr-2 flex items-center justify-center" style={{ width: '24px', height: '24px' }}>
                <span className="text-xs">톡</span>
              </span>
              카카오톡으로 로그인
            </button>
            
            <button 
              onClick={() => handleSocialLogin('Google')}
              className="flex items-center justify-center w-full py-3 rounded-full bg-white border border-gray-200 text-black font-medium"
              disabled={isLoading}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" className="mr-2">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google로 로그인
            </button>
            
            <button 
              onClick={() => handleSocialLogin('Apple')}
              className="flex items-center justify-center w-full py-3 rounded-full bg-black text-white font-medium"
              disabled={isLoading}
            >
              <Apple size={20} className="mr-2" />
              Apple로 로그인
            </button>
            
            <div className="mt-4 text-center">
              <button 
                onClick={handleIDPWLogin}
                className="text-purple-500 text-sm"
                disabled={isLoading}
              >
                ID/PW로 로그인
              </button>
            </div>
          </div>
        </div>
      )}

      {activeScreen === 'login' && (
        <div className="w-full max-w-md px-4 bg-black rounded-lg py-8 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">ID로 로그인</h2>
          
          <div className="space-y-4">
            <input
              type="text"
              placeholder="ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className="w-full p-3 rounded-md text-black"
              disabled={isLoading}
            />
            
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className="w-full p-3 rounded-md text-black"
              disabled={isLoading}
            />
            
            {loginError && (
              <div className="text-red-400 text-sm">
                {loginError}
              </div>
            )}
            
            <div className="flex justify-center mt-4 text-sm">
              <button 
                type="button" 
                className="text-white underline mr-2"
                disabled={isLoading}
              >
                ID 찾기
              </button>
              <span className="text-white">/</span>
              <button 
                type="button" 
                className="text-white underline ml-2"
                disabled={isLoading}
              >
                Password 찾기
              </button>
            </div>
            
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={handleSignup}
                className="text-white underline text-sm"
                disabled={isLoading}
              >
                회원가입
              </button>
            </div>
            
            <button
              onClick={handleLogin}
              className="w-full bg-white text-black py-3 rounded-md font-medium mt-4"
              disabled={isLoading}
            >
              로그인
            </button>
          </div>

          <button
            onClick={handleGoBack}
            className="absolute top-4 left-4 text-white"
            disabled={isLoading}
          >
            ←
          </button>
        </div>
      )}

      {activeScreen === 'signup' && (
        <div className="w-full max-w-md px-4 bg-white rounded-lg py-8">
          <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>
          
          <div className="space-y-4">
            <input
              type="text"
              placeholder="ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-300"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              disabled={isLoading}
            />
            
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-300"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              disabled={isLoading}
            />
            
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-300"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              disabled={isLoading}
            />
            
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-300"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              disabled={isLoading}
            />
            
            {signupError && (
              <div className="text-red-500 text-sm">
                {signupError}
              </div>
            )}
            
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mr-2"
                disabled={isLoading}
              />
              <label htmlFor="terms" className="text-sm">이용약관 및 개인정보처리방침에 동의합니다</label>
            </div>
            
            <button
              type="button"
              onClick={handleSignupSubmit}
              className="w-full bg-black text-white py-3 rounded-md font-medium mt-4"
              disabled={isLoading}
            >
              가입하기
            </button>
          </div>

          <button
            onClick={() => setActiveScreen('login')}
            className="absolute top-4 left-4 text-black"
            disabled={isLoading}
          >
            ←
          </button>
        </div>
      )}

      {isKeyboardVisible && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-200 py-2">
          <div className="flex flex-wrap justify-center">
            <div className="flex w-full justify-around px-2 mb-2">
              <button className="w-8 h-10 bg-white rounded shadow">Q</button>
              <button className="w-8 h-10 bg-white rounded shadow">W</button>
              <button className="w-8 h-10 bg-white rounded shadow">E</button>
              <button className="w-8 h-10 bg-white rounded shadow">R</button>
              <button className="w-8 h-10 bg-white rounded shadow">T</button>
              <button className="w-8 h-10 bg-white rounded shadow">Y</button>
              <button className="w-8 h-10 bg-white rounded shadow">U</button>
              <button className="w-8 h-10 bg-white rounded shadow">I</button>
              <button className="w-8 h-10 bg-white rounded shadow">O</button>
              <button className="w-8 h-10 bg-white rounded shadow">P</button>
            </div>
            <div className="flex w-full justify-around px-6 mb-2">
              <button className="w-8 h-10 bg-white rounded shadow">A</button>
              <button className="w-8 h-10 bg-white rounded shadow">S</button>
              <button className="w-8 h-10 bg-white rounded shadow">D</button>
              <button className="w-8 h-10 bg-white rounded shadow">F</button>
              <button className="w-8 h-10 bg-white rounded shadow">G</button>
              <button className="w-8 h-10 bg-white rounded shadow">H</button>
              <button className="w-8 h-10 bg-white rounded shadow">J</button>
              <button className="w-8 h-10 bg-white rounded shadow">K</button>
              <button className="w-8 h-10 bg-white rounded shadow">L</button>
            </div>
            <div className="flex w-full justify-around px-2 mb-2">
              <button className="w-10 h-10 bg-gray-300 rounded shadow">⇧</button>
              <button className="w-8 h-10 bg-white rounded shadow">Z</button>
              <button className="w-8 h-10 bg-white rounded shadow">X</button>
              <button className="w-8 h-10 bg-white rounded shadow">C</button>
              <button className="w-8 h-10 bg-white rounded shadow">V</button>
              <button className="w-8 h-10 bg-white rounded shadow">B</button>
              <button className="w-8 h-10 bg-white rounded shadow">N</button>
              <button className="w-8 h-10 bg-white rounded shadow">M</button>
              <button className="w-10 h-10 bg-gray-300 rounded shadow">⌫</button>
            </div>
            <div className="flex w-full justify-around px-2">
              <button className="w-16 h-10 bg-gray-300 rounded shadow text-xs">123</button>
              <button className="w-40 h-10 bg-white rounded shadow">space</button>
              <button className="w-16 h-10 bg-gray-300 rounded shadow text-xs">return</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}