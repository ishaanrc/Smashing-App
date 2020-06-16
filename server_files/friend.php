<?php 

    require 'connect.php';  //includes php file for connecting to the database

    header('Content-Type: application/json');
    $incomingContentType = $_SERVER['CONTENT_TYPE'];

    if ($incomingContentType != 'application/json'){
        header($_SERVER['SERVER_PROTOCOL']). ' 500 server error';
        echo 'error';
        exit();
    }

    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);
    $data = array();

    if ($decoded['form'] == 'friends'){
        $sql = ("SELECT * FROM FRIENDSHIP WHERE USER_ONE=? OR USER_TWO=? ");
        $stmt = mysqli_stmt_init($conn);

        mysqli_stmt_prepare($stmt, $sql);

        //bind params
        mysqli_stmt_bind_param($stmt, "ss",  $decoded['user'],  $decoded['user']);
        mysqli_stmt_execute($stmt); //run para in database
        
        
        $result = mysqli_stmt_get_result($stmt);
        $rows =  mysqli_fetch_all($result, MYSQLI_ASSOC);

        // fetch the resulting rows as an array
        $results = array();
        $fCount = 0;
 
        foreach ($rows as &$row) {
           $users_friend = $row['USER_ONE'];
           if ($users_friend == $decoded['user']){
                $users_friend = $row['USER_TWO'];
           }

            $sql = ("SELECT * FROM USER_DATA WHERE Username=? ");
            mysqli_stmt_prepare($stmt, $sql);

            //bind params
            mysqli_stmt_bind_param($stmt, "s",  $users_friend);
            mysqli_stmt_execute($stmt); //run para in database
            
            $result = mysqli_stmt_get_result($stmt);
            $user = mysqli_fetch_all($result, MYSQLI_ASSOC);

            $friend_stats = array(
                "id" => $user[0]['ID'],
                "username" => $user[0]['Username'],
                "currency" => $user[0]['Currency'],
                "hp" => $user[0]['HP'],
                "str" => $user[0]['SR'],
                "agi" => $user[0]['AGI'],
                "spd" => $user[0]['SPD'],
                "drn" => $user[0]['DRN'],
            );

            $row = array(
                "ID" => $row['ID'],
                "USER_ONE" => $row['USER_ONE'],
                "USER_TWO" => $row['USER_TWO'],
                "STATUS" => $row['STATUS'],
                "ACTION_USER" => $row['ACTION_USER'],
                "FRIENDS_SINCE" => $row['FRIENDS_SINCE'],
                "CHALLENGE" => $row['CHALLENGE'],
                "friendstats" => $friend_stats
            );
            array_push($results, $row);
            $fCount = $fCount + 1;
        }
        $data = array(
            "message" => "success",
            "friend count" => $fCount,
            "friends" => $results
        );
    
    }else if ($decoded['form'] == 'add friend'){
        if ($decoded['friendstatus'] == 2){

        }else if ($decoded['friendstatus'] == 0){
            $stmt = $conn->prepare("INSERT INTO FRIENDSHIP (USER_ONE, USER_TWO, STATUS, ACTION_USER) VALUE (?, ?, ?, ?)");
            $id = $decoded['requester'] .$decoded['requestie'];
            $stat = 1;
            if (!$stmt->bind_param("ssis", $decoded['requester'], $decoded['requestie'], $stat, $decoded['requester'])){
                echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
            }
            $result = $stmt->execute();
            //good to check if insert was successful
            if (!$result) {
                echo "bad";
                echo 'Could not insert data: ' . $conn->error; 
            }
            $data = array(
                 "status" => "true",
                 "message" => "Friend request sent"
                );

        }else if ($decoded['friendstatus'] == 1){
            $stmt = $conn->prepare("UPDATE FRIENDSHIP SET STATUS=?, ACTION_USER=? WHERE USER_ONE=? AND USER_TWO=? OR USER_ONE=? AND USER_TWO=?");
            $id = $decoded['requester'].$decoded['requestie'];
            $stat = 2;
            $stmt->bind_param("isssss", $stat, $decoded['requester'], $decoded['requester'], $decoded['requestie'], $decoded['requestie'], $decoded['requester']);
            $result = $stmt->execute();
            //good to check if insert was successful
            if (!$result) {
                die('Could not insert data: ' . $conn->error); 
            }
            $data = array(
                 "status" => "true",
                 "message" => "Friend request accepted"
                );

        }
    }else if ($decoded['form'] == 'search friend'){
        $sql = ("SELECT * FROM USER_DATA WHERE Username LIKE ? ");
        $stmt = mysqli_stmt_init($conn);

        mysqli_stmt_prepare($stmt, $sql);

        //bind params
        $param = $decoded['search'] ."%";
        mysqli_stmt_bind_param($stmt, "s",  $param);
        mysqli_stmt_execute($stmt); //run para in database
        
        
        $result = mysqli_stmt_get_result($stmt);
        $rows =  mysqli_fetch_all($result, MYSQLI_ASSOC);

        // fetch the resulting rows as an array
        //$user = mysqli_fetch_all($result);
        $results = array();
        $fCount = 0;
        foreach ($rows as $row) {
            if ($row['Username'] != $decoded['user']){
                $sql = ("SELECT * FROM FRIENDSHIP WHERE USER_ONE=? AND USER_TWO=? OR USER_ONE=? AND USER_TWO=?");
                
                mysqli_stmt_prepare($stmt, $sql);

                //bind params
                mysqli_stmt_bind_param($stmt, "ssss",  $decoded['user'], $row['Username'], $row['Username'], $decoded['user']);
                mysqli_stmt_execute($stmt); //run para in database
                
                
                $result = mysqli_stmt_get_result($stmt);
                $user = mysqli_fetch_all($result, MYSQLI_ASSOC);

                if (empty($user)){
                    $stat = 0;
                    $action = null;
                }else{
                    $stat = $user[0]['STATUS'];
                    $action = $user[0]['ACTION_USER'];
                }

                $row = array(
                    "id" => $row['ID'],
                    "username" => $row['Username'],
                    "currency" => $row['Currency'],
                    "hp" => $row['HP'],
                    "str" => $row['SR'],
                    "agi" => $row['AGI'],
                    "spd" => $row['SPD'],
                    "drn" => $row['DRN'],
                    "friendstatus" => $stat,
                    "action_user" => $action
                );
                array_push($results, $row);
                $fCount = $fCount + 1;
            }
        }
        $data = array(
            "message" => "success",
            "resultscount" => $fCount,
            "results" => $results
        );
    }else if ($decoded['form'] == 'remove'){
        $sql = ("DELETE FROM FRIENDSHIP WHERE USER_ONE=? AND USER_TWO=? OR USER_ONE=? AND USER_TWO=?");
        $stmt = mysqli_stmt_init($conn);
        
        mysqli_stmt_prepare($stmt, $sql);
        // echo $decoded['deleter'];
        // echo $decoded['deletie'];
        //bind params
        mysqli_stmt_bind_param($stmt, "ssss",  $decoded['deleter'], $decoded['deletie'], $decoded['deletie'], $decoded['deleter']);
        mysqli_stmt_execute($stmt); //run para in database
        $count = mysqli_affected_rows($conn);
        // echo 'hello' . $count;
        if ($count == 1){
            $data = array(
                "message" => "success",
                "rowsaffected" => $count
            );
        }

    }

    echo json_encode($data);

    // free result from memory
    //mysqli_free_results($result);

    // close connection
    mysqli_close($conn);

?>