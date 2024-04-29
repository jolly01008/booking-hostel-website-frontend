// components
import NavBarLandlord from "../../components/NavBarLandlord/NavBarLandlord";

export default function LandlordHostels () {
  // const { landlordId } = useParams();
  // const { currentMember, isAuthenticated } = useAuth();
  // const token = localStorage.getItem("token");

  // const [hostels, setHostels] = useState([]);

  // // 瀏覽hostels的實際應用
  // useEffect(() => {
  //   if(isAuthenticated){
  //     const getLandlordHostelsAsync = async () => {
  //     try {
  //       //後端拿到的資料存到hostels
  //       const hostels = await getLandlordHostels(landlordId, token);
  //       // 改變hostels的狀態，進而重新渲染畫面
  //       setHostels(hostels);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   // 最後記得執行 getLandlordHostelsAsync 這個function
  //   getLandlordHostelsAsync();
  //   }
  // }, [isAuthenticated, token, landlordId]);

  // console.log('hostels內容', hostels)
  // console.log('currentMember內容', currentMember)
  return (
    <div>
      <NavBarLandlord></NavBarLandlord>
      <h1>test</h1>
    </div>
  )
} 