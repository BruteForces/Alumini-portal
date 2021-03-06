import React, { useEffect, useRef, useState } from "react";
import AdminTableHeader from "./AdminTableHeader";
import AdminTablePagination from "./AdminTablePagination";
import Styles from "./AdminTable.module.css";
import AdminTableRow from "./AdminTableRow";
import { a, useSpring } from "react-spring";
import useGetNewApplications from "hooks/useGetNewAlumniApplications";
import useAxiosWithCallback from "hooks/useAxiosWithCallback";
import { useAuthContext } from "context/auth/authContext";
import Loader from "components/UI/Loader";

const RequestTable = () => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [tableHeadOnTop] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const tableHeadRef = useRef(null);

  const props = useSpring({
    from: {
      backgroundColor: "#e2e2e2",
    },
    to: {
      backgroundColor: tableHeadOnTop ? "#bddcf3" : "#e2e2e2",
    },
  });

  const { user } = useAuthContext();
  const { applications, isLoading, error } = useGetNewApplications();

  const { fetchData: approveAlumni } = useAxiosWithCallback();
  const { fetchData: rejectAlumni } = useAxiosWithCallback();

  const totalPages = Math.ceil(applications?.length / entriesPerPage);

  useEffect(() => {
    if (error) alert(error.response.data.message);
  }, [error]);

  const OnIncreaseHandler = () => {
    if (currentPage > totalPages - 1) return null;
    setCurrentPage(currentPage + 1);
  };

  const onDecreaseHandler = () => {
    if (currentPage < 2) return null;
    setCurrentPage(currentPage - 1);
  };

  const onEntriesPerPageSelectHandler = (value) => {
    setEntriesPerPage(value);
  };

  const adminConfig = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };

  const onApproveAlumni = async (alumni) => {
    await approveAlumni({
      ...adminConfig,
      method: "patch",
      url: `/api/v1/alumni/approve/${alumni}`,
    });
  };

  const onRejectAlumni = async (alumni) => {
    await rejectAlumni({
      ...adminConfig,
      method: "patch",
      url: `/api/v1/alumni/reject/${alumni}`,
    });
  };

  return (
    <div>
      <AdminTableHeader
        onSelect={onEntriesPerPageSelectHandler}
        type="New Applications"
      />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <table className={Styles.table}>
            <a.thead style={props} ref={tableHeadRef}>
              <tr className={Styles.table_row}>
                <th>Regno</th>
                <th>Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Organization</th>
                <th>Contact</th>
                <th>Email</th>
                <div className={Styles.fixed_col}>
                  <th>Actions</th>
                </div>
              </tr>
            </a.thead>

            <tbody>
              {applications
                ?.slice(
                  currentPage * entriesPerPage - entriesPerPage,
                  currentPage * entriesPerPage
                )
                .filter((application) => !application.rejected)
                .map((alumni) => (
                  <AdminTableRow
                    alumni={alumni}
                    type="request-details"
                    approveAlumniHandler={onApproveAlumni}
                    rejectAlumni={onRejectAlumni}
                  />
                ))}
            </tbody>
          </table>

          <AdminTablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onIncrease={OnIncreaseHandler}
            onDecrease={onDecreaseHandler}
          />
        </>
      )}
    </div>
  );
};

export default RequestTable;
