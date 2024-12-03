import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";

type XorO = "X" | "O";
type CellStates = XorO | "";
type Board = CellStates[];

const getInitialBoard = (): Board => new Array(9).fill("");

interface CellProps {
  value: CellStates;
  handleClick: () => void;
}
const Cell = ({ value, handleClick }: CellProps) => {
  return (
    <Col>
      <div
        onClick={handleClick}
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "lightblue",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          border: "2px solid black",
        }}
      >
        {value}
      </div>
    </Col>
  );
};

function App() {
  const [board, setBoard] = useState(getInitialBoard());
  const makeMove = (position: number, symbol: XorO) => {
    const newBoard = [...board];
    newBoard[position] = symbol;
    setBoard(newBoard);
  };

  return (
    <>
      <h1 className="text-center my-4">Tic Tac Toe</h1>
      <Container>
        {[0, 3, 6].map((rowOffset) => (
          <Row className="justify-content-center mb-3" key={rowOffset}>
            {[0, 1, 2].map((i) => (
              <Cell
                key={i + rowOffset}
                value={board[i + rowOffset]}
                handleClick={() => makeMove(i + rowOffset, "X")}
              />
            ))}
          </Row>
        ))}
      </Container>
    </>
  );
}

export default App;
