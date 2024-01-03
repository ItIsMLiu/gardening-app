$(document).ready(function(){

    $("#plant-confirm-btn").on("click", function(){
        let plantApiKey = "sk-w8gg6585d74096b923574";
        let userPlantInput = $("#userPlantName").val().toLowerCase().trim();
        console.log(userPlantInput);
        let requestOptions = {
        method: 'GET',
        redirect: 'follow'
        };
        let plantChoices = [];
       
        // Plant List - search by plant keyword under 'q' to return 'ID'
        fetch("https://perenual.com/api/species-list?q=" + userPlantInput + "&key=" + plantApiKey, requestOptions)
            .then(response => {
                if (!response.ok)
                    throw new Error("network error");
                return response.json()
            })
            .then(result => {
                const plantRegex = new RegExp(userPlantInput, 'gi');
                console.log(result.data);
                plantChoices = result.data.filter(({ common_name }) => common_name.match(plantRegex));
                console.log(plantChoices);
                return fetch(`https://perenual.com/api/species/details/66?key=${plantApiKey}`, requestOptions)
            })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                return fetch(`https://perenual.com/api/species-care-guide-list?Species_ID=66&key=${plantApiKey}`, requestOptions)
            })
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

        // Plant Details - search by 'ID' to return info of plant
        
        // Plant Guides - use 'ID' to search 'species_id' to return care guides
    })  
    })