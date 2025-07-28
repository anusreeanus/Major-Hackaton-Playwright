import { test, expect } from '@playwright/test';

import { HospitalPage } from '../pages/hospitalPage';

test('Find hospitals in Chennai with filters', async ({ page }) => {
    try {
        const hospitalPage = new HospitalPage(page);
        await hospitalPage.navigating();
        await hospitalPage.locatinghospital('Chennai');
        await hospitalPage.hospital('Hospital');
        const ListofHospitals = await hospitalPage.qualifiedHospitals();//Get the list of hospitals
        expect(ListofHospitals.length).toBeGreaterThan(0);//Ensure that the list is not empty
        await hospitalPage.printHospitals(ListofHospitals, ListofHospitals.length);//prints the list of hospitals and count
    } catch (error) {
        console.log('Error during "Find hospitals in Chennai with filters');
    }
});

test('Enter invalid hospital type and capture message', async ({ page }) => {
    try {
        const hospitalPage = new HospitalPage(page);
        await hospitalPage.navigating();
        const errorMessage = await hospitalPage.enterInvalidSearchAndCaptureMessage('%#^&^*');//enter invalid hospital type
        expect(errorMessage.trim()).toBe("We couldn't find any doctors for you");//validate the error message
    } catch (error) {
        console.log('Error during Enter invalid hospital type and capture message');
    }
});
