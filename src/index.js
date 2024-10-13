const init = () => {
    const inputForm = document.querySelector("form");
  
    // Add event listener to capture form submission
    inputForm.addEventListener("submit", (event) => {
      event.preventDefault();  // Prevent the default form submission behavior
      const input = document.querySelector("input#searchByID"); // Get the input element
      
      // Fetch data from the JSON server based on user input
      fetch(`http://localhost:3000/movies/${input.value}`)
        .then((response) => {
          if (!response.ok) {  // Check if response is OK (status code in the range 200-299)
            throw new Error('Movie not found');  // Throw an error for invalid IDs
          }
          return response.json();  // Parse JSON response
        })
        .then((data) => {
          const title = document.querySelector("section#movieDetails h4");
          const summary = document.querySelector("section#movieDetails p");
  
          // Update the DOM with the movie's title and summary
          title.innerText = data.title;
          summary.innerText = data.summary;
        })
        .catch((error) => {
          console.error(error);  // Log any errors
          const title = document.querySelector("section#movieDetails h4");
          const summary = document.querySelector("section#movieDetails p");
  
          // Update the DOM with an error message
          title.innerText = 'Error';
          summary.innerText = 'Movie not found. Please try a different ID.';
        });
    });
  };
  
  document.addEventListener("DOMContentLoaded", init);
  