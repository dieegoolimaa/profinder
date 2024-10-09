import React from "react";
import SessionContextProvider from "../contexts/SessionContext";

const BoardPage = () => {
    return (
        <SessionContextProvider>
            <div>
                <h1>Board</h1>
                <h2>Here you will see all the information about your profile</h2>
            </div>
        </SessionContextProvider>
    );
};

export default BoardPage;