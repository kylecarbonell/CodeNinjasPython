import { Link, useLocation } from "react-router-dom";
import "./Activity.css";
import { IoIosArrowBack } from "react-icons/io";
import { CodeBlock, nord } from "react-code-blocks";
import { useState } from "react";

function Activity() {
  var { state } = useLocation();
  var [instructOpen, setInstructOpen] = useState(false);
  var temp = `board = [' ' for _ in range(9)]

    def print_board():
        for i in range(0, 9, 3):
            print(f"{board[i]} | {board[i+1]} | {board[i+2]}")
            if i < 6:
                print("-" * 5)
    
    def check_winner():
        for i in range(0, 9, 3):
            if board[i] == board[i+1] == board[i+2] != ' ':
                return True
        for i in range(3):
            if board[i] == board[i+3] == board[i+6] != ' ':
                return True
        if board[0] == board[4] == board[8] != ' ':
            return True
        if board[2] == board[4] == board[6] != ' ':
            return True
        return False
    
    def check_tie():
        return ' ' not in board
    
    def make_move(player, position):
        if board[position] == ' ':
            board[position] = player
    
    def tic_tac_toe_game():
        player = 'X'
        while True:
            print_board()
            position = int(input(f"Player {player}, enter position to place your mark (0-8): "))
            make_move(player, position)
            if check_winner():
                print_board()
                print(f"Player {player} wins!")
                break
            if check_tie():
                print_board()
                print("It's a tie!")
                break
            player = 'O' if player == 'X' else 'X'
    
    tic_tac_toe_game()`;

  async function submit() {
    const data = await fetch("https://codeninjaspython.onrender.com/submit");
    const json = await data.json();
    console.log(json);
    console.log("Inside submit");
  }
  // async function instructions() {
  //     await fetch("https://codeninjaspython.onrender.com/submit");
  // }

  // async function create() {
  //     await fetch("https://codeninjaspython.onrender.com/instructions");
  // }

  return (
    <>
      {instructOpen ? (
        <div
          className="Instructions-Wrapper"
          onClick={() => {
            setInstructOpen(false);
          }}
        >
          <div className="Instructions">
            <iframe
              className="Instruction-Pdf"
              src="../../public/Resume2024.pdf#toolbar=0&navpanes=0"
            />
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="Activity">
        <div className="Activity-Title">
          <Link className="BackButton" to={"/home"}>
            <IoIosArrowBack />
          </Link>
          <div className="Activity-Title-Wrapper">
            <h1>{state.name}</h1>
          </div>
        </div>
        <div className="Activity-Content">
          <div className="Activity-Code">
            <CodeBlock
              text={temp}
              language="python"
              showLineNumbers={true}
              theme={nord}
            />
          </div>
          <div className="Activity-Grading">
            <h1>Graded by Sensei Kyle</h1>
          </div>
        </div>
        <div className="Activity-Buttons">
          <button
            className="Activity-Button-Container"
            onClick={() => {
              window.open(`https://replit.com/@razorpooandpee/${state.link}`);
            }}
          >
            Open Replit
          </button>
          <button
            className="Activity-Button-Container"
            onClick={() => {
              console.log("Outside submit");
              submit();
            }}
          >
            Submit
          </button>
          <button
            className="Activity-Button-Container"
            onClick={() => {
              setInstructOpen(true);
            }}
          >
            Open Instructions
          </button>
        </div>
      </div>
    </>
  );
}

export default Activity;
