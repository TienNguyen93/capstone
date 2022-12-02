import { VoterView } from "../views";
import React, { useEffect, useState } from "react";

const VoterContainer = () => {
    const [voters, setVoters] = useState([]);
    const [newVoter, setNewVoter] = useState([]);
    const [selectedVoter, setSelectedVoter] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/voters")
            .then((response) => response.json()
            .then((data) => {
            setVoters(data);
            })
        );
    }, [voters]);

    const handleSelect = (e) => {
        setSelectedVoter(e.target.value);
    };

    const handleChange = (e) => {
        let new_voter = {};
        new_voter = { [e.target.name]: e.target.value };
        setNewVoter((newVoter) => ({
            ...newVoter,
            ...new_voter,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        newVoter.dob = newVoter.dob.substring(5, 7) + "/" + newVoter.dob.substring(8) + "/" + newVoter.dob.substring(0, 4);

        const request = {
            method: "POST",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify({
                firstname: newVoter.firstname,
                lastname: newVoter.lastname,
                email: newVoter.email,
                dob: newVoter.dob,
                ssn: parseInt(newVoter.ssn),
                password: "",
            }),
        }
        fetch(`http://localhost:5000/voters`, request)
            .then((response) => response.json())
            .then((data) => console.log("post method", data))
            .catch((error) => console.log(error))
    };

    return (
        <VoterView
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleSelect={handleSelect}
            voters={voters}/>
    );
};

export default VoterContainer;