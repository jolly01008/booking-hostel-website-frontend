import { useAuth } from "../../contexts/AuthContext.jsx";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'


//hook
import { useEffect, useState } from "react";

//scss
import styles from "./NavBar.module.scss";


export default function NavBar() {
  const { currentMember, isAuthenticated, getUser, switchRole, logout } = useAuth(); // SwitchRole - B
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate()

  const id = currentMember?.id;
  
  const handleClick = () => {
    logout();
  };

  const switchToLandlord = async () => {
    try{
      const res = await switchRole(); ; // 執行AuthContext的switchRole
      navigate(`/landlords/${res.data}`)
    } catch(error) {
      console.error("switchRole Error", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUser(id);
        setUserData(data.userData);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    if (isAuthenticated && id) {
      fetchData();
    }
  }, [id, isAuthenticated, getUser]);

  return (
    <div>
      {userData && (
      <div className={styles.NavBar}>
        
        <div className={styles.userSet}>
          <div className={styles.barName}>Hi~ 房客 {userData.name} </div>
          <NavLink className={styles.barBtn} to="/hostels">網站首頁</NavLink>
          {userData.currentRole === "tenant" && (
            <NavLink className={styles.barBtn} to={`/users/${id}`}>個人資料</NavLink>
          )}
          { userData.role === "tenant" && (
            <NavLink className={styles.barBtn} to={`/users/${id}/applyLandlord`}>申請成房東</NavLink>
          )}
        </div>

        <div className={styles.otherSet}>
          { userData.role === "landlord" && userData.currentRole === "tenant" && (
            <NavLink className={styles.barBtn} style={{color: 'yellow'}}
            onClick={switchToLandlord}>切換成房東</NavLink>
          )}
          <div onClick={handleClick} className={styles.barBtn}>
            <a href="/signin" className={styles.barBtn}>登出</a>
          </div>
        </div>
      </div>)}
          
    </div>

  )
}
