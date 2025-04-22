
import logoImg from '../assets/Splash_logo.png'

function Splash() {
  return (
     <div className = "bg-green-300 text-center text-xl p-4">
      Tailwind 스타일 적용 확인
        <img src = {logoImg} alt = 'splash' />
    </div>
  )
}

export default Splash