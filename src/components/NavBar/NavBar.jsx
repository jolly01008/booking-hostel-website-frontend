import { useAuth } from "../../contexts/AuthContext.jsx";
import { NavLink } from 'react-router-dom';

//hook
import { useEffect, useState } from "react";

//scss
import styles from "./NavBar.module.scss";


export default function NavBar({  landlordId }) {
  const { currentMember, isAuthenticated, getUser } = useAuth();
  const [userData, setUserData] = useState(null);

  const id = currentMember?.id;
  
  const { logout } = useAuth();
  
  const handleClick = () => {
    logout();
  };

  useEffect(() => {
    const fetchData = async () => {
    console.log('NavBar的isAuthenticated內容A:', isAuthenticated)
      try {
        const data = await getUser(id);
        setUserData(data.userData);
      } catch (error) {
        
        console.log("Error fetching user data", error);
      }
    };
    if (isAuthenticated && id) {
      fetchData();
    }
  }, [id, isAuthenticated, getUser]);

  console.log('NavBar的userData內容是啥:', userData)

  return (
    <div>
      {userData && (
      <div className={styles.NavBar}>
        
        <div className={styles.userSet}>
          <h6 className={styles.barBtn}>Hi ~ {userData.name} </h6>
          <NavLink className={styles.barBtn} to="/hostels">首頁</NavLink>
          { userData.role === "tenant" && (
            <NavLink className={styles.barBtn} to={`/users/${id}/applyLandlord`}>申請成房東</NavLink>
          )}
          { userData.role === "landlord" && userData.currentRole === "landlord" && (
            <NavLink className={styles.barBtn} to={`/landlords/${landlordId}/hostels`}>我的房源</NavLink>
          )}
        </div>

        <div className={styles.otherSet}>
          { userData.role === "landlord" && userData.currentRole === "tenant" && (
            <NavLink className={styles.barBtn} to={`/landlords/${landlordId}`}>切換成房東</NavLink>
          )}
          { userData.role === "landlord" && userData.currentRole === "landlord" && (
            <NavLink className={styles.barBtn} to={`/users/${id}`}>切換成房客</NavLink>
          )}
          <div onClick={handleClick}>
            <a href="test" className={styles.barBtn}>登出</a>
          </div>
        </div>
      </div>)}
          
    </div>

  )
}
