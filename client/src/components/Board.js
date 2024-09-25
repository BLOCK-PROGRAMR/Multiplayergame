import React from "react";

const Board = ({ board, handleMove }) => {
    return (
        <div className="grid grid-cols-3 gap-4 w-64 mx-auto mt-6">
            {board.map((cell, idx) => (
                <div
                    key={idx}
                    className="w-16 h-16 bg-gray-200 flex items-center justify-center text-4xl font-bold cursor-pointer"
                    onClick={() => handleMove(idx)}
                >
                    {cell}
                </div>
            ))}
        </div>
    );
};

export default Board;
