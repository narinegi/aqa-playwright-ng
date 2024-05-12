import { test, expect, request as apiRequest } from "@playwright/test";
import { car_model } from "../../src/data/car_model.js";
import { car_brand } from "../../src/data/car_brand.js";
import { status } from "../../src/api/status.js";
import { endpoint } from "../../src/api/api.js";

test.describe("Cars API", () => {
    test.describe("Create a new car", () => {
        let carIDs = [];

        test("Create cars for all brands and models", async ({ page }) => {
            for (const brand of Object.values(car_brand)) {
                for (const model of Object.values(car_model[brand.id])) {
                    await test.step(`Create a Car "${brand.title}" and model ${model.title}`, async () => {
                        const requestBodyCar = {
                            "carBrandId": brand.id,
                            "carModelId": model.id,
                            "mileage": Math.floor(Math.random() * 100)
                        };

                        // Intercept POST request
                        page.route(endpoint.cars, route => {
                            return route.fulfill({
                                status: 200, // Change the status code here if necessary
                                body: JSON.stringify({
                                    status: status.status.success,
                                    data: {
                                        id: Math.floor(Math.random() * 1000), // Mocked ID
                                        carBrandId: requestBodyCar.carBrandId,
                                        carModelId: requestBodyCar.carModelId,
                                        initialMileage: requestBodyCar.mileage,
                                        carCreatedAt: new Date().toISOString(), // Use current timestamp
                                        mileage: requestBodyCar.mileage,
                                        brand: brand.title,
                                        model: model.title,
                                        logo: brand.logoFilename,
                                        updatedMileageAt: new Date().toISOString() // Use current timestamp
                                    }
                                })
                            });
                        });

                        // Send a request
                        const response = await page.goto(endpoint.cars, {
                            method: 'POST',
                            body: JSON.stringify(requestBodyCar),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });

                        const responseBodyCar = await response.json();
                        const expectedBodyCar = {
                            "id": expect.any(Number),
                            "carBrandId": requestBodyCar.carBrandId,
                            "carModelId": requestBodyCar.carModelId,
                            "initialMileage": requestBodyCar.mileage,
                            "updatedMileageAt": expect.any(String),
                            "carCreatedAt": expect.any(String),
                            "mileage": requestBodyCar.mileage,
                            "brand": brand.title,
                            "model": model.title,
                            "logo": brand.logoFilename
                        };

                        expect(responseBodyCar.status).toBe(status.status.success);
                        expect(response.ok()).toBe(true); // Check if the response is ok
                        expect(responseBodyCar.data).toEqual(expectedBodyCar);
                        carIDs.push(responseBodyCar.data.id);
                    });
                }
            }
        });

        test.afterEach("Delete car", async ({ page }) => {
            for (const carId of carIDs) {
                const response = await page.goto(`${endpoint.cars}/${carId}`, {
                    method: 'DELETE'
                });
                expect(response.ok()).toBe(true);
            }
        });
    });
});
