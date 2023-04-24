import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import items from "./agentData";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import styles from "./agentaccount.module.css";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";



function AgentAccount() {


    
   const [agentList, setAgentList] = useState();
   const [search, setSearch] = useState('');
   const [recordViewLimit, setRecordViewList] = useState(10);
   const [itemOffset, setItemOffset] = useState(0);



 
    const endOffset = itemOffset + recordViewLimit;    
    const currentItems = agentList?.filter(agent=> agent?.username?.toLowerCase().includes(search?.toLowerCase()))?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(agentList?.length / recordViewLimit);
    console.log(itemOffset, endOffset, 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');




  const handlePageClick = (event) => {
    const newOffset = (event.selected * recordViewLimit) % items.length;
    setItemOffset(newOffset);
  };

  


//   my code

useEffect(()=>{
    setAgentList(items);
  
 }, []);


const searchByName = (e)=> {
  setSearch(e.target.value);
}



// Record View
const recordView = (e) => {
  if (e.target.value === 'all') {
    setRecordViewList(agentList?.length)
  }else{
    setRecordViewList(parseInt(e.target.value))
  }
}


  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            {/* <h1 className={`${styles.dpage_location_heading}`}>
              Account Management {">"}{" "}
              <span className={`${styles.dpage_location_heading_small} mb-5`}>
                List of Agent Account
              </span>
            </h1> */}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col">
            <div className={`${styles.page_table_wrapper}`}>
              <h2 className="py-2">Results of Agent</h2>
              {/* list filter bar */}
              <div
                className={`${styles.table_results_filter} d-flex justify-content-between`}
              >
                <div className={`${styles.records_view} d-flex`}>
                  <h6 className="me-2">Display</h6>
                  <select name="" id="" onChange={recordView}>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="all">All</option>
                  </select>
                </div>
                <div className={`${styles.table_search_bar} d-flex`}>
                  <label className="me-2" htmlFor="search">
                    Search
                  </label>
                  <input type="search" value={search} onChange={searchByName} id="search" />
                </div>
              </div>
 {/* Agent List */}
 <div className={`${styles.table_container}`}>
        <table>
          <thead>
            <tr>
              <th>City</th>
              <th>Account Number</th>
              <th>Username</th>
              <th>Email</th>
              <th>Contact No.</th>
              <th>Create Date</th>
              <th>Account Detail</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
          {/* <Items currentItems={currentItems} /> */}
          {currentItems &&
        currentItems.map((agent, i) => (
          <tr key={i}>
            <td>{agent.city}</td>
            <td>{agent.account_number}</td>
            <td>{agent.username}</td>
            <td>{agent.email}</td>
            <td>{agent.contact_no}</td>
            <td>{agent.create_date}</td>
            <td>{agent.account_details}</td>
            <td>
              <BootstrapSwitchButton className={`${styles.status_btn}`} checked={false} size="xs" onstyle="light"  />
            </td>
            <td>
              <div className="d-flex justify-content-evenly">
                actions
                <FaPencilAlt className={styles.table_update_btn} />
                <FaRegTrashAlt className={styles.table_delete_btn} />
              </div>
            </td>
          </tr>
        ))}

          </tbody>
        </table>
      </div>

      {/* pagination container... */}
      <div
        className={`${styles.pagination_container} d-flex justify-content-between px-2 `}
      >
        <div className={`${styles.showing_numbers}`}>
          <span>Showing 1 to 10 of {items.length} entries</span>
        </div>
        <div className={`${styles.table_pagination} `}>
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            className={styles.pagination_component}
          />
        </div>
      </div>

            </div>
          </div>
        </div>
      </div>

     
    </>
  );
}

export default AgentAccount;
