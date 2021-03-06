import "../App.css";
import MyNavbar from "../Components/MyNavbar";
import AbsenseTable from "../Components/AbsenseTable";
import NavigationCrumb from "../Components/Breadcrumb";

function UserStats() {
  return (
    <div>
      <MyNavbar />
      <NavigationCrumb />
      <AbsenseTable />
    </div>
  );
}

export default UserStats;
