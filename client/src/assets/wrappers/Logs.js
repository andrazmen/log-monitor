import styled from "styled-components";

const Wrapper = styled.section`
  .logs-container {
    width: var(--view-width);
    max-width: var(--max-width);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding: 1.5rem 2rem;
    border-radius: 1rem;
  }
  .logs-card {
    border-radius: 0.75rem;
    padding: 1.25rem;
    text-align: center;
  }
  .pagination {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 14px;
    border-radius: 0.5rem;
    border: solid white;
    background: var(--grey-200);
    font-weight: bold;
    cursor: pointer;
  }

  button:disabled {
    background: var(--grey-200);
    cursor: not-allowed;
  }
  .bottom-toolbar {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .filter-subcards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 1rem;
    margin-top: 0.5rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 0.75rem;
    overflow: hidden;
    font-size: 18px;
    background: var(--grey-100);
    border: solid white;
  }

  thead {
    text-transform: uppercase;
    font-size: 16px;
  }
  td {
    border-bottom: 1px solid var(--grey-200);
    padding: 0.75rem 1rem;
    text-align: left;
  }
  th {
    border-bottom: 1px solid var(--grey-200);
    padding: 0.75rem 1rem;
    text-align: left;
  }

  tr:last-child td {
    border-bottom: 1px solid var(--grey-200);
  }
`;

export default Wrapper;
