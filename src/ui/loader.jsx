import { useSelector } from "react-redux";

function Loader() {
  const isLoading = useSelector((state) => state?.common?.loading);
  return (
    <>
      {isLoading && (
        <div className="overlay">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
}

export default Loader;
