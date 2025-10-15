import styled from "styled-components";

const Wrapper = styled.section`
  .toolbar-center {
    width: var(--view-width);
    max-width: var(--max-width);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    border-radius: 1rem;
  }
  .toolbar {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem;
    text-align: center;
  }
  .dropdown {
    position: relative;
    width: 220px;
    height: 2.5rem;
  }
  select {
    width: 220px;
    padding: 0.6rem 1rem;
    font-size: 16px;
    font-weight: bold;
    color: black;
    background: var(--grey-200);
    border-radius: 0.5rem;
    border: solid white;
  }
  .button-group {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    width: 50%;
  }
  button {
    width: 100%;
    padding: 0.6rem 1.25rem;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    color: black;
    background: var(--grey-200);
    border-radius: 0.5rem;
    border: solid white;
  }
  .add-form {
    position: relative;
    width: 220px;
    height: 2.5rem;
  }
  .add-form > button,
  .add-form > .form-card {
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  .form-card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  @media (min-width: 500px) {
    .toolbar {
      flex-direction: row;
    }
  }
`;

export default Wrapper;
