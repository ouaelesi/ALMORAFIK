import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../utils/AuthContext";
import UserAskedQues from "../../partials/UserAskedQues";
const Profil = () => {
  const [profilData, setProfilData] = useState("There Is No Data");
  const [isLoading, setLoading] = useState(true);

  const [pswSecIsOpen, setPSWsection] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log("Profil Page cbn");
    setLoading(true);
    console.log("the user", user);

    if (user) {
      fetch(`/api/users/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setProfilData(data);
          setLoading(false);
        })
        .catch((err) => console.log("there is an error", user));
    } else {
      setLoading(false);
    }
  }, [user]);

  if (isLoading)
    return (
      <div className="h-screen pt-20">
        <div className="spinner-border block mx-auto" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  return (
    <div className="bg-light">
      <div className="px-20 py-10 h-screen container ">
        <div className="row gap-2">
          <div className="col-4">
            <div className="bg-dark p-5 w-1/3 rounded-full"></div>
            <button className="px-2 rounded-md border-2 border-dark my-3">
              Change Photo
            </button>
          </div>
          <form className="col-7  ">
            UserName
            <div className="row gap-2 mb-4">
              <input
                defaultValue={profilData.userName}
                className="form-control col"
              ></input>
              <button className="btn btn-warning col-2">Edit</button>
            </div>
            Email
            <div className="row gap-2 mb-4">
              <input
                defaultValue={profilData.email}
                className="form-control col w-8/12"
              ></input>
              <button className="btn btn-warning col-2">Edit</button>
            </div>
            {!pswSecIsOpen && (
              <div
                className="mb-4 underline cursor-pointer"
                onClick={() => setPSWsection(true)}
              >
                Edit password
              </div>
            )}
            {pswSecIsOpen && (
              <div>
                <button
                  className="float-right"
                  onClick={() => setPSWsection(false)}
                >
                  X
                </button>
                Current Password
                <div className="row gap-2 mb-4">
                  <input
                    type="password"
                    className="form-control col w-8/12"
                  ></input>
                </div>
                New password
                <div className="row gap-2 mb-4">
                  <input
                    type="password"
                    placeholder="Set a new password"
                    className="form-control col w-8/12"
                  ></input>
                </div>
              </div>
            )}
            <button className="btn btn-warning float-right">
              Save Changes
            </button>
          </form>
        </div>
        <div>
          <UserAskedQues />
        </div>
      </div>
    </div>
  );
};

export default Profil;
