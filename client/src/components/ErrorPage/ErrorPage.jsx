import React from 'react';

function ErrorPage() {
  return (
    <div className="error-container">
      <h1>Oops!</h1>
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
      <a href="/">Go to Home Page</a>
      <div className="image-container">
        <img src="https://i.imgur.com/qIufhof.gif" alt="404 Error Image" />
      </div>
      <style>
        {`
          .error-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f8f8f8;
          }

          h1, h2, p {
            text-align: center;
            margin-bottom: 20px;
          }

          a {
            display: inline-block;
            padding: 10px 20px;
            background-color: #333;
            color: #fff;
            text-decoration: none;
            border-radius: 5px; 
            transition: all 0.3s ease;
          }

          a:hover {
            background-color: #666;
          }

          .image-container {
            margin-top: 20px;
          }

          img {
            width: 100%;
            max-width: 400px;
          }

          /* Animation */
          @keyframes bounce {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
            100% {
              transform: translateY(0);
            }
          }

          .image-container img {
            animation: bounce 1s infinite;
          }
        `}
      </style>
      <script>
        {`
          // Optional: You can add a JavaScript code to redirect the user to the homepage after a certain amount of time.
          setTimeout(function(){
            window.location.href = "/";
          }, 5000);
        `}
      </script>
    </div>
  );
}

export default ErrorPage;
