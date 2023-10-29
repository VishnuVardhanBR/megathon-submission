import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const sample1 = {
	openness: 2,
	neuroticism: 3,
	conscientiousness: 7,
	agreeableness: 6,
	extroversion: 4,
};

const sample2 = {
	openness: 3,
	neuroticism: 5,
	conscientiousness: 3,
	agreeableness: 5,
	extroversion: 3,
};
const sample3 = {
	openness: 8,
	neuroticism: 3,
	conscientiousness: 5,
	agreeableness: 6,
	extroversion: 8,
};

function BarGraph({dataDict}) {
	const labels = Object.keys(dataDict);
	const data = Object.values(dataDict);

	const chartData = {
		labels: labels,
		datasets: [
			{
				label: "Big 5",
				backgroundColor: ["#3B82F6", "#3B82F6", "#3B82F6", "#3B82F6", "#3B82F6"],
				data: data,
			},
		],
	};
	return <Bar data={chartData} />;
}

export default function ShowDetails() {
	const [questionResults, setQuestionResults] = useState({});
	const [profileResults, setProfileResults] = useState({});
	const [speechResults, setSpeechResults] = useState({});
	const [personalityQuestion, setPersonalityFinal] = useState({});
	const [personalityProfile, setProfileFinal] = useState({});
	const [personalitySpeech, setSpeechFinal] = useState({});

	useEffect(() => {
        axios
        .get("http://localhost:5001/getone")
        .then((response) => {
            const { age, gender, ...newData } = response.data;

            setQuestionResults(newData);

            return axios.post(
                "http://localhost:5001/predict_personality",
                newData
            );
        })
        .then((response) => setPersonalityFinal(response.data))
        .catch((error) => console.error(error));

		axios
    .get("http://localhost:5001/gettwo")
    .then((response) => {
        const analysisData = response.data.twitter.analysis;

        // Convert high floats to integers and keep only positive values
        const convertedAnalysis = analysisData.map(value =>
            Math.max(0, Math.floor(value))
        );

        setProfileResults(convertedAnalysis);

        return axios.post(
            "http://localhost:5001/predict_personality",
            convertedAnalysis
        );
    })
    .then((response) => setProfileFinal(response.data))
    .catch((error) => console.error(error));
		  axios.get("http://localhost:5001/getthree")
		    .then(response => {
		      setSpeechResults(response.data);
		    //   console.log(response.data.twitter.analysis);
		      return axios.post("http://localhost:5001/predict_personality", response.data);
		    })
		    .then(response => setSpeechFinal(response.data))
		    .catch(error => console.error(error));
	}, []);

    // console.log(setQuestionResults)
	// console.log(profileResults)
	// console.log(speechResults)

	// console.log(personalityQuestion);
	// console.log(personalityProfile);
    // console.log(personalitySpeech);
	return (
		<>
			<div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8  mx-auto">
				<nav
					class="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4"
					aria-label="Tabs"
					role="tablist"
				>
					<button
						type="button"
						class="hs-tab-active:bg-gray-100 hs-tab-active:hover:border-transparent text-center md:text-left hover:bg-gray-100 p-3 md:p-5 rounded-xl dark:hs-tab-active:bg-white/[.05] dark:hover:bg-gray-700 active"
						id="tabs-with-card-item-1"
						data-hs-tab="#tabs-with-card-1"
						aria-controls="tabs-with-card-1"
						role="tab"
					>
						<span class="md:flex">
							<svg
								class="hidden md:block flex-shrink-0 md:mt-2 h-6 w-6 hs-tab-active:text-blue-600 text-gray-500 dark:hs-tab-active:text-blue-500 dark:text-gray-500"
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								viewBox="0 0 16 16"
							>
								<path d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1H5.5z" />
								<path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
							</svg>
							<span class="md:grow md:ml-5">
								<span class="hs-tab-active:text-blue-600 block font-semibold text-gray-800 dark:hs-tab-active:text-blue-500 dark:text-gray-200">
									Personality Analysis
								</span>
								<span class="hidden lg:block mt-2 text-gray-800 dark:text-gray-200">
									Results based on the "OCEAN" parameters.
								</span>
							</span>
						</span>
					</button>

					<button
						type="button"
						class="hs-tab-active:bg-gray-100 hs-tab-active:hover:border-transparent text-center md:text-left hover:bg-gray-100 p-3 md:p-5 rounded-xl dark:hs-tab-active:bg-white/[.05] dark:hover:bg-gray-700"
						id="tabs-with-card-item-2"
						data-hs-tab="#tabs-with-card-2"
						aria-controls="tabs-with-card-2"
						role="tab"
					>
						<span class="md:flex">
							<svg
								class="hidden md:block flex-shrink-0 md:mt-2 h-6 w-6 hs-tab-active:text-blue-600 text-gray-500 dark:hs-tab-active:text-blue-500 dark:text-gray-500"
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								viewBox="0 0 16 16"
							>
								<path
									fill-rule="evenodd"
									d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"
								/>
							</svg>
							<span class="md:grow md:ml-5">
								<span class="hs-tab-active:text-blue-600 block font-semibold text-gray-800 dark:hs-tab-active:text-blue-500 dark:text-gray-200">
									Profile Analysis
								</span>
								<span class="hidden lg:block mt-2 text-gray-800 dark:text-gray-200">
									Behaviour results based on Twitter Posts, stats fetched from
									CodeChef.
								</span>
							</span>
						</span>
					</button>

					<button
						type="button"
						class="hs-tab-active:bg-gray-100 hs-tab-active:hover:border-transparent text-center md:text-left hover:bg-gray-100 p-3 md:p-5 rounded-xl dark:hs-tab-active:bg-white/[.05] dark:hover:bg-gray-700"
						id="tabs-with-card-item-3"
						data-hs-tab="#tabs-with-card-3"
						aria-controls="tabs-with-card-3"
						role="tab"
					>
						<span class="md:flex">
							<svg
								class="hidden md:block flex-shrink-0 md:mt-2 h-6 w-6 hs-tab-active:text-blue-600 text-gray-500 dark:hs-tab-active:text-blue-500 dark:text-gray-500"
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								viewBox="0 0 16 16"
							>
								<path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5zM6.374 1 4.168 8.5H7.5a.5.5 0 0 1 .478.647L6.78 13.04 11.478 7H8a.5.5 0 0 1-.474-.658L9.306 1H6.374z" />
							</svg>
							<span class="md:grow md:ml-5">
								<span class="hs-tab-active:text-blue-600 block font-semibold text-gray-800 dark:hs-tab-active:text-blue-500 dark:text-gray-200">
									Speech Analysis
								</span>
								<span class="hidden lg:block mt-2 text-gray-800 dark:text-gray-200">
									Derived from verbal answers given to specific questions.
								</span>
							</span>
						</span>
					</button>
				</nav>
				<div class="mt-12 md:m-16">
					<div
						id="tabs-with-card-1"
						role="tabpanel"
						aria-labelledby="tabs-with-card-item-1"
					>
						<div className="flex items-center justify-center">
							<h1 className="text-white text-6xl">
								Serious
							</h1>
						</div>
						<div class="max-w-[1140px] lg:p-32 lg:pt-12 relative m">
							<BarGraph dataDict={questionResults} />
						</div>
					</div>

					<div
						id="tabs-with-card-2"
						role="tabpanel"
						aria-labelledby="tabs-with-card-item-1"
					>
						<div className="flex items-center justify-center">
							<h1 className="text-white text-6xl">
								Responsible
							</h1>
						</div>
						<div class="max-w-[1140px] lg:p-32 lg:pt-12 relative m">
							<BarGraph dataDict={profileResults} />
						</div>
					</div>

					<div
						id="tabs-with-card-3"
						role="tabpanel"
						aria-labelledby="tabs-with-card-item-1"
					>
						<div className="flex items-center justify-center">
							<h1 className="text-white text-6xl">
								Verbal
							</h1>
						</div>
						<div class="max-w-[1140px] lg:p-32 lg:pt-12 relative m">
							<BarGraph dataDict={sample3} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
