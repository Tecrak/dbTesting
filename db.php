<?php
    $servername="localhost";
    $username="Assigment_website";
    $password="28080303";
    $dbname="infoapplication"; 

    // CREATE CONNECTION
    $conn= mysqli_connect($servername, $username, $password,$dbname);

    //CONNECTION CHECK
    if($conn===FALSE){
        die("Error: " . mysqli_connect_error());
    } else { //taking all 5 values from the data(input) level3_form.php
        echo(" Connection succesfull!");
    }
    
    $role=$_REQUEST['roles'];
    $first_name = $_REQUEST['first_name'];
    $surname = $_REQUEST['surname'];
    $email = $_REQUEST['email'];
    $birth = $_REQUEST['birth'];
    $htmlskill = $_REQUEST['htmls'];
    $cssskill = $_REQUEST['csss'];
    $jsskill = $_REQUEST['jss'];
    $phpskill = $_REQUEST['phps'];
    $mysqlskill = $_REQUEST['mysqls'];
    $webdesignskill = $_REQUEST['webdesigns'];
    
    // perform insert query execution
$sql="INSERT INTO info VALUES ('$role',
                               '$first_name',
                               '$surname',
                               '$email', 
                               '$birth',
                               '$htmlskill',
                               '$cssskill',
                               '$jsskill',
                               '$phpskill',
                               '$mysqlskill',
                               '$webdesignskill')";
            if(mysqli_query($conn, $sql)){
                echo"<h3> Data store in the database succesfully. :)
                </h3>";
            } else {
                echo "<h3>Fatal error, Stas what are u doing?? $sql."
                        .mysqli_error($conn);
            }
            mysqli_close($conn);
?>

