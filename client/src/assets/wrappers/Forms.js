import styled from "styled-components";

const Wrapper = styled.section`
  label {
    font-size: 14px;
    font-weight: bold;
    display: block;
    margin-bottom: 0.25rem;
  }

  input,
  select {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;
    border: 1px solid var(--grey-300);
    background-color: white;
    font-size: 14px;
  }
`;

export default Wrapper;
