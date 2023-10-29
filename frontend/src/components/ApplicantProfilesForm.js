import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Applicant(){
  const [codechefURL, setCodechefURL] = useState('');
const [twitterURL, setTwitterURL] = useState('');
const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    let jsonData = {};
    if (codechefURL) {
      const codechefres = await axios.get(`http://localhost:5001/codechef?username=${codechefURL}`);
      jsonData = {
        ...jsonData,
        two: {
          codechef: codechefres.data,
        },
      };
    }

    if (twitterURL) {
      const twitterres = await axios.get(`http://localhost:5001/tweets?uname=${twitterURL}`);
      jsonData = {
        ...jsonData,
        two: {
          ...jsonData.two,
          twitter: twitterres.data,
        },
      };
    }

    axios
      .post("http://localhost:5001/store", jsonData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((storeResponse) => {
        axios.get('http://localhost:5001/analysetweets')
          .then(function (response) {
            // console.log(response.data);
          })
          .catch(function (error) {
            console.error('Error:', error);
          });

      })
      .catch((storeError) => {
        console.error("Store Error:", storeError);
      });
  } catch (error) {
    console.error("API Error:", error);
  }
  navigate("/landing");

}


  return(

<div class="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
  <div class="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-slate-900">
    <form onSubmit={handleSubmit}>
      <div class="grid sm:grid-cols-12 gap-2 sm:gap-4 py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-gray-700">
        <div class="sm:col-span-12">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Submit your profiles
          </h2>
        </div>

        <div class="sm:col-span-3">
          <label for="af-submit-application-full-name" class="inline-block text-sm font-medium text-gray-500 mt-2.5">
            Full name
          </label>
        </div>

        <div class="sm:col-span-9">
          <div class="sm:flex">
            <input id="af-submit-application-full-name" type="text" class="py-2 px-3 pr-11 block w-full border border-gray-200 shadow-md -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
            <input type="text" class="py-2 px-3 pr-11 block w-full border border-gray-200 shadow-md -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
          </div>
        </div>

      </div>


      <div class="grid sm:grid-cols-12 gap-2 sm:gap-4 py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-gray-700">
        <div class="sm:col-span-12">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Links
          </h2>
        </div>
{/*
        <div class="sm:col-span-3">
          <label for="af-submit-application-linkedin-url" class="inline-block text-sm font-medium text-gray-500 mt-2.5">
            LinkedIn URL
          </label>
        </div>

        <div class="sm:col-span-9">
          <input id="af-submit-application-linkedin-url" type="text" class="py-2 px-3 pr-11 block w-full border border-gray-200 shadow-md text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
        </div> */}
{/*
        <div class="sm:col-span-3">
          <label for="af-submit-application-twitter-url" class="inline-block text-sm font-medium text-gray-500 mt-2.5">
            Twitter URL
          </label>
        </div>

        <div class="sm:col-span-9">
          <input id="af-submit-application-twitter-url" type="text" class="py-2 px-3 pr-11 block w-full border border-gray-200 shadow-md text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
        </div> */}

        <div class="sm:col-span-3">
          <label for="af-submit-application-twitter-url" class="inline-block text-sm font-medium text-gray-500 mt-2.5">
            Twitter Username
          </label>
        </div>

        <div class="sm:col-span-9">
          <input id="af-submit-application-twitter-url" type="text" value={twitterURL} onChange={e => setTwitterURL(e.target.value)}
 class="py-2 px-3 pr-11 block w-full border border-gray-200 shadow-md text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
        </div>

        <div class="sm:col-span-3">
          <label for="af-submit-application-codechef-url" class="inline-block text-sm font-medium text-gray-500 mt-2.5">
            Codechef Username
          </label>
        </div>

        <div class="sm:col-span-9">
          <input id="af-submit-application-codechef-url" type="text" value={codechefURL}
                onChange={e => setCodechefURL(e.target.value)} class="py-2 px-3 pr-11 block w-full border border-gray-200 shadow-md text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
        </div>
{/*
        <div class="sm:col-span-3">
          <label for="af-submit-application-other-website" class="inline-block text-sm font-medium text-gray-500 mt-2.5">
            Other website
          </label>
        </div>

        <div class="sm:col-span-9">
          <input id="af-submit-application-other-website" type="text" class="py-2 px-3 pr-11 block w-full border border-gray-200 shadow-md text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
        </div> */}

        {/* <div class="sm:col-start-4 sm:col-span-8">
          <a class="inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 hover:underline font-medium" href="../docs/index.html">
            <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
            Add URL
          </a>
        </div> */}
      </div>

      <div class="py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Submit application
        </h2>
        <p class="mt-3 text-sm text-gray-600 dark:text-gray-400">
          In order to analyze your information we need to process your profiles and its contents.
        </p>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          If you are happy for us to do so please click the button below.
        </p>
      </div>

      <button type="submit" class="py-3 px-4 w-full inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
        Submit application
      </button>
    </form>
  </div>
</div>
    )
}



// Questions

// Links/ Socials

//
