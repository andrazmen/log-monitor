import { Outlet, redirect } from "react-router-dom";

import { customFetch } from "../utils";
import { Header, Toolbar, StatsContainer, LogsContainer } from "../components";

export const loader = async ({ request }) => {
  const user_token = JSON.parse(localStorage.getItem("token")) || null;
  const token = user_token?.token || null;
  if (!token) {
    return redirect("/login");
  }
  try {
    // fetch projects
    const projects = await customFetch("/projects", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (projects.data.data.length === 0) {
      return {
        token: user_token,
        params,
        projects: [],
        logs: [],
        pagination: [],
        stats: [],
      };
    }
    // fetch logs
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const project_id = params.project_id || projects.data.data[0].id;
    const logs = await customFetch(`projects/${project_id}/logs`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // fetch stats
    const stats = await customFetch(`projects/${project_id}/logs/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      token: user_token,
      params,
      projects: projects.data.data || [],
      logs: logs?.data?.data || [],
      pagination: logs?.data?.pagination || [],
      stats: stats?.data?.data || [],
    };
  } catch (error) {
    console.error("Error in home loader:", error);
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
      return redirect("/login");
    }
  }
};

const Home = () => {
  return (
    <>
      <Header />
      <section className="page">
        <Toolbar />
        <StatsContainer />
        <LogsContainer />
        <Outlet />
      </section>
    </>
  );
};
export default Home;
