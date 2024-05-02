// components
import NavBarLandlord from "../../components/NavBarLandlord/NavBarLandlord";

// hook
import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useAuth } from "../../contexts/AuthContext.jsx";
import { NavLink } from 'react-router-dom';

// scss
import styles from "./LandlordHostel.module.scss";

export default function LandlordHostels () {
  const { landlordId, hostelId } = useParams();
  // const { currentMember, isAuthenticated } = useAuth();
  const token = localStorage.getItem("token");
  console.log('token', token)

  return (
    <div>
      <NavBarLandlord></NavBarLandlord>
      <h1>test</h1>
      {/* 此處要瀏覽該旅館的全部房間 */}
        <div className={styles.btn}>
          <NavLink to={`/landlords/${landlordId}/hostels/${hostelId}/createRoom`}>
            <button type="submit"> 新增房間 </button>
          </NavLink>
        </div>
    </div>
  )
} 