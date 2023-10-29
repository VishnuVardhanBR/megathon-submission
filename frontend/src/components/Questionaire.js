import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export function Questions() {
	const navigate = useNavigate();
	const [traits, setTraits] = useState({
		extraversion: 0,
		agreeableness: 0,
		conscientiousness: 0,
		neuroticism: 0,
		openness: 0,
	});
	const handleSubmit = () => {
		// console.log(traits);
		// const jsonData = JSON.stringify(traits);
		const jsonData = {one: {
				gender: "Female",
				age: 30,
				'openness': 5,
				'neuroticism': 3,
				'conscientiousness': 7,
				'agreeableness': 6,
				'extroversion': 4,

		}};
		axios
			.post("http://127.0.0.1:5001/predict_personality", jsonData, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				axios
					.post("http://127.0.0.1:5001/store", jsonData, {
						headers: {
							"Content-Type": "application/json",
						},
					})
					.then((storeResponse) => {
						// console.log("Data stored:", storeResponse.data);
					})
					.catch((storeError) => {
						console.error("Store Error:", storeError);
					});
			})
			.catch((error) => {
				console.error("Error:", error);
			});
			navigate("/landing");
	};

	const questions = [
		"I am outgoing",
		"I am kind",
		"I am organized",
		"I get stressed easily",
		"I have a vivid imagination",
		"I prefer staying at home",
		"I criticize others",
		"I lack focus",
		"I rarely worry",
		"I am not interested in abstract ideas",
	];

	const handleRadioChange = (index, value) => {
		let newTraits = { ...traits };

		const ops = [
			(v) => (newTraits["extraversion"] += v),
			(v) => (newTraits["agreeableness"] += v),
			(v) => (newTraits["conscientiousness"] += v),
			(v) => (newTraits["veuroticism"] += v),
			(v) => (newTraits["openness"] += v),
			(v) => (newTraits["extraversion"] -= v),
			(v) => (newTraits["agreeableness"] -= v),
			(v) => (newTraits["conscientiousness"] -= v),
			(v) => (newTraits["neuroticism"] -= v),
			(v) => (newTraits["openness"] -= v),
		];

		ops[index](value);
		setTraits(newTraits);
	};
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
		  <h1 className="text-4xl font-extrabold mb-8">
			I See Myself as Someone Who...
		  </h1>
		  <div className="space-y-4">
			{questions.map((question, i) => (
			  <div key={i}>
				<h2 className="p-12 pl-0 text-xl font-semibold mb-2">{question}</h2>
				<div className="bg-gray-800 rounded-lg p-4">
				  <Radios index={i} onChange={handleRadioChange} />
				</div>
			  </div>
			))}
		  </div>
		  <button
			type="button"
			className="mt-8 px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
			onClick={handleSubmit}
		  >
			Submit
		  </button>
		</div>
	  );


}

function Radios({ index, onChange }) {
	const radioNames = [
		"Strongly Disagree",
		"Disagree",
		"Neither",
		"Agree",
		"Strongly Agree",
	];

	return (
		<div className="flex justify-center gap-x-6">
			{radioNames.map((name, i) => (
				<div key={i} className="flex">
					<input
						type="radio"
						name={`hs-radio-group-${index}`}
						onChange={() => onChange(index, i + 1)}
						className="text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
					/>
					<label className="text-white ml-2">{name}</label>
				</div>
			))}
		</div>
	);
}
