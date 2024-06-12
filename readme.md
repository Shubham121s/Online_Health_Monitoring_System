# Health Monitor App

## About
Multi-Platform Electron Desktop Application that allows users to monitor health and fitness data.

Allows users to enter calories in, calories out, weight, and exercise name and time. Displays net calories on a scatter lot and activities on a donut chart. Allows users to register, reset their password, or log in with username and password on startup.

Uses MongoDB Atlas to store user data.

## Instalation

### To run:
1. Clone the repository
2. <code>npm install</code>
3. <code>npm start</code>

### Package and distribute the application:
1. <code>npx @electron-forge/cli import</code>
2. <code>npm run make</code>


For more information, see https://www.electronjs.org/docs/tutorial/quick-start#package-and-distribute-the-application. 

### Use your own cloud database:
1. Create your own cluster with MongoDB Atlas
2. On your cluster, click connect. Then click connect your application. Copy your connection string.
3. Replace the connection string on line 1 of the main.js file with your connection string, including your username and password.
```javascript
const mongourl = 'mongodb+srv://name:password@cluster0.wdcoc.mongodb.net/dbname?retryWrites=true&w=majority';
```


## Usage 

### Create Account 
If you are using the application for the first time, create an account.


### Login 
If you have already created an account, you can login with your username and password.


### Dashboard
Here you can see your see your recently entered health data in the cards on top. The net calories scatterplot shows the net calories for each entered date. The activity donut chart shows the time spent by activity.


Scrolling down, you can see a form to enter health data for a specific day. The table contains all previous entries. 


Data entred previously can be modified in the table. The date can be modified by clicking on the date that needs to be modified and selecting a new one from the drop-down date selector. Other metrics can also be modified by tying in a new value. Once the table is modified, the database will be updated and the charts and cards will be updated.


If an invalid value in entered in the table, the cell will be highlited in red. The databbase and charts will not be updated.


To remove a row, right click over the row and select Remove this Entry.


### Forgot Password
To reset password, select forgot password from the login screen and follow the instructions.
