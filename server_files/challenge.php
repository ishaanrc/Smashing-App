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

    if ($decoded['form'] == 'challenges'){
        $sql = ("SELECT * FROM CHALLENGE WHERE USER_ONE=? OR USER_TWO=? ");
        $stmt = mysqli_stmt_init($conn);

        mysqli_stmt_prepare($stmt, $sql);

        //bind params
        mysqli_stmt_bind_param($stmt, "ss",  $decoded['user'],  $decoded['user']);
        mysqli_stmt_execute($stmt); //run para in database
        
        
        $result = mysqli_stmt_get_result($stmt);
        $rows =  mysqli_fetch_all($result, MYSQLI_ASSOC);

        // fetch the resulting rows as an array
        $results = array();
        $Ccount = 0;
 
        foreach ($rows as &$row) {
           $users_friend = $row['USER_ONE'];
           $current_user = $row['USER_TWO'];
           if ($users_friend == $decoded['user']){
                $users_friend = $row['USER_TWO'];
                $current_user = $row['USER_ONE'];
           }

           //get first user cals
           $sql = ("SELECT * FROM USER_DATA WHERE Username=? ");
           mysqli_stmt_prepare($stmt, $sql);

           //bind params
           mysqli_stmt_bind_param($stmt, "s",  $current_user);
           mysqli_stmt_execute($stmt); //run para in database
           
           $result = mysqli_stmt_get_result($stmt);
           $user1 = mysqli_fetch_all($result, MYSQLI_ASSOC);

            mysqli_stmt_prepare($stmt, $sql);

            //bind params
            mysqli_stmt_bind_param($stmt, "s",  $users_friend);
            mysqli_stmt_execute($stmt); //run para in database
            
            $result = mysqli_stmt_get_result($stmt);
            $user2 = mysqli_fetch_all($result, MYSQLI_ASSOC);

            $u1diff = $user1[0]['CAL_BURNED'] - $row['UO_INIT_CAL'];
            $u2diff = $user2[0]['CAL_BURNED'] - $row['UT_INIT_CAL'];

            $winner = NULL;
            if ($u1diff >= 1000){
                $winner = $row['USER_ONE'];
            }else if ($u2diff >= 1000){
                $winner = $row['USER_TWO'];
            }

            if ($winner != NULL){
                $stmt = $conn->prepare("UPDATE CHALLENGE SET WINNER=? WHERE USER_ONE=? AND USER_TWO=? OR USER_ONE=? AND USER_TWO=?");
                $stmt->bind_param("sssss", $winner, $decoded['user'], $users_friend, $users_friend, $decoded['user']);
                $result = $stmt->execute();
            }

            $row = array(
                "ID" => $row['ID'],
                "USER_ONE" => $current_user,
                "UO_BURNED" => $user1[0]['CAL_BURNED'],
                "USER_TWO" => $users_friend,
                "UT_BURNED" => $user2[0]['CAL_BURNED'],
                "STATUS" => $row['STATUS'],
                "ACTION_USER" => $row['ACTION_USER'],
                "WINNER" => $winner
            );
            array_push($results, $row);
            $Ccount = $Ccount + 1;
        }
        $data = array(
            "message" => "success",
            "challenge_count" => $Ccount,
            "challengers" => $results
        );
    
    }else if ($decoded['form'] == 'challenge'){
        if ($decoded['challengestat'] == 0){
            $stmt = $conn->prepare("INSERT INTO CHALLENGE (USER_ONE, USER_TWO, STATUS, ACTION_USER) VALUE (?, ?, ?, ?)");
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
                 "message" => "challenge sent"
                );
                
            $sql = ("SELECT * FROM CHALLENGE WHERE USER_ONE=? AND USER_TWO=? OR USER_ONE=? AND USER_TWO=?");        
            mysqli_stmt_prepare($stmt, $sql);

            //bind params
            mysqli_stmt_bind_param($stmt, "ssss",  $decoded['requester'], $decoded['requestie'], $decoded['requestie'], $decoded['requester']);
            mysqli_stmt_execute($stmt); //run para in database

            $result = mysqli_stmt_get_result($stmt);
            $rows =  mysqli_fetch_all($result, MYSQLI_ASSOC);

            $challenge = $rows[0]["ID"];

            $stmt = $conn->prepare("UPDATE FRIENDSHIP SET CHALLENGE=? WHERE USER_ONE=? AND USER_TWO=? OR USER_ONE=? AND USER_TWO=?");
            $stmt->bind_param("issss", $challenge, $decoded['requester'], $decoded['requestie'], $decoded['requestie'], $decoded['requester']);
            $result = $stmt->execute();

        }else if ($decoded['challengestat'] == 1){
            $sql = ("SELECT * FROM USER_DATA WHERE Username=?");
            $stmt = mysqli_stmt_init($conn);
    
            mysqli_stmt_prepare($stmt, $sql);
    
            //bind params
            mysqli_stmt_bind_param($stmt, "s",  $decoded['requestie']);
            mysqli_stmt_execute($stmt); //run para in database
            
            
            $result = mysqli_stmt_get_result($stmt);
            $rows =  mysqli_fetch_all($result, MYSQLI_ASSOC);

            $user1_cal = $rows[0]["CAL_BURNED"];

            //bind params
            mysqli_stmt_bind_param($stmt, "s",  $decoded['requester']);
            mysqli_stmt_execute($stmt); //run para in database
            
            
            $result = mysqli_stmt_get_result($stmt);
            $rows =  mysqli_fetch_all($result, MYSQLI_ASSOC);

            $user2_cal = $rows[0]["CAL_BURNED"];

            // get 
            $stmt = $conn->prepare("UPDATE CHALLENGE SET STATUS=?, ACTION_USER=?, UO_INIT_CAL=?, UT_INIT_CAL=? WHERE USER_ONE=? AND USER_TWO=? OR USER_ONE=? AND USER_TWO=?");
            $id = $decoded['requester'].$decoded['requestie'];
            $stat = 2;
            $stmt->bind_param("isssssss", $stat, $decoded['requester'], $user1_cal, $user2_cal, $decoded['requester'], $decoded['requestie'], $decoded['requestie'], $decoded['requester']);
            $result = $stmt->execute();
            //good to check if insert was successful
            if (!$result) {
                die('Could not insert data: ' . $conn->error); 
            }
            $data = array(
                 "status" => "true",
                 "message" => "challenged accepted"
                );

        }
    }else if ($decoded['form'] == 'remove'){
        $sql = ("DELETE FROM CHALLENGE WHERE USER_ONE=? AND USER_TWO=? OR USER_ONE=? AND USER_TWO=?");
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

        $stmt = $conn->prepare("UPDATE FRIENDSHIP SET CHALLENGE=? WHERE USER_ONE=? AND USER_TWO=? OR USER_ONE=? AND USER_TWO=?");
        $chal = 0;
        $stmt->bind_param("issss", $chal, $decoded['deleter'], $decoded['deletie'], $decoded['deletie'], $decoded['deleter']);
        $result = $stmt->execute();

    }

    echo json_encode($data);

    // free result from memory
    //mysqli_free_results($result);

    // close connection
    mysqli_close($conn);

?>