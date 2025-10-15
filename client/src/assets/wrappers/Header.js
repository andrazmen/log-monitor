import styled from "styled-components";

const Wrapper = styled.nav`
  .header {
    width: var(--view-width);
    max-width: var(--max-width);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding: 1.5rem 2rem;
  }

  .logo {
    color: black;
    font-size: 40px;
    text-transform: uppercase;
    cursor: pointer;
  }
  .button {
    color: black;
    font-size: 16px;
    font-weight: bold;
    border: solid white;
    border-radius: 0.5rem;
    background: var(--grey-200);
    padding: 0.6rem 1rem;
    cursor: pointer;
  }
  @media (min-width: 500px) {
    .header {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
`;

export default Wrapper;
