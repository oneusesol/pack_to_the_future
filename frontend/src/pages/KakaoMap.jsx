import { useEffect } from "react";

function KakaoMap() {
console.log("KAKAO KEY!");
  useEffect(() => {
    //console.log("KAKAO KEY", import.meta.env.VITE_KAKAO_MAP_KEY);
    // 스크립트가 이미 있으면 중복 로딩 방지
    if (window.kakao && window.kakao.maps) {
      initMap();
    } else {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_KEY}&autoload=false`;
      script.async = true;
      script.onload = () => window.kakao.maps.load(loadMap);
      document.head.appendChild(script);
    }

    function loadMap() {
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(successHandler, errorHandler);}
        else {
          alert("Geolocation을 지원하지 않는 브라우저입니다.");
          initMap(37.5154, 126.9074); // 영등포역 위도, 경도 기본값
        }
      }
      function successHandler(position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log("현재 위치:", lat, lng);
        initMap(lat, lng);
      }
  
      function errorHandler(error) {
        console.error(error);
        alert("위치 정보를 가져올 수 없습니다. 기본 위치로 이동합니다.");
        initMap(37.5665, 126.9780); // 실패하면 서울 시청
      }
  
      function initMap(lat, lng) {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 3,
        };
        new window.kakao.maps.Map(container, options);
      }
    }, []);
  
    return (
      <div id="map" className="w-full h-screen"></div>
    );
  }
  
  export default KakaoMap;