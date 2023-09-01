import React, { useState } from "react";
import "./home.css";
// icons import here start
// icons import here end
import { FcUpLeft } from "react-icons/fc";
import { RiSpam2Line, RiMessage2Fill } from "react-icons/ri";
import { BiArchiveIn } from "react-icons/bi";
import { FiMoreVertical } from "react-icons/fi";
import { GoMoveToEnd } from "react-icons/go";
import { MdOutlineAddTask } from "react-icons/md";
import { FaOpencart } from "react-icons/fa";
import { AiFillDelete, AiOutlineClockCircle } from "react-icons/ai";
// icons import here start
// image import start here
import view from "../../Assets/view.png";
import folder from "../../Assets/folder.png";
import photos from "../../Assets/photos.png";
import docs from "../../Assets/document.png";
import travel from "../../Assets/travel.png";
import subs from "../../Assets/subs.png";
import deals from "../../Assets/deals.png";
import user from "../../Assets/user.png";
import ComposeMail from "./ComposeMail/ComposeMail";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeMail } from "../../Store/mail-slice";
import { toast } from "react-toastify";
// image import end here

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [iscompose, setCompose] = useState(false);
  const [activeListItem, setActiveListItem] = useState("Inbox");
  const [isActive, setIsActive] = useState(false);
  const [readmoode, setReadMode] = useState(false);
  const [readModeValue, setReadModeValue] = useState("");
  const [temp, setTemp] = useState([]);
  const [isStarred, setIsStarred] = useState(false);

  const sentMails = useSelector((state) => state.mail.sentMails);
  const allMails = useSelector((state) => state.mail.allMails);
  const deletedMails = useSelector((state) => state.mail.deleteMails);
  const dispatch = useDispatch();
  const currentDate = new Date();
  const navigate = useNavigate();

  // Function to format the time (hh:mm AM/PM)
  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };
  // Function to format the date (yyyy-mm-dd)
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  // Get the formatted time and date
  const formattedTime = formatTime(currentDate);
  const formattedDate = formatDate(currentDate);

  const toggleStar = () => {
    setIsStarred((prevIsStarred) => !prevIsStarred);
  };
  const readModeActivehandler = (value) => {
    setReadMode(true);
    setReadModeValue(value);
    console.log(value);
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const composehandle = (value) => {
    setCompose(value);
  };
  const handleItemClick = (item) => {
    setActiveListItem(item);
    setReadMode(false);
    switch (item) {
      case "Inbox":
        setTemp(allMails);
        break;
      case "Sent":
        setTemp(sentMails);
        break;
      case "Deleted Items":
        setTemp(deletedMails);
        break;
      default:
        setTemp([]);
    }
  };
  const toggleAccordion = () => {
    setIsActive((prevState) => !prevState);
  };
  const readmodeHandler = () => {
    setReadMode(false);
  };

  const logoutHandler = () => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("email");
    navigate("/");
  };

  const deleteHandler = (value) => {
    dispatch(removeMail(value));
    toast.success("Deleted Successfully");
    setTemp([]);
  };
  return (
    <div>
      {/* Header Start here  */}
      <div className="container-fluid home-header-bg">
        <header className="container-fluid pt-2 pb-2 align-items-center d-flex flex-row justify-content-between">
          <div className="">
            <div className="text-light font-weight d-flex flex-row align-items-center">
              {/* Menu start here  */}
              <div
                className={isMenuOpen ? "change  ms-s me-3" : "disp ms-s me-3"}
                onClick={handleMenuClick}
              >
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
              </div>
              {/* Menu start here  */}
              <h1> Yahoo!!</h1>
            </div>
          </div>

          {/* Search container start here  */}
          <div className="search-cantrol w-100 ms-5 ms-5">
            <input
              type="text"
              class="search-input font-weight"
              placeholder="Find messages, documents, photos or people.."
            />
            <button class="search-button font-weight">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M8.195 0c4.527 0 8.196 3.62 8.196 8.084a7.989 7.989 0 0 1-1.977 5.267l5.388 5.473a.686.686 0 0 1-.015.98a.71.71 0 0 1-.993-.014l-5.383-5.47a8.23 8.23 0 0 1-5.216 1.849C3.67 16.169 0 12.549 0 8.084C0 3.62 3.67 0 8.195 0Zm0 1.386c-3.75 0-6.79 2.999-6.79 6.698c0 3.7 3.04 6.699 6.79 6.699s6.791-3 6.791-6.699c0-3.7-3.04-6.698-6.79-6.698Z"
                />
              </svg>
            </button>
          </div>

          {/* added logout button  */}
          <div className="">
            {" "}
            <button className="logout px-5 py-2" onClick={logoutHandler}>
              LogOut
            </button>
          </div>
          {/* added logout button  */}

          {/* Search container end here  */}
        </header>
      </div>
      {/* Header End here  */}

      <div className="container-fluid mail-main">
        <div className="row">
          <section
            className={
              isMenuOpen
                ? `menu col-lg-2  col-md-12 p-3 rad`
                : `menu-disp menu col-lg-2  col-md-12 p-3 rad`
            }
          >
            {/* Compose Button start here */}
            <button
              className="compose font-weight text-light"
              onClick={() => {
                composehandle(true);
              }}
            >
              Compose mail
            </button>
            {/* Compose Button end here */}

            {/* Inbox list start here */}
            <div class="inbox-list">
              <ul className="menu-list font-weight mt-1">
                <li
                  className={activeListItem === "Inbox" ? "list-active" : ""}
                  onClick={() => handleItemClick("Inbox")}
                >
                  Inbox{" "}
                  <span className="inbox-mail-count">{allMails?.length}</span>
                </li>
                <li
                  className={activeListItem === "Unread" ? "list-active" : ""}
                  onClick={() => handleItemClick("Unread")}
                >
                  Unread
                </li>
                <li
                  className={activeListItem === "Starred" ? "list-active" : ""}
                  onClick={() => handleItemClick("Starred")}
                >
                  Starred
                </li>
                <li
                  className={activeListItem === "Drafts" ? "list-active" : ""}
                  onClick={() => handleItemClick("Drafts")}
                >
                  Drafts
                </li>
                <li
                  className={activeListItem === "Sent" ? "list-active" : ""}
                  onClick={() => handleItemClick("Sent")}
                >
                  Sent{" "}
                  <span className="sent-mail-count">{sentMails?.length}</span>
                </li>
                <li
                  className={activeListItem === "Spam" ? "list-active" : ""}
                  onClick={() => handleItemClick("Spam")}
                >
                  Spam
                </li>
                <li
                  className={
                    activeListItem === "Deleted Items" ? "list-active" : ""
                  }
                  onClick={() => handleItemClick("Deleted Items")}
                >
                  Deleted Items{" "}
                  <span className="delete-mail-count">
                    {deletedMails?.length}
                  </span>
                </li>
              </ul>
            </div>
            {/* Inbox list end here */}

            {/* Accordian 1st start here */}
            <div
              className={`accordion ${isActive ? "active" : ""}`}
              onClick={toggleAccordion}
            >
              <button className="accor-button mt-2 font-weight">
                <img src={view} alt="xyz-damaged" className="img-style" />
                Views
              </button>
              <div
                className="panel"
                style={{ display: isActive ? "block" : "none" }}
              >
                <ul className="menu-list font-weight mt-1">
                  <li class="">
                    {" "}
                    <img src={photos} alt="xyz-damaged" className="img-style" />
                    Photos
                  </li>
                  <li>
                    {" "}
                    <img src={docs} alt="xyz-damaged" className="img-style" />
                    Documents
                  </li>
                  <li>
                    <img src={subs} alt="xyz-damaged" className="img-style" />
                    Subscription
                  </li>
                  <li>
                    {" "}
                    <img src={deals} alt="xyz-damaged" className="img-style" />
                    Deals
                  </li>
                  <li>
                    {" "}
                    <img src={travel} alt="xyz-damaged" className="img-style" />
                    Travels
                  </li>
                </ul>
              </div>
            </div>
            {/* Accordian 1st end here */}

            {/* Accordian 2nd start here */}
            <div
              className={`accordion ${isActive ? "active" : ""}`}
              onClick={toggleAccordion}
            >
              <button className="accor-button mt-2 font-weight">
                <img src={folder} alt="xyz-damaged" className="img-style" />{" "}
                Folder
              </button>
              <div
                className="panel"
                style={{ display: isActive ? "block" : "none" }}
              >
                <ul className="menu-list font-weight mt-1">
                  <li class="">+New Folder</li>
                </ul>
              </div>
            </div>
            {/* Accordian 2nd end here */}
          </section>
          {!readmoode && (
            <section className="bg-light list col-lg-10 col-md-12 rad">
              <div className="mail-list-header d-flex align-items-center justify-content-between p-2 border-bottom overflow-x-auto">
                <div>
                  <input
                    type="checkbox"
                    name="SelectAll"
                    id="SelectAll"
                    className="font-weight checkbox"
                  />
                </div>
                <div className="d-flex align-items-center justify-content-between shortcut">
                  <span>Archive</span>
                  <span>Move</span>
                  <span>Delete</span>
                  <span>Spam</span>
                  <span>...</span>
                </div>
                <div>
                  <select name="sort" id="sort" className="font-weight">
                    <option value="sort">Sort By Date</option>
                    <option value="sort">Sort By Sender</option>
                  </select>
                </div>
              </div>

              {/* Mail Lists start  */}
              <div className="mail-lists">
                {temp.length === 0 ? (
                  <h3>No Mails Available</h3>
                ) : (
                  <ul>
                    {temp.map((value) => (
                      <li
                        className="font-weight d-flex align-items-center justify-content-between font-reducer"
                        onClick={() => {
                          readModeActivehandler(value);
                        }}
                      >
                        <input type="checkbox" name="Select" id="Select" />
                        {!value.sent && !value.delete && (
                          <span className="bullet"></span>
                        )}
                        <span>{value.name}</span>
                        <span
                          className={isStarred ? "starred" : "star"}
                          title="Mark as starred"
                          onClick={toggleStar}
                        ></span>
                        <span className="title-mail-list">{value.subject}</span>
                        <span className="description-mail-list">
                          {value.mail}
                        </span>
                        <span className="mail-time">
                          <span>{value.time}</span>
                          {/* <span>{formattedDate}</span> */}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {/* Mail Lists end */}
            </section>
          )}
          {readmoode && (
            <section className="bg-light list col-lg-10 col-md-12">
              <div className="mail-list-header d-flex align-items-center justify-content-between p-2 border-bottom">
                {/* icons start here */}
                <div className="mail-readmode-header">
                  <span onClick={readmodeHandler}>
                    <FcUpLeft />
                  </span>
                  <span>
                    <BiArchiveIn />
                  </span>
                  <span>
                    <RiSpam2Line />
                  </span>
                  <span
                    onClick={() => {
                      deleteHandler(readModeValue);
                    }}
                  >
                    <AiFillDelete />
                  </span>
                  <span>
                    <RiMessage2Fill />
                  </span>
                  <span>
                    <AiOutlineClockCircle />
                  </span>
                  <span>
                    <MdOutlineAddTask />
                  </span>
                  <span>
                    <GoMoveToEnd />
                  </span>
                  <span>
                    <FiMoreVertical />
                  </span>
                </div>
                {/* icons end here */}
                <div className="mail-readmode-header">
                  <span title="Backward">&#60;</span>
                  <span title="Forward">&#62;</span>
                  <span title="Mail Count"> 1 0f {temp.length}</span>
                </div>
              </div>
              {/* Mail lists start here */}
              <div className="mail-readMod-container">
                <div className="mail-list-header d-flex align-items-center justify-content-between p-2 border-bottom">
                  <div className="mail-readmode-header">
                    <span title="Subject of mail">{readModeValue.subject}</span>
                    <span className="important-mail">important</span>
                    <span>inbox</span>
                  </div>
                  <div className="mail-readmode-header">
                    <span title="Print">Print</span>
                    <span title="open in new window">
                      <FaOpencart />
                    </span>
                  </div>
                </div>

                <div className="mail-list-header p-3 font-weight d-flex flex-row justify-content-start">
                  <img src={user} alt="user image" className="user-img" />
                  <span className="w-100">
                    <div className="d-flex align-items-center justify-content-between">
                      <span>Google Accounts Team </span>
                      <span> {readModeValue.time} </span>
                    </div>
                    <span>to me</span>
                  </span>
                </div>

                <div className="message-container">{readModeValue.mail}</div>
              </div>
              <div className="reply-btn p-3">
                <button className="btn btn-primary ms-3">Reply</button>
                <button className="btn btn-primary ms-3">Forward</button>
              </div>
              {/* Mail lists end here */}
            </section>
          )}
        </div>
      </div>
      {iscompose && (
        <ComposeMail
          onClick={composehandle}
          time={formattedDate + " " + formattedTime}
        />
      )}
    </div>
  );
};

export default Home;
