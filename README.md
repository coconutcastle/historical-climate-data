# historical-climate-data
Web application project for IOWC historical precipitation data.

## Running the Project Locally

In order to run this project locally, you will need Node.js 18.12.0 and npm 8.19.2.

To run the backend, first navigate from the root folder to /api.

```
cd api
```

Then run the following commands. The application will start running on [https://localhost:9999](https://localhost:9999).

 ```
 npm install
 npm run start:dev
 ```
 
 To run the frontend, navigate from the root folder /frontend.
 
 ```
 cd frontend
 ```
 
 Then run the following commnd. The application will start running on [https://localhost:3000](https://localhost:3000)
 
 ```
 npm install
 npm run dev
 ```


## Data

Precipitation Data Source: [GHCNM-V2](https://www.ncei.noaa.gov/access/metadata/landing-page/bin/iso?id=gov.noaa.ncdc:C00835)

To view the data, see the [KNMI Climate Explorer](https://climexp.knmi.nl/start.cgi?id=someone@somewhere).
