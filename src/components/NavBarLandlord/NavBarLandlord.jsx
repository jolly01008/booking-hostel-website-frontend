import { useAuth } from "../../contexts/AuthContext.jsx";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

import { getUserInfo } from "../../api/setting.js"

//hook
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//scss
import styles from "./NavBarLandlord.module.scss";


export default function NavBarLandlord() {
  const { landlordId } = useParams();
  const { currentMember, isAuthenticated, getLandlord, switchRole } = useAuth();
  const [landlordData, setLandlordData] = useState(null);
  const navigate = useNavigate()

  const id = currentMember?.id;
  
  const { logout } = useAuth();
  
  const handleClick = () => {
    logout();
  };

  const switchToUser = async () => {
    try{
      const res = await switchRole(); // 執行AuthContext的switchRole
      navigate(`/users/${res.data}`)
      await getUserInfo(res.switchedToken, res.data);
    } catch(error) {
      console.error("switchRole Error", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLandlord(landlordId);
        setLandlordData(data.landlordData);
      } catch (error) {
        console.error("Error fetching landlord data", error);
      }
    };
    if (isAuthenticated && id) {
      fetchData();
    }
  }, [id, isAuthenticated, getLandlord, landlordId]);

  return (
    <div>
      {landlordData && currentMember && (
      <div className={styles.NavBar}>
        
        <div className={styles.userSet}>
          <h6 className={styles.barBtn}>Hi ~ {landlordData.name} </h6>
          <NavLink className={styles.barBtn} to="/hostels">首頁</NavLink>
          {currentMember.currentRole === "landlord" && (
            <NavLink className={styles.barBtn} to={`/landlords/${landlordId}`}>房東資料</NavLink>
          )}
          { currentMember.role === "landlord" && currentMember.currentRole === "landlord" && (
            <NavLink className={styles.barBtn}>我的房源</NavLink>
          )}
        </div>

        <div className={styles.otherSet}>
          { currentMember.role === "landlord" && currentMember.currentRole === "landlord" && (
            <NavLink className={styles.barBtn} onClick={switchToUser} to={`/users/${id}`}>切換成房客</NavLink>
          )}
          <div onClick={handleClick}>
            <a href="/signin" className={styles.barBtn}>登出</a>
          </div>
        </div>
      </div>)}
          
    </div>

  )
}
