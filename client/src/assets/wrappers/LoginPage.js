import styled from "styled-components";

const Wrapper = styled.section`
  .form-center {
    height: 75vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .logo {
    color: black;
    font-size: 40px;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }
  .form-card {
    width: 24rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    border-radius: 0.5rem;
    margin-top: 0.5rem;
  }
  button {
    align-self: center;
    color: black;
    font-size: 16px;
    font-weight: bold;
    border: solid white;
    border-radius: 0.5rem;
    background: var(--grey-200);
    padding: 0.6rem 1rem;
    cursor: pointer;
    width: 50%;
  }
`;

export default Wrapper;
