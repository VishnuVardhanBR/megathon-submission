import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage.js'
import ProfilesForm from './components/ApplicantProfilesForm.js'
import {Questions, } from './components/Questionaire'
import ApplicantLandingPage from './components/ApplicantLandingPage.js'
import {RecruiterLoginPage} from './components/RecruiterLogin.js'
import {RecruiterLanding} from './components/RecruiterLanding.js'
import ShowDetails from './components/ShowDetails.js';
import VoiceAnalysis from './components/VoiceAnalysis.js';

import('preline')
export default function App() {
  return (
		<div>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/login" element={<LoginPage />} />
        <Route path="/landing" element={<ApplicantLandingPage />} />
        <Route path="/profiles" element={<ProfilesForm />} />
		<Route path="/questions" element={<Questions />} />
		{/* <Route path="/questionsresult" element={<QuestionResults />} /> */}
		<Route path="/recruiterlogin" element={<RecruiterLoginPage />} />
		<Route path="/recruiterlanding" element={<RecruiterLanding />} />
		<Route path="/showdetails" element={<ShowDetails />} />
		<Route path="/voiceanalysis" element={<VoiceAnalysis />} />
      </Routes>
		</div>
    )
}
