// Live COVID-19 Tracker
// *********************
// 
// Created by Kevin Thomas 03/22/20.
// Modified by Kevin Thomas 03/22/20.
// Apache License, Version 2.0
// 
// Live COVID-19 Tracker is a simple web app that shows the latest COVID-19 
// statistics feed of the world and your country of choice in real-time which
// refreshes every 60 seconds.


// Global vars
var input;

// Load init data onload
$(document).ready(function() {
    world_data();
    setInterval("world_data()", 60000);
    init_country_data();
});

// Obtain initial country data from API
function init_country_data() {
    $('form').on('submit', function(event) {
        event.preventDefault();
        
        var $input = $(this).find('input');
        input = $input.val();
        $('#text-output').text(input);

        $.get('https://corona.lmao.ninja/countries/' + input, function(data) {
            // console.log(data);

            if (input == '') {
                $("#country_cases").text('*** PLEASE ENTER A COUNTRY ***');
                $("#country_today_cases").text('');
                $("#country_deaths").text('');
                $("#country_today_deaths").text('');
                $("#country_recovered").text('');
                $("#country_active").text('');
                $("#country_critical").text('');
                $("#country_cases_per_one_million").text('');
                $("#country_deaths_per_one_million").text('');
                $("#country_tests").text('');
                $("#country_tests_per_one_million").text('');
            } else if (data == "Country not found or doesn't have any cases") {
                $("#country_today_cases").text('');
                $("#country_deaths").text('');
                $("#country_today_deaths").text('');
                $("#country_recovered").text('');
                $("#country_active").text('');
                $("#country_critical").text('');
                $("#country_cases_per_one_million").text('');
                $("#country_deaths_per_one_million").text('');
                $("#country_tests").text('');
                $("#country_tests_per_one_million").text('');
            } else {
                $("#country_cases").text(data.cases + ' Cases');
                $("#country_today_cases").text(data.todayCases + ' Cases Today');
                $("#country_deaths").text(data.deaths + ' Deaths');
                $("#country_today_deaths").text(data.todayDeaths + ' Deaths Today');
                $("#country_recovered").text(data.recovered + ' Recovered');
                $("#country_active").text(data.active + ' Active');
                $("#country_critical").text(data.critical + ' Critical');
                $("#country_cases_per_one_million").text(data.casesPerOneMillion + ' Cases Per One Million');
                $("#country_deaths_per_one_million").text(data.deathsPerOneMillion + ' Deaths Per One Million');
                $("#country_tests").text(data.tests + ' Tests');
                $("#country_tests_per_one_million").text(data.testsPerOneMillion + ' Tests Per One Million');
            }
        });

        // Check API every 60 seconds
        setInterval("country_data()", 60000);
    });	
}

// Obtain country data from API
function country_data() {
    $.get('https://corona.lmao.ninja/countries/' + input, function(data) {
        // console.log(data);

        $("#country_cases").text(data.cases + ' Cases');
        $("#country_today_cases").text(data.todayCases + ' Cases Today');
        $("#country_deaths").text(data.deaths + ' Deaths');
        $("#country_today_deaths").text(data.todayDeaths + ' Deaths Today');
        $("#country_recovered").text(data.recovered + ' Recovered');
        $("#country_active").text(data.active + ' Active');
        $("#country_critical").text(data.critical + ' Critical');
        $("#country_cases_per_one_million").text(data.casesPerOneMillion + ' Cases Per One Million');
        $("#country_deaths_per_one_million").text(data.deathsPerOneMillion + ' Deaths Per One Million');
        $("#country_tests").text(data.tests + ' Tests');
        $("#country_tests_per_one_million").text(data.testsPerOneMillion + ' Tests Per One Million');
    });
}

// Obtain world data from API
function world_data() {
    $.get('https://corona.lmao.ninja/all', function(data) {
        // console.log(data);

        $("#world_cases").text(data.cases + ' Cases');
        $("#world_today_cases").text(data.todayCases + ' Today Cases');
        $("#world_deaths").text(data.deaths + ' Deaths');
        $("#world_today_deaths").text(data.todayDeaths + ' Deaths Today');
        $("#world_recovered").text(data.recovered + ' Recovered');
        $("#world_active").text(data.active + ' Active');
        $("#world_critical").text(data.critical + ' Critical');
        $("#world_cases_per_one_million").text(data.casesPerOneMillion + ' Cases Per One Million');
        $("#world_deaths_per_one_million").text(data.deathsPerOneMillion + ' Deaths Per One Million');
        $("#world_tests").text(data.tests + ' Tests');
        $("#world_tests_per_one_million").text(data.testsPerOneMillion + ' Tests Per One Million');
        $("#world_affected_countries").text(data.affectedCountries + ' Affected Countries');
    });
}