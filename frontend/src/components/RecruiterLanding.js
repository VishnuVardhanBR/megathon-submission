import { useNavigate } from "react-router-dom";

export function RecruiterLanding(){
  const navigate = useNavigate();
  return (
    <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div class="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 class="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">Applicants</h2>
        <p class="mt-1 text-gray-600 dark:text-gray-400">Get all personality information here.</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <a class="group rounded-xl overflow-hidden" onClick={()=>{navigate('/showdetails')}}>
          <div class="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
            <img class="w-full h-full absolute top-0 left-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://as2.ftcdn.net/v2/jpg/02/07/68/43/1000_F_207684339_dFUUI0leWvNaKJR6Da0ZswUhLI4YzIGT.jpg" alt="Image Description"/>
          </div>

          <div class="mt-7">
            <h3 class="text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-gray-200">
              Joseph Carlos
            </h3>
            {/* <p class="mt-3 text-gray-800 dark:text-gray-200">
              Text
            </p> */}
            <p class="mt-5 inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 group-hover:underline font-medium">
              View Details
              <svg class="w-2.5 h-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </p>
          </div>
        </a>


        <a class="group rounded-xl overflow-hidden" onClick={()=>{navigate('/showdetails')}}>
          <div class="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
            <img class="w-full h-full absolute top-0 left-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://as2.ftcdn.net/v2/jpg/03/34/13/15/1000_F_334131546_NpUIxz0QWEwyUIDAkC9dtrwdr0AXxoHB.jpg" alt="Image Description"/>
          </div>

          <div class="mt-7">
            <h3 class="text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-gray-200">
              Anthony Peterson
            </h3>
            {/* <p class="mt-3 text-gray-800 dark:text-gray-200">
              Text
            </p> */}
            <p class="mt-5 inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 group-hover:underline font-medium">
              View Details
              <svg class="w-2.5 h-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </p>
          </div>
        </a>
        <a class="group rounded-xl overflow-hidden" onClick={()=>{navigate('/showdetails')}}>
          <div class="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
            <img class="w-full h-full absolute top-0 left-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://media.istockphoto.com/id/1277971635/photo/portrait-of-a-smiling-man-of-indian-ethnicity.jpg?s=612x612&w=0&k=20&c=CnPwvagPlklsAjejUNkuKv_QXtaXPYFQ64AQYb-IAjA=" alt="Image Description"/>
          </div>

          <div class="mt-7">
            <h3 class="text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-gray-200">
              Anil Sharma
            </h3>
            {/* <p class="mt-3 text-gray-800 dark:text-gray-200">
              Text
            </p> */}
            <p class="mt-5 inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 group-hover:underline font-medium">
              View Details
              <svg class="w-2.5 h-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </p>
          </div>
        </a>
        <a class="group rounded-xl overflow-hidden" onClick={()=>{navigate('/showdetails')}}>
          <div class="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
            <img class="w-full h-full absolute top-0 left-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://images.moneycontrol.com/static-mcnews/2023/04/elon-musk-770x433.jpg?impolicy=website&width=770&height=431" alt="Image Description"/>
          </div>

          <div class="mt-7">
            <h3 class="text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-gray-200">
              Melon Musk
            </h3>
            {/* <p class="mt-3 text-gray-800 dark:text-gray-200">
              Text
            </p> */}
            <p class="mt-5 inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 group-hover:underline font-medium">
              View Details
              <svg class="w-2.5 h-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </p>
          </div>
        </a>
        <a class="group rounded-xl overflow-hidden" onClick={()=>{navigate('/showdetails')}}>
          <div class="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
            <img class="w-full h-full absolute top-0 left-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://as1.ftcdn.net/v2/jpg/03/82/78/76/1000_F_382787674_JmU69nTp1qEUwh0kxBeThK60my6MBYSL.jpg" alt="Image Description"/>
          </div>

          <div class="mt-7">
            <h3 class="text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-gray-200">
              Samantha Joesph
            </h3>
            {/* <p class="mt-3 text-gray-800 dark:text-gray-200">
              Text
            </p> */}
            <p class="mt-5 inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 group-hover:underline font-medium">
              View Details
              <svg class="w-2.5 h-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </p>
          </div>
        </a>
        <a class="group rounded-xl overflow-hidden" onClick={()=>{navigate('/showdetails')}}>
          <div class="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
            <img class="w-full h-full absolute top-0 left-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl" src="https://as2.ftcdn.net/v2/jpg/03/38/13/73/1000_F_338137310_f3fmSl2cl5RQzezzsQDZtaif1SOLvuDR.jpg" alt="Image Description"/>
          </div>

          <div class="mt-7">
            <h3 class="text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-gray-200">
              Idris Elba
            </h3>
            {/* <p class="mt-3 text-gray-800 dark:text-gray-200">
              Text
            </p> */}
            <p class="mt-5 inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 group-hover:underline font-medium">
              View Details
              <svg class="w-2.5 h-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </p>
          </div>
        </a>
      </div>
    </div>
    );
}
