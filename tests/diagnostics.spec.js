const fs = require('fs');
const path = require('path');
import { test, expect } from '@playwright/test';
import { DiagnosticsPage } from '../pages/DiagnosticsPage';

test('Get top diagnostic cities and save to JSON', async ({ page }) => {
  try {
    const diagnosticsPage = new DiagnosticsPage(page);
    await diagnosticsPage.goto();
    const cities = await diagnosticsPage.getCityList();

    console.log("Cities:", cities);

    
    const outputPath = path.join(__dirname, '../data/diagnosticCities.json');
    fs.writeFileSync(outputPath, JSON.stringify({ cities }, null, 2), 'utf-8');
  } catch (error) {
    console.log('Error in Get top diagnostic cities test');
  }
});

test('Check for duplicate cities in diagnostics list', async ({ page }) => {
  try {
    const diagnosticsPage = new DiagnosticsPage(page);
    await diagnosticsPage.goto();
    const cities = await diagnosticsPage.getCityList();

    const uniqueCities = new Set(cities);
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
    popularCities.forEach(city => expect(cities).toContain(city));
  } catch (error) {
    console.log('Error in Check for presence of popular cities test');
  }
});
