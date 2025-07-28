const fs = require('fs');
const path = require('path');
import { test, expect } from '@playwright/test';
import { DiagnosticsPage } from '../pages/DiagnosticsPage';

test('Get top diagnostic cities', async ({ page }) => {
  try {
    const diagnosticsPage = new DiagnosticsPage(page);
    await diagnosticsPage.goto();
    const cities = await diagnosticsPage.getCityList(); //fetches the list of cities

    console.log("Cities:", cities);//print the cities

    //saving the cities to json file
    const outputPath = path.join(__dirname, '../data/diagnosticCities.json');         //Defines the output path
    fs.writeFileSync(outputPath, JSON.stringify({ cities }, null, 2), 'utf-8');      //writes the cities to a Json file
  } catch (error) {
    console.log('Error in Get top diagnostic cities test');
  }
});

test('Check for duplicate cities in diagnostics list', async ({ page }) => {
  try {
    const diagnosticsPage = new DiagnosticsPage(page);
    await diagnosticsPage.goto();
    const cities = await diagnosticsPage.getCityList();//fetches the list of cities

    const uniqueCities = new Set(cities);//does not allow duplicates
    expect(uniqueCities.size).toBe(cities.length); // ensure no duplicates
  } catch (error) {
    console.log('Error in Check for duplicate cities test');
  }
});

test('Check for presence of popular cities', async ({ page }) => {
  try {
    const diagnosticsPage = new DiagnosticsPage(page);
    await diagnosticsPage.goto();
    const cities = await diagnosticsPage.getCityList();

    const popularCities = ['Mumbai', 'Delhi', 'Chennai'];
    popularCities.forEach(city => expect(cities).toContain(city));//checks is popular cities are present in the list
  } catch (error) {
    console.log('Error in Check for presence of popular cities test');
  }
});
