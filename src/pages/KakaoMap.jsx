import { useEffect } from "react";

function KakaoMap() {
console.log("KAKAO KEY!");
  useEffect(() => {
    console.log("KAKAO KEY", import.meta.env.VITE_KAKAO_MAP_KEY);
    // 스크립트가 이미 있으면 중복 로딩 방지
    if (window.kakao && window.kakao.maps) {
      initMap();
    } else {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_KEY}&autoload=false`;
      script.async = true;
      script.onload = () => window.kakao.maps.load(initMap);
      document.head.appendChild(script);
    }

    function initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울 시청
        level: 3,
      };
      new window.kakao.maps.Map(container, options);
    }
  }, []);

  return (
    <div id="map" className="w-full h-screen" />
  );
}

export default KakaoMap;