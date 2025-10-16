import Wrapper from "../assets/wrappers/Toolbar";
import { useLoaderData, useRevalidator, useSubmit } from "react-router-dom";
import { useState, useEffect } from "react";

import { customFetch } from "../utils";
import FormSearch from "./FormSearch";

const Toolbar = () => {
  const { token, projects, params } = useLoaderData();
  const revalidator = useRevalidator();
  const submit = useSubmit();
  const user = token?.user_id || null;

  const [open, setOpen] = useState(false);
  const [inputState, setInputState] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const handleProjectChange = (e) => {
    const project_id = e.target.value;
    setSelectedProject(project_id);
    const form_data = new FormData();
    form_data.append("project_id", project_id);
    submit(form_data, { method: "get" });
  };
  const handleAddClick = async (e) => {
    e.preventDefault();
    if (inputState) {
      const data = {
        name: inputState,
        user,
      };
      try {
        await addProject(data);
        setInputState("");
        setOpen(false);
        revalidator.revalidate();
      } catch (error) {
        console.error("Error adding project:", error);
      }
    }
  };
  // add project
  const addProject = async (data) => {
    try {
      const response = await customFetch("/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
        data: data,
      });
      return response;
    } catch (error) {
      console.error("Error in adding new project:", error);
    }
  };

  const handleCloseClick = () => {
    setOpen(false);
    setInputState("");
  };

  useEffect(() => {
    if (params?.project_id) {
      setSelectedProject(params.project_id);
    } else if (projects.length > 0) {
      setSelectedProject(projects[0].id);
    }
  }, [params?.project_id, projects]);

  return (
    <Wrapper>
      <div className="toolbar-center">
        <div className="toolbar">
          <form className="dropdown">
            <select
              name="project_id"
              value={selectedProject}
              onChange={handleProjectChange}
            >
              {projects.map((proj) => {
                return (
                  <option key={proj.id} value={proj.id}>
                    {proj.name}
                  </option>
                );
              })}
            </select>
          </form>
          <div className="add-form">
            {!open ? (
              <button onClick={() => setOpen(true)}>Add Project</button>
            ) : (
              <div className="form-card">
                <FormSearch
                  type="search"
                  name="input"
                  value={inputState}
                  onChange={(e) => setInputState(e.target.value)}
                  required={true}
                ></FormSearch>
                <div className="button-group">
                  <button
                    className="form-btn"
                    onClick={(e) => handleAddClick(e)}
                  >
                    Add
                  </button>
                  <button
                    className="form-btn"
                    onClick={() => handleCloseClick()}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Toolbar;
