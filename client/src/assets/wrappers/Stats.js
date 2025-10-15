import styled from "styled-components";

const Wrapper = styled.section`
  .stats-center {
    width: var(--view-width);
    max-width: var(--max-width);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem 2rem;
    border-radius: 1rem;
  }

  .stat-card {
    border-radius: 0.75rem;
    padding: 1.25rem;
    text-align: center;
  }

  .stat-label {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 0.25rem;
    text-transform: uppercase;
  }

  .stat-value {
    font-size: 30px;
  }

  .stat-subcards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 1rem;
    margin-top: 0.5rem;
  }

  .stat-subcard {
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
    text-align: center;
    background: var(--grey-100);
    border: solid white;
  }
`;

export default Wrapper;
