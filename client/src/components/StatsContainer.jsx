import Wrapper from "../assets/wrappers/Stats";

import { useLoaderData } from "react-router-dom";

const StatsContainer = () => {
  const { stats } = useLoaderData();
  const all_severities = [
    "EMERG",
    "ALERT",
    "CRIT",
    "ERR",
    "WARNING",
    "NOTICE",
    "INFO",
    "DEBUG",
  ];
  const severity_stats = all_severities.map((level) => {
    if (stats.length === 0) {
      return {
        severity: level,
        count: 0,
      };
    }
    const found = stats.severity.find((item) => item.severity === level);
    return {
      severity: level,
      count: found ? found.count : 0,
    };
  });
  return (
    <Wrapper>
      <div className="stats-center">
        <div className="stat-card">
          <div className="stat-subcards">
            <div className="stat-subcard">
              <h4 className="stat-label">Last Hour</h4>
              <p className="stat-value">
                {stats?.time?.last_hour ? stats.time.last_hour : 0}
              </p>
            </div>
            <div className="stat-subcard">
              <h4 className="stat-label">Last 24 Hours</h4>
              <p className="stat-value">
                {stats?.time?.last_24_hours ? stats.time.last_24_hours : 0}
              </p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-subcards">
            {severity_stats.map((item) => (
              <div key={item.severity} className="stat-subcard">
                <h5 className="stat-label">{item.severity}</h5>
                <p className="stat-value">{item.count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default StatsContainer;
