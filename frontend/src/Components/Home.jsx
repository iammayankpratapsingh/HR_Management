// Home.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetchAdminCount();
    fetchEmployeeCount();
    fetchSalaryCount();
    fetchAdminRecords();
  }, []);

  const fetchAdminRecords = () => {
    axios
      .get("http://localhost:3002/auth/admin_records")
      .then((result) => {
        if (result.data.Status) {
          setAdmins(result.data.Result);
        } else {
          console.error("Failed to fetch admin records:", result.data.Error);
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.error("Error fetching admin records:", err);
        alert("Error fetching admin records. Please check the console for details.");
      });
  };

  const fetchAdminCount = () => {
    axios
      .get("http://localhost:3002/auth/admin_count")
      .then((result) => {
        if (result.data.Status) {
          setAdminTotal(result.data.Result[0].admin);
        } else {
          console.error("Failed to fetch admin count:", result.data.Error);
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.error("Error fetching admin count:", err);
        alert("Error fetching admin count. Please check the console for details.");
      });
  };

  const fetchEmployeeCount = () => {
    axios
      .get("http://localhost:3002/auth/employee_count")
      .then((result) => {
        if (result.data.Status) {
          setEmployeeTotal(result.data.Result[0].employee);
        } else {
          console.error("Failed to fetch employee count:", result.data.Error);
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.error("Error fetching employee count:", err);
        alert("Error fetching employee count. Please check the console for details.");
      });
  };

  const fetchSalaryCount = () => {
    axios
      .get("http://localhost:3002/auth/salary_count")
      .then((result) => {
        if (result.data.Status) {
          setSalaryTotal(result.data.Result[0].salaryOFEmp);
        } else {
          console.error("Failed to fetch salary count:", result.data.Error);
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.error("Error fetching salary count:", err);
        alert("Error fetching salary count. Please check the console for details.");
      });
  };

  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Admin</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Employee</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Salary</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>${salaryTotal}</h5>
          </div>
        </div>
      </div>
      <div className='mt-4 px-5 pt-3'>
        <h3>List of Admins</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              admins.map((a, index) => (
                <tr key={index}>
                  <td>{a.email}</td>
                  <td>
                    <button className="btn btn-info btn-sm me-2">
                      Edit
                    </button>
                    <button className="btn btn-warning btn-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
