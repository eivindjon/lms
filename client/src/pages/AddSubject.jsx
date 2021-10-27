import "../App.css";
import MyNavbar from "../Components/MyNavbar";
import CreateSubjectPlan from "../Components/CreateSubjectPlan";
import NavigationCrumb from "../Components/Breadcrumb";

function AddSubject() {
  return (
    <div>
      <MyNavbar />
      <NavigationCrumb />
      <CreateSubjectPlan />
    </div>
  );
}

export default AddSubject;