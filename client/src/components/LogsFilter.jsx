import Wrapper from "../assets/wrappers/Logs";
import { useLoaderData, Form, useSubmit } from "react-router-dom";
import { useState, useEffect } from "react";

import FormDateRange from "./FormDateRange";
import FormSelect from "./FormSelect";
import FormSearch from "./FormSearch";

const LogsFilter = () => {
  const { params } = useLoaderData();
  const submit = useSubmit();
  const all_severities = [
    "all",
    "EMERG",
    "ALERT",
    "CRIT",
    "ERR",
    "WARNING",
    "NOTICE",
    "INFO",
    "DEBUG",
  ];
  const sorts = ["desc", "asc"];
  const [searchState, setSearchState] = useState(params?.search || "");
  const [severityState, setSeverityState] = useState(params?.severity) || "all";
  const [starttimeState, setStarttimeState] = useState(params?.start || "");
  const [endtimeState, setEndtimeState] = useState(params?.end || "");
  const [sortState, setSortState] = useState(params?.sort || "desc");

  useEffect(() => {
    const timeout = setTimeout(() => {
      submitForm();
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchState]);

  useEffect(() => {
    submitForm();
  }, [severityState, starttimeState, endtimeState, sortState]);

  useEffect(() => {
    setSearchState("");
    setSeverityState("all");
    setStarttimeState("");
    setEndtimeState("");
    setSortState("desc");
  }, [params?.project_id]);

  const submitForm = () => {
    const form_data = new FormData();
    if (searchState) form_data.append("search", searchState);
    if (severityState && severityState !== "all")
      form_data.append("severity", severityState);
    if (starttimeState) form_data.append("start", starttimeState);
    if (endtimeState) form_data.append("end", endtimeState);
    if (sortState) form_data.append("sort", sortState);
    if (params?.project_id) form_data.append("project_id", params?.project_id);
    submit(form_data, { method: "get" });
  };

  return (
    <Wrapper>
      <div>
        <Form className="filter-subcards" method="get">
          <FormDateRange
            label="Filter start datetime"
            name="starttime"
            value={starttimeState}
            onChange={(e) => setStarttimeState(e.target.value)}
            required={false}
          ></FormDateRange>
          <FormDateRange
            label="Filter end datetime"
            name="endtime"
            value={endtimeState}
            onChange={(e) => setEndtimeState(e.target.value)}
            required={false}
          ></FormDateRange>
          <FormSelect
            label="Filter severity"
            name="severity"
            list={all_severities}
            value={severityState}
            onChange={(e) => setSeverityState(e.target.value)}
            required={false}
          ></FormSelect>
          <FormSearch
            type="search"
            label="Search logs"
            name="search"
            value={searchState}
            onChange={(e) => setSearchState(e.target.value)}
            required={false}
          ></FormSearch>
          <FormSelect
            type="search"
            label="Sort"
            name="sort"
            list={sorts}
            value={sortState}
            onChange={(e) => setSortState(e.target.value)}
            required={false}
          ></FormSelect>
        </Form>
      </div>
    </Wrapper>
  );
};

export default LogsFilter;
