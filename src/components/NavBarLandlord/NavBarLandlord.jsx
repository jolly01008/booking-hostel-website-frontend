import { useAuth } from "../../contexts/AuthContext.jsx";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'


//hook
import { useEffect, useState } from "react";

//scss
import styles from "./NavBarLandlord.module.scss";


export default function NavBarLandlord() {
  const navigate = useNavigate()

  const { currentMember, isAuthenticated, getLandlord, switchRole } = useAuth();
  
  const [landlordData, setLandlordData] = useState(null);

  const id = currentMember?.id;
  const landlordId = currentMember?.landlordId; // 取得currentMember的landlordId
  
  const switchToUser = async () => {
    try{
      const res = await switchRole(); // 執行AuthContext的switchRole
      navigate(`/users/${res.data}`)
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
          <div className={styles.barName}>Hi~ 房東 {landlordData.name} </div>
          <NavLink className={styles.barBtn} to="/hostels">網站首頁</NavLink>
          {currentMember.currentRole === "landlord" && (
            <NavLink className={styles.barBtn} to={`/landlords/${landlordId}`}>房東資料</NavLink>
          )}
          { currentMember.role === "landlord" && currentMember.currentRole === "landlord" && (
            <NavLink className={styles.barBtn} to={`/landlords/${landlordId}/hostels`}>我的旅館</NavLink>
          )}
        </div>

        <div className={styles.otherSet}>
          { currentMember.role === "landlord" && currentMember.currentRole === "landlord" && (
            <NavLink className={styles.barBtn} style={{color: 'yellow'}} onClick={switchToUser} to={`/users/${id}`}>切換成房客</NavLink>
          )}
        </div>
      </div>)}
          
    </div>

  )
}
