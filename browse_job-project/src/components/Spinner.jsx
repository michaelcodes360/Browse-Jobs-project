import { ClimbingBoxLoader, ClipLoader  } from "react-spinners";

const override = {
  display: "block",
  margin: "100px auto",
};

const Spinner = ({ loading }) => {
  return (
    <>
      <ClipLoader
        color="#4F46E5"
        loading={loading}
        cssOverride={override}
        size={100}
      />
      {/* <ClimbingBoxLoader
        color="#4F46E5"
        loading={loading}
        cssOverride={override}
        size={17}
      /> */}
    </>
  );
};

export default Spinner;
