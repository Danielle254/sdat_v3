# Service Dogs Around Town 🐕‍🦺
A web application that allows service dog handlers (persons with disabilities) to better navigate their local communities by providing peer-created reviews of local businesses as it relates to the comfort and safety of their service animals.
<img width="1101" height="686" alt="screenshot of Service Dogs Around Town on desktop" src="https://github.com/user-attachments/assets/7b85cdfe-6b6d-467c-aeb4-e0835efde273" />


[Visit the Live version of Website](https://servicedogsaroundtown.vercel.app/)  
Responsive for all size devices. 

## Technology 💻

* Next.js
* React.js
* TypeScript
* UI: Material UI, Tailwind CSS
* Unit Testing: Jest, React Testing Library
* API: Google Maps, Google Places Autocomplete
* Database: Firebase
* User Authentication: Firebase - Google Login
* Deployment: Vercel

## Origin 🪄

This is a personal project created by Danielle Lindblom as part of her portfolio.
The idea for this project came from a personal need - not being able to remember which restaurants were set up well and had been a good experience when utilizing her service dog.

Service Dogs Around Town has been built over 3 separate iterations with improvements to tech stack and user experience each time.

**Version 1**  
[Live Link](https://danielle254.github.io/ServiceDogsAroundTown_v1/)  
[Repo](https://github.com/Danielle254/ServiceDogsAroundTown_v1)  

<img width="1054" height="641" alt="" src="https://github.com/user-attachments/assets/373a8ee6-d1cb-4c2b-9b25-923d5d78cacf" />  

Built with React.js, JavaScript, Vanilla CSS, and utilizing Local Browser Storage, this was mainly a prototype and provided proof of concept.
___

**Version 2**  
[Live Link](https://servicedogsaroundtownv2.vercel.app/)  
[Repo](https://github.com/Danielle254/ServiceDogsAroundTown_v2)  

<img width="1055" height="643" alt="sdatscreen1" src="https://github.com/user-attachments/assets/24d3ad9c-00e6-4c1f-96a2-e6feb2df3490" />  

Built with React.js, JavaScript, and Tailwind CSS, this version incorporated the Google Maps API and Firebase.
___

## Key Features 🌟

* Login with Google (Firebase API)
* Search for a business using Google Places Autocomplete API
* Rate, review, and save private and public notes about that business with a custom form
* See all existing businesses that have been rated in the library
* Read about the app on the About page
* Filter to see just your own entries
* Filter places -- map markers and list view -- by your favorites
* Navigate to the ADA.gov website for information on federal service dog laws

## Setup - Run this project locally 👩‍💻

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Prerequisites
* Node.js (v20 or higher recommended)
* npm (comes with Node.js)
* Google Cloud Account with billing enabled
* Firebase Account

**1. Clone the Repository**
```
git clone https://github.com/Danielle254/sdat_v3
cd sdat_v3
```

**2. Install Dependencies**
```
npm install
```

**3. Set Up Google Cloud Platform**

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
 - Maps JavaScript API
 - Places API
4. Create an API key:
 - Navigate to APIs & Services > Credentials
 - Click Create Credentials > API Key
 - (optional but recommended) Restrict the API key to only the APIs listed above and your localhost domain
5. Create a Map ID:
 - Navigate to Maps > Map Management
 - Click Create Map ID
 - Choose "JavaScript" as the map type
 - Copy the Map ID for use in your environment variables

**4. Set Up Firebase**

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Google Authentication:
 - Navigate to Build > Authentication
 - Click Get Started
 - Enable the Google sign-in provider
4. Create a Firestore Database
 - Navigate to Build > Firestore Database
 - Click Create Database
 - Choose your preferred location and security rules
5. Get your Firebase configurations:
 - Navigate to Project Settings (gear icon)
 - Scroll down to Your apps and click the web icon (</>)
 - Register your app and copy the `apiKey` from the config object

**5. Configure Environment Variables**

Create a `.env` file in the root directory:

```
NEXT_PUBLIC_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_MAPS_ID=your_google_map_id
NEXT_PUBLIC_FIREBASE_KEY=your_firebase_api_key
```
Each environment variable should be a string, encapsulated by quotation marks.

**IMPORTANT**: Never commit your `.env` file to version control (ie GitHub). Be sure that `.env` is included in your `.gitignore` file.

**6. Run the Development Server**

```
npm run dev
```
Open https://localhost:3000 in your browser to see the application.

**7. Run Tests (optional)**

There are a few unit tests set up. These can be run by using:
```
npm test
```

## Future Enhancements 👏

I have lots of ideas to make the user experience even better. I'd like to add the functionality where the list of places on the sidebar matches what is shown on the map and adjusts itself based on the map window changing, just like Google Maps does.  

Another big item on the To Do list is to allow multiple users to rate and review the same business location.  

## Contact 💬

Danielle Lindblom  
Portfolio: [https://daniellelindblom.com](https://daniellelindblom.com)  
LinkedIn: [https://www.linkedin.com/in/danielle-lindblom/](https://www.linkedin.com/in/danielle-lindblom/)  

I am actively seeking service dog handlers to do user testing and provide feedback. Please reach out if you are interested!
