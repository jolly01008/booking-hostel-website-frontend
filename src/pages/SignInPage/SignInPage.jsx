import { useState } from "react";
import AuthPageContainer from '../../components/AuthPageContainer/AuthPageContainer'
import Button from '../../components/Button/Button'
import AuthInput from '../../components/AuthInput/AuthInput'
import { login } from '../../api/auth'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleClick = async() => {

    if (email.length === 0) {
      return 
    }
    if (password.length === 0) {
      return 
    }
    // 呼叫login這個function(帶著email、password向後端請求登入)。用解構方式取得success、token
    const { success, token } = await login({
      email, password
    })

    if(success) {
      localStorage.setItem('token', token)
    }
  }

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