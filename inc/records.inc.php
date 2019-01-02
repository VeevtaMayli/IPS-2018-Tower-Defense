<?php
function getRecordsFromDB()
{
    $query = "SELECT users.name, records.record_date, records.scores
    FROM " . USER_TABLE . " INNER JOIN " . RECORD_TABLE. " USING (user_id)
    ORDER BY records.scores DESC LIMIT 10";
    $result = dbQueryGetResult($query);
    return $result;
}

function getTopDefenders()
{
    $data = getRecordsFromDB();

    $i = 0;
    $records = [];
    foreach ($data as $value) {
        $records[$i++] = array_merge($value, ['position'=> $i]);
    }
    return ['records' => $records];
}
