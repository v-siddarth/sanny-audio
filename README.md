Terminal 1: Setting Up Backend

```sh
cd backend
npm install
npm start
```

Create a file called .env in the backend folder.
Inside it write this :

```sh
MONGO_URL = mongodb://127.0.0.1/ecommerce

SECRET_KEY = 'secret-key'
```

Instead of this link write your database link.

Terminal 2: Setting Up Frontend

```sh
cd frontend
npm install
npm start
```

Now, navigate to `localhost:3000` in your browser.
The Backend API will be running at `localhost:5000`.
<br>

# Error Solution

If you encounter a network error while signing up, follow these steps to resolve it:

1. Navigate to the `src > redux > userHandle.js` file.

2. Add the following line after the import statements:

```javascript
const REACT_APP_BASE_URL = "https://sanny-audio-backend.vercel.app";
```

branch created

ok bro