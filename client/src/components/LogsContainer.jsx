import Wrapper from "../assets/wrappers/Logs";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import * as XLSX from "xlsx";
import { useState } from "react";

import { customFetch } from "../utils";
import LogsList from "./LogsList";
import LogsFilter from "./LogsFilter";

const LogsContainer = () => {
  const { token, logs, pagination, params } = useLoaderData();
  const navigate = useNavigate();
  const { page = 1, total = 0 } = pagination;
  const limit = 10;
  const total_pages = Math.ceil(total / limit);

  const [loadingState, setLoadingState] = useState(false);
  const [active_params] = useSearchParams();

  const handlePageChange = (new_page) => {
    const new_params = new URLSearchParams({
      ...params,
      page: new_page,
    });
    navigate(`?${new_params.toString()}`);
  };

  const exportData = async () => {
    try {
      setLoadingState(true);
      const project_id = params.project_id || logs[0].project_id;
      const query = Object.fromEntries(active_params.entries());
      const response = await customFetch(`projects/${project_id}/logs/export`, {
        params: query,
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
      const fetched = response.data.data || [];
      if (!fetched.length) {
        console.log("No data to export");
        setLoadingState(false);
        return;
      }
      const worksheet = XLSX.utils.json_to_sheet(fetched);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "logs");
      XLSX.writeFile(workbook, "logs.xlsx");
      setLoadingState(false);
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  return (
    <Wrapper>
      <div className="logs-container">
        <div className="logs-card">
          <LogsFilter />
        </div>
        <div className="logs-card">
          {logs.length === 0 ? (
            <p>No logs matched your search...</p>
          ) : (
            <>
              <LogsList />
              <div className="bottom-toolbar">
                <button onClick={exportData}>
                  {loadingState ? "Exporting logs ..." : "Export logs (.xlsx)"}
                </button>
                <div className="pagination">
                  <button
                    disabled={page <= 1}
                    onClick={() => handlePageChange(Number(page) - 1)}
                  >
                    Prev
                  </button>
                  <span>
                    Page {page} of {total_pages}
                  </span>
                  <button
                    disabled={page >= total_pages}
                    onClick={() => handlePageChange(Number(page) + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default LogsContainer;
