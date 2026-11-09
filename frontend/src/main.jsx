import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render( //아까 index.html에 있던 id=root를 찾는 것 입니다
  <StrictMode>
    <App />  //App.jsx에서 만든 리엑트 컴포넌트를 화면에 렌더링 합니다
  </StrictMode>,
)
