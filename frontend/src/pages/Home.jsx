import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <Header />
      <main>
        <h2>Main 영역입니다</h2>
        <button onClick={goToLogin}>마이페이지</button>
      </main>
      <Footer />
    </>
  );
}

export default Home;