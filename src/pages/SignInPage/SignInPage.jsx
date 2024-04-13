import { useState } from "react";
import { useEffect } from "react";

import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

import AuthPageContainer from '../../components/AuthPageContainer/AuthPageContainer'
import Button from '../../components/Button/Button'
import AuthInput from '../../components/AuthInput/AuthInput'
import { useAuth } from '../../contexts/AuthContext'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const { login, isAuthenticated } = useAuth()

  const handleClick = async() => {

    if (email.length === 0) {
      return 
    }
    if (password.length === 0) {
      return 
    }

    // 呼叫login這個function(帶著email、password向後端請求登入)。用解構方式取得success、token
    const success = await login({
      email, password
    })
    if(success) {
      Swal.fire({
        title: '登入成功',
        text: '歡迎使用',
        icon: "success",
        position: "top",
        timer: 1500,
        showConfirmButton: false,
      });
      return
    }
    Swal.fire({
        title: '登入失敗',
        text: '帳號或密碼輸入錯誤',
        icon: "error",
        position: "top",
        timer: 1500,
        showConfirmButton: false,
      });
  }

  useEffect(() => {
    if (isAuthenticated){
      navigate('/hostels')
    }
  }, [navigate, isAuthenticated])

  return ( 
    <div>
    <AuthPageContainer title="登入 Booking Hostel">
      <AuthInput
        label="帳號"
        placeholder="請輸入帳號"
        value={email}
        onChange={(emailInputValue) => setEmail(emailInputValue)}
      />
      <AuthInput
       type="password"
        label="密碼"
        placeholder="請輸入密碼"
        value={password}
        onChange={(passwordInputValue) => setPassword(passwordInputValue)}
      />
      <Button title="登入" size="middle" onClick={handleClick}></Button>
    </AuthPageContainer>
    </div>
  )
}