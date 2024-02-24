import React from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import "../../component/component.css";
import { RiEditLine } from "react-icons/ri";
import TitalBar from "../../component/TitalBar";
function LeaveApplication({ leavedata, fetchdata }) {
  const casual = leavedata.casual;
  const sick = leavedata.sick;
  const columns = [
    { name: "ID", width: "5%", selector: (row) => row.app_id },
    {
      name: "App Date",
      width: "10%",
      selector: (row) => row.app_date,
      sortable: true,
    },
    {
      name: "Leave type",
      width: "7%",
      selector: (row) => row.lvs_type,
      sortable: true,
    },
    {
      name: "Start From",
      width: "10%",
      selector: (row) => row.from_date,
      sortable: true,
    },
    {
      name: "Days",
      width: "10%",
      sortable: true,
      selector: (row) => row.nosDays,
    },
    { name: "Reason", width: "25%", selector: (row) => row.reason },
    { name: "Contact", width: "10%", selector: (row) => row.contact },

    {
      name: "Action",
      width: "20%",
      selector: (row) => [
        <button
          title='un-approve'
          className="mbtn mbtn-delete "
          key={`edit-${row.app_id}`}
          id={row.app_id}
          onClick={() => Edit(row.app_id)}
        >
          {" "}
          <RiEditLine size={18} />
        </button>,
      ],
    },
  ];

  const customStyles = {
    header: {
      style: {
        minHeight: "56px",
        
      },
    },
    headRow: {
      style: {
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderTopColor: defaultThemes.default.divider.default,
      },
    },
    headCells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: defaultThemes.default.divider.default,
        },
      },
    },
    cells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: defaultThemes.default.divider.default,
        },
      },
    },
  };

  const conditionalRowStyles = [
    {
      when: (row) => row.lvs_type === "casual", // Condition for the first row
      style: {
        backgroundColor: "#c8e4d4",
        color: "#333",
        fontWeight: "bold", // Change to your desired background color
      },
    },
    {
      when: (row) => row.lvs_type === "sick", // Condition for the first row
      style: {
        backgroundColor: "#ffe7c2",
        color: "#333",
        fontWeight: "bold", // Change to your desired background color
      },
    },
  ];

  return (
    <div>
      <TitalBar
            onAdd={() => isModalShow("add")}
            onRefresh={() => fetchdata(leavedata.supid)}
            title={'Leave Applications'}
          />
      <DataTable
        title={<h2 className="custom-title">{leavedata.supname}</h2>}
        columns={columns}
        data={casual}
        pagination
        responsive
        striped
        dense
        paginationPerPage={30}
        customStyles={customStyles}
        conditionalRowStyles={conditionalRowStyles}
      />


    </div>
  );
}

export default LeaveApplication;