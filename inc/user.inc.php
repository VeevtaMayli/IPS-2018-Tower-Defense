<?php

function getInfoByName($name)
{
    $query = "SELECT name FROM " . USER_TABLE .  " WHERE name = '" . dbQuote($name)  . "';";
    return dbQueryGetResult($query);
}

function registerUser($name, $pass)
{
    $query = "INSERT INTO " . USER_TABLE . " (name, password, registration_date)
    VALUES ('" . dbQuote($name) . "', '" . dbQuote($pass) . "', '" . dbQuote(date("Y-m-d")) . "');";
    dbQuery($query);
    return dbGetLastInsertId();
}

function getPasswordHashByName($name)
{
    $query = "SELECT password FROM " . USER_TABLE .  " WHERE name = '" . dbQuote($name)  . "';";
    return dbQueryGetResult($query);
}

function checkPassword($name, $password)
{
    $validHash = getPasswordHashByName($name)[0]["password"];
    return password_verify($password, $validHash);
}