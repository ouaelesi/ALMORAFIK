import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faBell, faRightFromBracket, faBars, faCircle } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import LangSwitcher from "./shared/LangSwitcher";
import { headerData } from "../data/TemporaryData/staticData/arab/headerData";
import { headerDataEng } from "../data/TemporaryData/staticData/eng/headerDataEng";
import Modal from "./Modal";
import Pusher from 'pusher-js';

const Header = () => {
  const { locale } = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="px-md-5 px-2 nav ">
      <div
        className={` ${
          locale === "arab" ? "flex-row-reverse" : ""
        } d-flex justify-content-between py-3 w-100`}
      >
        <Link href="/" className="px-2">
          <img
            src={
              locale === "arab"
                ? "/assets/imgs/darkLogoAr.png"
                : "/assets/imgs/darkLogo.png"
            }
            className="navlogo"
            width="145px"
          />
        </Link>
        <Links classNames="d-none d-md-flex w-100" />
        <div className="d-block d-md-none" onClick={toggle}>
          <FontAwesomeIcon
            icon={isOpen ? faX : faBars}
            style={{ marginTop: 4, fontSize: 30 }}
          />
        </div>
      </div>
      {isOpen && (
        <div className="w-100">
          <Links classNames="d-block d-md-none" />
        </div>
      )}
    </div>
  );
};

export default Header;

const Links = ({ classNames }) => {
  const router = useRouter();
  const { locale } = useRouter();
  const { data: session, status } = useSession();
  const [navData, setNavData] = useState(headerData);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const dropdownRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    fetch(`/api/notifications/${notification._id}`, {
      method: "PATCH",
    });
    if (notifications && notifications.length > 0) {
      setNotifications((prevNotifications) =>
        prevNotifications.map((n) =>
          n._id === notification._id ? { ...n, read: true } : n
        )
      );
    }
    toggleModal();
  };

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      const pusher = new Pusher('c136048a3b3fdd39b363', {
        cluster: 'eu',
        authEndpoint: '/api/pusher/auth',
        auth: {
          headers: {
            contentType: "application/json",
          },
        },
      });

      const channel = pusher.subscribe(`private-user-${session.user.id}`);
      console.log('Subscribed to pusher channel', channel);

      channel.bind('new-notification', (notification) => {
        setNotifications((prevNotifications) => [notification, ...prevNotifications]);
        console.log('New notification received', notification);
      });

      return () => {
        pusher.unsubscribe(`private-user-${session.user.id}`);
      };
    }
  }, [session, status]);

  useEffect(() => {
    locale === "arab" ? setNavData(headerData) : setNavData(headerDataEng);
  }, [locale]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchNotifications();
      fetchUserProfilePicture();
    }
  }, [status]);

  const fetchNotifications = async () => {
    const res = await fetch(`/api/notifications/${session.user.id}`);
    const data = await res.json();
    setNotifications(data);
  };

  const fetchUserProfilePicture = async () => {
    const res = await fetch(`/api/users/${session.user.email}`);
    const data = await res.json();
    console.log(res);
    setProfilePicture(data.photo);
  };

  const handleSignOut = async (e) => {
    console.log("signing out");
    e.preventDefault();
    setDropdownOpen(false);
    await signOut({ redirect: false });
    router.push("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleDropdown2 = () => {
    setDropdownOpen2(!dropdownOpen2);
  };

  return (
    <div
      className={` ${
        locale === "arab" ? "flex-row-reverse" : ""
      } justify-content-between d-block w-100 ${classNames}`}
    >
      <div
        className={` ${
          locale === "arab" ? "flex-row-reverse" : ""
        } d-md-flex d-block justify-content-around w-100 w-md-100`}
      >
        <Link href="./" className="navlink text-dark d-block">
          {navData.links.home}
        </Link>
        <Link href="/questions" className="navlink text-dark d-block">
          {navData.links.questions}
        </Link>
        <Link href="/resources" className="navlink text-dark d-block">
          {navData.links.resources}
        </Link>
        <Link href="/tools" className="navlink text-dark d-block">
          {navData.links.tools}
        </Link>
        <Link href="/aboutUs" className="navlink text-dark d-block">
          {navData.links.contact}
        </Link>
      </div>
      <div
        className={` ${
          locale === "arab" ? "flex-row-reverse" : ""
        } d-md-flex w-md-fit mx-auto justify-between items-center`}
      >
        <div className="mx-2 mt-1 relative">
          {status === "authenticated" && session?.user && (
            <div className="d-flex align-items-center" ref={dropdownRef}>
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt="Profile Picture"
                  className="rounded-full h-9 w-14 cursor-pointer border-2 border-gray-300"
                  onClick={toggleDropdown}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faCircleUser}
                  style={{ fontSize: 30, cursor: "pointer" }}
                  onClick={toggleDropdown}
                />
              )}
              {dropdownOpen && (
                <div
                  className={`absolute top-full mt-2 w-48 bg-white shadow-lg rounded-md z-10 ${
                    locale === "arab" ? "left-auto" : "right-0"
                  }`}
                >
                  <Link
                    href="/Profil"
                    className="block rounded-t-md px-4 py-2 text-gray-800 hover:bg-blue-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {navData.actions.profile}
                  </Link>
                  <div
                    className="block rounded-b-md px-4 py-2 text-gray-800 hover:bg-red-100 hover:text-red-600 cursor-pointer"
                    onClick={handleSignOut}
                  >
                    {navData.actions.logOut}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="mx-2 mt-1 relative items-center justify-center">
          {status === "authenticated" && session?.user && (
            <div className="d-flex items-center justify-center" ref={dropdownRef}>
              <FontAwesomeIcon
                icon={faBell}
                style={{ fontSize: 20, cursor: "pointer" }}
                onClick={toggleDropdown2}
              />
              {dropdownOpen2 && (
                <div
                  className={`absolute top-full mt-2 w-fit bg-white shadow-lg rounded-md z-10 ${
                    locale === "arab" ? "left-0" : "right-0"
                  }`}
                >
                  {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <div
                        key={index}
                        className={`block font-normal text-sm px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer ${!notification.read ? "bg-red-100" : ""}`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        {notification.title}
                        {!notification.read && (
                          <FontAwesomeIcon
                            icon={faCircle}
                            className="text-red-500 ml-3"
                          />
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="block px-4 py-2 text-gray-800">
                      No notifications
                    </div>
                  )}
                </div>
              )}

              {modalOpen && selectedNotification && (
                <Modal onClose={toggleModal}>
                  <div className="p-4">
                    <p>{selectedNotification.message}</p>
                    <div className="mt-4">
                      <Link className="text-blue-500 hover:underline" href={`/questions/${selectedNotification.questionId}`} onClick={()=>{setModalOpen(false);setDropdownOpen2(false)}}>
                        View Question
                      </Link>
                    </div>
                  </div>
                </Modal>
              )}
            </div>
          )}
        </div>
        <div className="mx-2 mt-1">
          <LangSwitcher />
        </div>
      </div>
    </div>
  );
};