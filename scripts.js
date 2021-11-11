// function to asynchronously fetch file contents from path/URL "fromFile" 
// and insert them in the DOM object found with "whereTo" -- note this
// uses document.querySelector, so use CSS notation on "whereTo"

function loadFileInto(recipeName, listName, whereTo) {

	// 1. creating a new XMLHttpRequest object
	ajax = new XMLHttpRequest();
	
	// 2. define the fromFile variable with the passed recipe name and list
	fromFile = "recipes.php?recipeName=" + recipeName + "&recipeList=" + listName;
	
	console.log("From URL: " + fromFile); // output the URL result to the browser's devtools console

	// 3. defines the GET/POST method, the source, and the async value of the AJAX object
	ajax.open("GET", fromFile, true);

	// 4. provides code to do something in response to the AJAX request
	ajax.onreadystatechange = function() {

		if ((this.readyState == 4) && (this.status == 200)) { // if .readyState is 4, the process is done; and if .status is 200, there were no HTTP errors

			responseArray = JSON.parse(this.responseText);
			responseHTML = "";

			if (this.responseText != "0") {
				for (x = 0; x < responseArray.length; x++) {
					responseHTML += "<li>" + responseArray[x].content + "</li>";
				}
			}
			
			document.querySelector(whereTo).innerHTML = responseHTML; // insert compiled directly into the chosen DOM object

		} else if ((this.readyState == 4) && (this.status != 200)) { // if .readyState is 4, the process is done; and if .status is NOT 200, output the error into the console

			console.log("Error: " + this.responseText);

		}

	} // end ajax.onreadystatechange function

	// 5. let's go -- initiate request and process the responses
	ajax.send();

}


// new Recipe object
function Recipe(recipeName, contributorName, imageURL) {
	
	this.recipe = recipeName;
	this.contributor = contributorName;
	this.img = imageURL;
	
	this.displayRecipe = function() {
		
		document.querySelector("#titleBanner h1").innerHTML = this.recipe;
		document.querySelector("#contributor").innerHTML = "Contributed by " + this.contributor;
		document.querySelector("#titleBanner").style.backgroundImage = "url(" + this.img + ")";
		
		loadFileInto(this.recipe, "ingredients", "#ingredients ul");
		loadFileInto(this.recipe, "equipment", "#equipment ul");
		loadFileInto(this.recipe, "directions", "#directions ol");
		
	}
	
	
}

SevenLayerBars = new Recipe("Seven Layer Bars", "Tor", "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F5574746.jpg&w=596&h=596&c=sc&poi=face&q=85");


window.onload = function() {

	document.querySelector("#titleBanner h1").classList.toggle("tp6");
	
	document.querySelector("#ingredients").onclick = function() {
		document.querySelector("#ingredients ul").classList.toggle("showMe");
	}
	
	document.querySelector("#equipment").onclick = function() {
		document.querySelector("#equipment ul").classList.toggle("showMe");
	}
		
	document.querySelector("#directions").onclick = function() {
		document.querySelector("#directions ol").classList.toggle("showMe");
	}
	
	document.querySelector("#titleBanner h1").onclick = function() {
		this.classList.toggle("tp6");
	}
	
	document.querySelector("#footer").innerHTML += "<p><i>Recipe reprinted without permission, sorry.</i></p>";
	
	
	
	document.querySelector("#r1").onclick = function() {
		SevenLayerBars.displayRecipe();	
	}
	
	
	
} // end of window.onload








