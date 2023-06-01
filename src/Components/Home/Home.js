import React, { useEffect, useState } from "react";
import "./Home.css";
import { AiFillDelete, AiOutlineStar, AiOutlineEdit } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";

const userhand = () => {
  const userha = JSON.parse(localStorage.getItem("u"));
  if (userha) {
    return userha;
  } else {
    return [];
  }
};

const starUser = ()=>{
    const s = JSON.parse(localStorage.getItem("a"));
    if (s){
        return s
    } else {
        return []
    }
}
const Home = () => {
    const [detail,setDeatil] = useState({})
  const [title, setTitle] = useState();
  const [note, setNote] = useState("Add");
  const [description, setDescription] = useState();
  const [data, setData] = useState(userhand());
  const [showAdd, setShowadd] = useState(true);
  const [userData, setUserdata] = useState([]);
  const [activeTab, setActivetab] = useState(0);
  const [show, setShow] = useState(true);
  const [edit, setEdit] = useState();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [starData, setstarData] = useState(starUser());
  const [deleteData, setDeletedata] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [starupdate, setStarupdate] = useState();

  useEffect(() => {
    localStorage.setItem("u", JSON.stringify(data));
  },[data]); //store the data localStorage

  
  useEffect(() => {
      localStorage.setItem("a", JSON.stringify(starData));
    },[starData]);
   

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update every second

    return () => {
      clearInterval(interval);
    };
  }, []);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const formattedDate = currentDate.toLocaleString("en-US", options); //setDate

  const titleHandler = (event) => {
    setTitle(event.target.value);
  }; //Enter the title
  const discriptionHandler = (event) => {
    setDescription(event.target.value);
  }; //Enter the Description
  const addHandler = () => {
    const userData = { date: formattedDate, title, description, stared: false };
    setData([...data, userData]);
    setTitle("");
    setDescription("");
    setShowadd(true);
  }; //Input Data Stored(title,description)
  const LengthofData = data.length; //length of the All data
   const lengthOfStarData = starData.length; //length of the star data
  const lengthOfDeleteData = deleteData.length; //length of the delete data

  const deletedHander = (i, each) => {
    data.splice(i, 1);
    setData([...data]);
    setDeletedata([...deleteData, each]);
  }; //Deleted Data

  const deletedHander2 = (i) => {
    // starData.splice(i,1)
    // setstarData([...starData])
  };
  const add = () => {
    setShowadd(false);
  }; //Add button clicking Show the Home page
  const editHandler = (e) => {
    setTitle(e.title);
    setDescription(e.description);
    setShowadd(false);
    setShow(false);
    setEdit(e);
    setNote("Edit");
  }; //Edit the Data
  const updateHandler = () => {
    const user = data.map((each) => {
      if (each === edit) {
        return { date: formattedDate, title, description };
      } else {
        return each;
      }
    });
    setData(user);
    setShow(true);
    setShowadd(true);
    setTitle("");
    setDescription("");
  };
  const dataHandler = (input) => {
    setUserdata([input]);
    setDeatil(input)

  };
  localStorage.setItem("paradata", JSON.stringify(userData));
  const handleTabClick = (index) => {
    setActivetab(index);
  };
  const starHandler = (index) => {
    // setstarData([...starData,index])
    const updatedata = data.map((e) =>
      e.date == index.date ? { ...e, stared: true } : e
    );
    setstarData([...starData,index]);
    setData(updatedata);
  };
 const cancelHandler = () => {
    setShowadd(true);
  };
  const searchHandler = (event) => {
    setSearchItem(event.target.value);
  };
  const searchData = data.filter((each) => {
    return each.title.toLowerCase().includes(searchItem.toLocaleLowerCase());
  });
  const finaldata = data > 1 ? data : searchData;
  return (
    <div>
      {showAdd ? (
        <div>
          <div className="home">
            <h4 className="mt-3">Notes</h4>
            <input
              type="search"
              className="form-control serach"
              placeholder="Search by title"
              onChange={searchHandler}
              value={searchItem}
            />
            <button onClick={add} className="addbutton">
              Add
            </button>
            <h6 className="welcome">
              WelCome <span className="name">Bharath</span>{" "}
            </h6>
          </div>
          <h4 className="head">All Notes</h4>
          <div className="container-2">
            <div className="vertical-tabs">
              <div className="tab-nav mt4 ml-0">
                <ul>
                  <li
                    className={`tab-item ${
                      activeTab === 0 ? "active" : "inactive"
                    }`}
                    onClick={() => handleTabClick(0)}
                  >
                    All ({LengthofData})
                  </li>
                  <li
                    className={`tab-item ${
                      activeTab === 1 ? "active" : "inactive"
                    }`}
                    onClick={() => handleTabClick(1)}
                  >
                    Stared ({lengthOfStarData})
                  </li>
                  <li
                    className={`tab-item ${
                      activeTab === 2 ? "active" : "inactive"
                    }`}
                    onClick={() => handleTabClick(2)}
                  >
                    Deleted ({lengthOfDeleteData})
                  </li>
                </ul>
              </div>
            </div>

            {activeTab === 0 && (
              <div>
                {finaldata.map((each, index) => {
                  return (
                    <div>
                      <div
                        className="data"
                        onClick={() => {
                          dataHandler({
                            data: each.title,
                            des: each.description,
                            date: each.date,
                          }
                          );
                        }}
                      >
                        <div className="data-container">
                          <h6>{each.title}</h6>
                          <div>
                          <button
                              onClick={() => starHandler(each)}
                              className="star-button"
                              disabled={each.stared}
                            >
                              <AiOutlineStar />
                            </button>
                            <button onClick={() => deletedHander(index, each)}>
                              <AiFillDelete />
                            </button> 
                          </div>
                        </div>
                        <p>{each.description}</p>
                      </div>
                    </div>
                  );
                })}
                <div>
                  {deleteData.map((each, index) => {
                    return (
                      <div className="data-delete">
                        <div className="data-container">
                          <h6>{each.title}</h6>
                          <button className="detele-button">Deleted</button>
                          <div>
                            <button
                              onClick={() => starHandler(each)}
                              className="star-button"
                            >
                              <AiOutlineStar />
                            </button>
                            <button>
                              <AiFillDelete />
                            </button>
                          </div>
                        </div>
                        <p>{each.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {activeTab === 1 && (
              <div>
                {starData.map((each, index) => {
                  return (
                    <div className="data-star">
                      <div className="data-container">
                        <h6>{each.title}</h6>
                        <div>
                          <button
                            className="star-button"
                          >
                            <AiFillStar />
                          </button>
                          <button onClick={() => deletedHander2(index)}>
                            <AiFillDelete />
                          </button>
                        </div>
                      </div>
                      <p>{each.description}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === 2 && (
              <div>
                {deleteData.map((each, index) => {
                  return (
                    <div className="data-delete">
                      <div className="data-container">
                        <h6>{each.title}</h6>
                        <button className="detele-button">Deleted</button>
                        <div>
                          <button
                            onClick={() => starHandler(each)}
                            className="star-button"
                          >
                            <AiOutlineStar />
                          </button>
                          <button>
                            <AiFillDelete />
                          </button>
                        </div>
                      </div>
                      <p>{each.description}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {userData.map((e) => {
              return (
                <div className="details">
                  <div className="title-date">
                    <p className="data-head">{e.data}</p>
                    <p className="data-para">{e.date}</p>
                    <p className="data-des">{e.des}</p>
                  </div>

                  <div>
                    {data.map((each) => {
                      return (
                        <div className="edit-delete-btn">
                          <button
                            className="stars-button"
                            onClick={() => {
                              editHandler(each);
                            }}
                          >
                            <AiOutlineEdit />
                          </button>
                          <button className="stars-button">
                            <AiOutlineStar />
                          </button>
                          <button className="stars-button">
                            <AiFillDelete />
                          </button>
                        </div>
                       );
                    })} 
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <div className="input">
            <h3>{note} Notes</h3>
            <label className="label">
              Title <span className="start">*</span>
            </label>
            <input
              onChange={titleHandler}
              value={title}
              type="text"
              className="form-control inpu"
              placeholder="Enter Title"
            />
            <label className="label">
              Decsptions <span className="start">*</span>
            </label>
            <input
              onChange={discriptionHandler}
              value={description}
              type="text"
              className="form-control input2"
              placeholder="Enter Your Desprctions"
            />
            <button onClick={cancelHandler} className="cancel-button">
              Cancel
            </button>
            {show ? (
              <button className="button" onClick={addHandler}>
                Add
              </button>
            ) : (
              <button className="button" onClick={updateHandler}>
                Save
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Home;
