// DOM 요소 가져오기
document.addEventListener('DOMContentLoaded', function() {
    // 화면 요소
    const loginOptionsScreen = document.getElementById('login-options-screen');
    const emailLoginScreen = document.getElementById('email-login-screen');
    const loginSuccessScreen = document.getElementById('login-success-screen');
    
    // 버튼 요소
    const kakaoLoginBtn = document.getElementById('kakao-login-btn');
    const emailLoginBtn = document.getElementById('email-login-btn');
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');
    const forgotId = document.getElementById('forgot-id');
    const forgotPassword = document.getElementById('forgot-password');
    
    // 폼 입력 필드
    const userIdInput = document.getElementById('user-id');
    const userPasswordInput = document.getElementById('user-password');
    
    // 간단한 사용자 데이터베이스 (실제 구현에서는 서버에 저장)
    const users = [
        { id: 'user1', password: 'password1' },
        { id: 'user2', password: 'password2' },
        { id: 'admin', password: 'admin123' }
    ];

    // 현재 로그인된 사용자 정보
    let currentUser = null;
    
    // 페이지 초기화 - 로컬 스토리지에서 로그인 상태 확인
    function initializePage() {
        const savedUser = localStorage.getItem('currentUser');
        
        if (savedUser) {
            currentUser = JSON.parse(savedUser);
            showLoginSuccessScreen();
        }
    }
    
    // 카카오 로그인 버튼 클릭 이벤트
    kakaoLoginBtn.addEventListener('click', function() {
        // 카카오 로그인 API 연동 코드가 여기에 들어갑니다.
        // 실제 구현에서는 카카오 SDK를 사용합니다.
        // 이 예제에서는 로그인 성공으로 가정하고 진행합니다.
        
        // 가상의 카카오 사용자 생성
        const kakaoUser = {
            id: 'kakao_user',
            name: '카카오 사용자',
            loginMethod: 'kakao'
        };
        
        // 사용자 정보 저장 및 로그인 성공 화면 표시
        loginSuccess(kakaoUser);
    });
    
    // 이메일 로그인 버튼 클릭 이벤트
    emailLoginBtn.addEventListener('click', function() {
        // 이메일 로그인 화면으로 전환
        loginOptionsScreen.style.display = 'none';
        emailLoginScreen.style.display = 'block';
    });
    
    // 로그인 폼 제출 이벤트
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // 폼 기본 제출 동작 방지
        
        const userId = userIdInput.value.trim();
        const userPassword = userPasswordInput.value.trim();
        
        // 사용자 인증 수행
        const user = authenticateUser(userId, userPassword);
        
        if (user) {
            // 로그인 성공 처리
            loginSuccess(user);
        } else {
            // 로그인 실패 알림
            alert('아이디 또는 비밀번호가 올바르지 않습니다.');
        }
    });
    
    // 로그아웃 버튼 클릭 이벤트
    logoutBtn.addEventListener('click', function() {
        logout();
    });
    
    // ID 찾기 클릭 이벤트
    forgotId.addEventListener('click', function() {
        alert('ID 찾기 기능은 현재 개발 중입니다.');
    });
    
    // 비밀번호 찾기 클릭 이벤트
    forgotPassword.addEventListener('click', function() {
        alert('비밀번호 찾기 기능은 현재 개발 중입니다.');
    });
    
    // 사용자 인증 함수
    function authenticateUser(id, password) {
        // 사용자 데이터베이스에서 일치하는 사용자 찾기
        const user = users.find(user => user.id === id && user.password === password);
        
        if (user) {
            // 인증된 사용자 정보에 로그인 방법 추가
            return {
                id: user.id,
                loginMethod: 'email'
            };
        }
        
        return null; // 인증 실패
    }
    
    // 로그인 성공 처리 함수
    function loginSuccess(user) {
        // 현재 사용자 정보 업데이트
        currentUser = user;
        
        // 로컬 스토리지에 사용자 정보 저장 (페이지 새로고침 후에도 로그인 상태 유지)
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // 로그인 성공 화면 표시
        showLoginSuccessScreen();
    }
    
    // 로그인 성공 화면 표시 함수
    function showLoginSuccessScreen() {
        loginOptionsScreen.style.display = 'none';
        emailLoginScreen.style.display = 'none';
        loginSuccessScreen.style.display = 'block';
    }
    
    // 로그아웃 함수
    function logout() {
        // 현재 사용자 정보 초기화
        currentUser = null;
        
        // 로컬 스토리지에서 사용자 정보 제거
        localStorage.removeItem('currentUser');
        
        // 초기 로그인 옵션 화면으로 돌아가기
        loginOptionsScreen.style.display = 'block';
        emailLoginScreen.style.display = 'none';
        loginSuccessScreen.style.display = 'none';
        
        // 로그인 폼 초기화
        loginForm.reset();
    }
    
    // 페이지 초기화 실행
    initializePage();
});