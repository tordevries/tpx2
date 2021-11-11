<?

/* recipe loader for TPX2 */

// this file should be called with data:
// recipes.php?recipeName=Some Recipe&recipeList=list

$name = $_GET["recipeName"]; // gets the value of the passed recipeName
$list = $_GET["recipeList"]; // gets the value of the passed recipeList

require "database.php";

// get the recipes in the database
$sql = "SELECT * FROM $list
		WHERE name='$name'
		ORDER BY sequence";

$requestedOutput = $db->query($sql);

if (!$requestedOutput) die("List Error: " . $sql . "<br>" . $db->error);

if ($requestedOutput->num_rows > 0) {
	$outputArray = [];
	while( $row = $requestedOutput->fetch_assoc() ) {
		$outputArray[] = $row;
	}
	$requestedJSON = json_encode($outputArray);
} else {
	die("0");
}

echo $requestedJSON;