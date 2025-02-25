class APIService {
  
    async fetchData( requestData) {
      try {
        const response = await fetch(`http://localhost:5001/api/cmd`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
  
        const data = await response.json();
  
        if (!data || typeof data !== "object" || !data.finalObj) {
          throw new Error("Invalid response format!");
        }
  
        const parsedFinalObj = JSON.parse(data.finalObj);
        if (!Array.isArray(parsedFinalObj) || parsedFinalObj.length === 0) {
          throw new Error("finalObj is not a valid array!");
        }
  
        return parsedFinalObj;
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    }
  }
  
  export default APIService;
  