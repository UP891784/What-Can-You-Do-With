document.addEventListener("DOMContentLoaded", function(event) {
    // Get the noun from the URL parameters
    const searchParams = new URLSearchParams(window.location.search);
    const noun = searchParams.get('noun');
    
    // Get the details for the noun
    const details = getNounDetails(noun);
    
    // Display the details on the page
    const nounDetailsElement = document.getElementById('noun-details');
    nounDetailsElement.innerHTML = `
      <p>Name: ${details.name}</p>
      <p>Description: ${details.description}</p>
      <p>Uses: ${details.uses.join(', ')}</p>
    `;
  });
  
  function getNounDetails(noun) {
    // Replace this with code to get the details for the noun from your database
    // For this example, we'll just return some hardcoded data
    if (noun === 'tomato') {
      return {
        name: 'Tomato',
        description: 'The tomato is the edible, often red, berry of the plant Solanum lycopersicum, commonly known as a tomato plant.',
        uses: ['cooking', 'salads', 'sauces']
      };
    } else {
      return {
        name: 'Unknown',
        description: 'Sorry, we do not have any details for this noun.',
        uses: []
      };
    }
  }
  