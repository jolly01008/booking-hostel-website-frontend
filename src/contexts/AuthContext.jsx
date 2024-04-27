import { createContext, useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import * as jwt from "jsonwebtoken"
import { useNavigate } from "react-router-dom";

import { login, register } from "../api/auth"
import { getUserInfo, getLandlordInfo, switchRole } from "../api/setting"

// 定義 context 內容
const defaultAuthContext = {
  isAuthenticated: false,
  currentMember: null,
  register: null,
  login: null,
  logout: null
};

const AuthContext = createContext(defaultAuthContext)
export const useAuth = () => useContext(AuthContext)
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [payload, setPayload] = useState(null)
  const navigate = useNavigate();

  // 儲存TOKEN不讓頁面在重新整理時讀不到
  useEffect(() => {
    const token = localStorage.getItem('token');
    if ( token ) {
      const tempPayload = jwt.decode(token)
      setIsAuthenticated(true)
      setPayload(tempPayload)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentMember: payload && {
          id: payload.id,
          name: payload.name,
          email: payload.email,
          role: payload.role,
          currentRole: payload.currentRole,
        },
         register: async (data) => {
          // 呼叫register function(向後端請求註冊的api)
          const success = await register({
            name: data.name,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
          });
          return success;
        },
        login: async ( data ) => {
          // 呼叫login function(向後端請求登入的api)抽取到這邊
          const { success, token } = await login({
              email: data.email, 
              password: data.password
            })
          const tempPayload = jwt.decode(token) //取得的token用jwt解析
            if(tempPayload) {
              setPayload(tempPayload);
              setIsAuthenticated(true);
              localStorage.setItem("token", token);
            } else {
              setPayload(null);
              setIsAuthenticated(false);
            }
              return success;
          },
          getUser: async (id) => {
            try{
              const token = localStorage.getItem('token'); //getUser頁面，已是登入驗證身分成功狀態，是可以取得toekn的
              const userInfo = await getUserInfo(token, id); // 呼叫getUser function(向後端請求getUser)
              return userInfo
            } catch (error) {
              console.error('getUser fail', error)
              return null
            }

          },
          getLandlord: async (landlordId) => {
            try{
              const token = localStorage.getItem('token'); //getUser頁面，已是登入驗證身分成功狀態，是可以取得toekn的
              const landlordInfo = await getLandlordInfo(token, landlordId); // 呼叫getLandlordInfo function(向後端請求)
              return landlordInfo
            } catch (error) {
              console.error('getLandlord fail', error)
              return null
            }
          },
          switchRole: async () => {
            const token = localStorage.getItem('token');
            const { data, switchedToken } = await switchRole(token) //先用目前的token呼叫這支api

            localStorage.setItem("token", switchedToken); // 呼叫switchRole後，後端會簽發一組新的token，儲存到localSotrage
            const switchedRolePayload = jwt.decode(switchedToken) //解析這組新的token
            setPayload(switchedRolePayload); // 解析出來的新payload，setPayload()更新狀態
            return { data, switchedToken }
          },
          logout: () => {
            localStorage.removeItem("token");
            setPayload(null);
            setIsAuthenticated(false);
            navigate("/signin");
        },
          
        }}
    > 
    { children } 
    </AuthContext.Provider>
  )
}