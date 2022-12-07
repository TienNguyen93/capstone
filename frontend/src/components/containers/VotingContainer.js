import { VotingView } from "../views";
import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

const VotingContainer = (props) => {
    const navigate = useNavigate();
    // Get candidates from database
    const [candidates, setCandidates] = useState([]);
    const [voterId, setVoterId] = useState("");
    // const port = window.location.port;

    useEffect(() => {
        const logged = JSON.parse(localStorage.getItem("item"));
        setVoterId(logged._id);
    }, []);

    let votedCandidate = "";

    useEffect(() => {
        fetch("http://localhost:5000/candidates").then((response) =>
            response.json().then((data) => {
                setCandidates(data);
            })
        );
    }, []);

    const handleSignOut = () => {
        localStorage.clear();
        window.location.reload();
    };

    const handleChange = (e) => {
        votedCandidate = e.target.value;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestInit = {
            method: "POST",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify({}),
        };
        fetch(`http://localhost:5000/init`, requestInit)
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "You are now in network") {
                    const requestVote = {
                        method: "POST",
                        headers: { "content-Type": "application/json" },
                        body: JSON.stringify({
                            candidate: votedCandidate,
                            voter: voterId,
                        }),
                    };

                    fetch(`http://localhost:5000/vote`, requestVote)
                        .then((response) => response.json())
                        .then((data) => console.log("post method vote", data));

                    const requestDatabase = {
                        method: "PUT",
                        headers: { "content-Type": "application/json" },
                        body: JSON.stringify({
                            voted: true,
                        }),
                    };
                    fetch(
                        `http://localhost:5000/voters/${voterId}`,
                        requestDatabase
                    )
                        .then((response) => response.json())
                        .then((data) => console.log("put method", data))
                        .catch((error) => console.log(error));
                }
            })
            .catch((error) => console.log("error at /init", error));

        navigate("/vote-success");
    };

    return (
        <VotingView
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleSignOut={handleSignOut}
            candidates={candidates}
        />
    );
};

export default VotingContainer;
