 //components
import NavBarLandlord from "../../components/NavBarLandlord/NavBarLandlord.jsx";
import RowCard from "../../components/RowCard/RowCard.jsx";

//hook
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { NavLink } from 'react-router-dom';

//api
import { getLandlordHostels } from "../../api/landlord.js";

//scss
import styles from "./LandlordHostels.module.scss";

export default function LandlordHostels () {
  const { landlordId } = useParams();
  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem("token");

  const [hostels, setHostels] = useState([]);

  // 瀏覽LandlordHostel的實際應用
  useEffect(() => {
    if(isAuthenticated){
      const getLandlordHostelsAsync = async () => {
      try {
        //後端拿到的資料存到hostels
        const hostels = await getLandlordHostels(landlordId, token);
        // 改變hostels的狀態，進而重新渲染畫面
        setHostels(hostels);
      } catch (error) {
        console.error(error);
      }
    };
    // 最後記得執行 getLandlordHostelsAsync 這個function
    getLandlordHostelsAsync();
    }
  }, [isAuthenticated, token, landlordId]);

  return (
    <div>
      <NavBarLandlord></NavBarLandlord>
      <div>

          <div className={styles.container}>
            <div className={styles.allBlock}>
              {hostels.length > 0 ? (
                hostels.map((hostel) => (
                  <div key={hostel.id}>
                    <NavLink to={`/landlords/${landlordId}/hostels/${hostel.id}/edit`}>
                      <button className={styles.editBtn}>編輯這個旅館</button>
                    </NavLink>
                    <NavLink className={styles.NavLink} to={`/landlords/${landlordId}/hostels/${hostel.id}/rooms`}>
                      
                    <RowCard
                      landlordId={landlordId}
                      hostelId={hostel.id}
                      name={hostel.name}
                      address={hostel.address}
                      description={hostel.description}
                      picture={hostel.picture}
                    />
                    </NavLink>
                  </div>
                ))
              ) : (
                <h5>尚未有任何旅館...</h5>
              )}                  
              <div>
                <NavLink to={`/landlords/${landlordId}/hostels/create`} style={{textDecoration: 'none'}}>
                <button className={styles.btn}> 新增旅館 + </button>
                </NavLink>
              </div>

            </div>
          </div>


      </div>
    </div>
  )
} 