import { useNavigate } from "react-router-dom";
import box from "../assets/box.png";
import home from "../assets/home.png";
import user_profile from "../assets/user_profile.png";

function Footer() {
  const navigate = useNavigate();
  
  const handleMyPageClick = () => {
    console.log("🧭 마이페이지 버튼 클릭됨");
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/mypage');
    } else {
      navigate('/login',{replace: true}); // 로그인 안 됐으면 로그인 페이지로 이동
    }
  };


  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around py-2 z-50">
      <button onClick={() => navigate('/map')} className="flex flex-col items-center text-sm text-gray-500">
        <img src={box} className="w-6 h-6" />
        <span>수거</span>
      </button>
      <button onClick={() => navigate('/')} className="flex flex-col items-center text-sm text-gray-500">
        <img src={home} className="w-6 h-6" />
        <span>홈</span>
      </button>
      {/* 마이페이지 버튼에 핸들러 추가 */}
      <button onClick={handleMyPageClick} className="flex flex-col items-center text-sm text-gray-500">
        <img src={user_profile} className="w-6 h-6" />
        <span>마이페이지</span>
      </button>
    </div>
  );
}

export default Footer;