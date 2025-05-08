import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [page, setPage] = useState('main');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const idInputRef = useRef(null);
  const navigate = useNavigate();

  const validUsers = [
    { id: 'user1', password: 'password1' },
    { id: 'user2', password: 'password2' },
    { id: 'admin', password: 'admin123' }
  ];

  useEffect(() => {
    if (page === 'email' && idInputRef.current) {
      idInputRef.current.focus();
    }
  }, [page]);

  const handleEmailLogin = (e) => {
    e.preventDefault();
    const foundUser = validUsers.find(user => user.id === id && user.password === password);
    if (foundUser) {
      localStorage.setItem('user', JSON.stringify(foundUser));
      alert('로그인 성공!');
      navigate('/mypage');
    } else {
      alert('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  const handleKakaoLogin = () => {
    alert('카카오 로그인 중...');
    setTimeout(() => {
      const kakaoUser = {
        id: 'kakao_user',
        name: '카카오 사용자',
        loginMethod: 'kakao'
      };
      localStorage.setItem('user', JSON.stringify(kakaoUser));
      alert('카카오 로그인 성공!');
      navigate('/mypage');
    }, 500);
  };

  const handleFindAccount = () => {
    alert('ID/비밀번호 찾기 기능은 현재 개발 중입니다.');
  };

  return (
    <div className="login-container">
      <button
        className="back-button"
        onClick={() => page === 'main' ? navigate('/home') : setPage('main')}
      >
        ← 뒤로가기
      </button>

      {/* 메인 로그인 선택 화면 */}
      <div style={{ display: page === 'main' ? 'block' : 'none' }}>
        <div className="login-header">
          <h1>유유팩과</h1>
          <h1>함께하는</h1>
          <h1>미래</h1>
        </div>
        <div className="login-buttons">
          <button className="kakao-login-btn" onClick={handleKakaoLogin}>
            톡카카오톡으로 로그인
          </button>
          <button className="email-login-btn" onClick={() => setPage('email')}>
            ID/PW로 로그인
          </button>
        </div>
      </div>

      {/* 이메일 로그인 화면 */}
      <div style={{ display: page === 'email' ? 'block' : 'none' }}>
        <h2>ID로 로그인</h2>
        <form onSubmit={handleEmailLogin}>
          <div className="form-group">
            <input
              type="text"
              value={id}
              ref={idInputRef}
              onChange={(e) => {
                console.log("change:", e.target.value);
                setId(e.target.value);
              }}
              onFocus={() => console.log("focus")}
              onBlur={() => console.log("blur")}
              placeholder="ID"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="user-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="find-account-links">
            <span onClick={handleFindAccount}>ID 찾기</span> / 
            <span onClick={handleFindAccount}>Password 찾기</span>
          </div>
          <button type="submit" className="login-button">로그인</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

console.log("Login 컴포넌트 렌더링됨");