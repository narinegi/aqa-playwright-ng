import { test, expect, request as apiRequest } from "@playwright/test";
import { car_model } from "../../src/data/car_model.js";
import { car_brand } from "../../src/data/car_brand.js";
import { status } from "../../src/api/status.js";
import { endpoint } from "../../src/api/api.js";
import { negative } from "../../src/data/negative.js";

test.describe("Cars API", () => {
    test.describe("Negative Cases for creating a car", () => {
        test("Max mileage", async ({ request }) => {
            const brand = car_brand.Audi;
            const model = car_model[brand.id].A6;
            const requestBodyCar = {
                "carBrandId": brand.id,
                "carModelId": model.id,
                "mileage": negative.negativeMileage.maxMileage
            };
            const response = await request.post(endpoint.cars, {
                data: requestBodyCar
            });
            const responseBodyCar = await response.json();
            const expectedBodyCar = {
                "status": status.status.failed,
                "message": status.message.maxMileage
            };
            expect(response.status()).toBe(status.code.badRequest);
            expect(responseBodyCar).toEqual(expectedBodyCar);
        });

        test("Incorrect mileage", async ({ request }) => {
            const brand = car_brand.Audi;
            const model = car_model[brand.id].A6;
            const requestBodyCar = {
                "carBrandId": brand.id,
                "carModelId": model.id,
                "mileage": negative.negativeMileage.incorrectMileage
            };
            const response = await request.post(endpoint.cars, {
                data: requestBodyCar
            });
            const responseBodyCar = await response.json();
            const expectedBodyCar = {
                "status": status.status.failed,
                "message": status.message.incorrectMileage
            };
            expect(response.status()).toBe(status.code.badRequest);
            expect(responseBodyCar).toEqual(expectedBodyCar);
        });

        test("Empty Brand id", async ({ request }) => {
            const brand = negative.Empty;
            const model = car_model[car_brand.Audi.id].A6;
            const requestBodyCar = {
                "carBrandId": brand.id,
                "carModelId": model.id,
                "mileage": Math.floor(Math.random() * 100)
            };
            const response = await request.post(endpoint.cars, {
                data: requestBodyCar
            });
            const responseBodyCar = await response.json();
            const expectedBodyCar = {
                "status": status.status.failed,
                "message": status.message.brandRequired
            };
            expect(response.status()).toBe(status.code.badRequest);
            expect(responseBodyCar).toEqual(expectedBodyCar);
        });

        test("Empty Model id", async ({ request }) => {
            const brand = car_brand.BMW;
            const model = negative.Empty;
            const requestBodyCar = {
                "carBrandId": brand.id,
                "carModelId": model.id,
                "mileage": Math.floor(Math.random() * 100)
            };
            const response = await request.post(endpoint.cars, {
                data: requestBodyCar
            });
            const responseBodyCar = await response.json();
            const expectedBodyCar = {
                "status": status.status.failed,
                "message": status.message.modelRequired
            };
            expect(response.status()).toBe(status.code.badRequest);
            expect(responseBodyCar).toEqual(expectedBodyCar);
        });

        test("Brand not found", async ({ request }) => {
            const brand = negative.negativeBrand;
            const model = car_model[car_brand.Audi.id].A6;
            const requestBodyCar = {
                "carBrandId": brand.id,
                "carModelId": model.id,
                "mileage": Math.floor(Math.random() * 100)
            };
            const response = await request.post(endpoint.cars, {
                data: requestBodyCar
            });
            const responseBodyCar = await response.json();
            const expectedBodyCar = {
                "status": status.status.failed,
                "message": status.message.brandNotFound
            };
            expect(response.status()).toBe(status.code.notFound);
            expect(responseBodyCar).toEqual(expectedBodyCar);
        });

        test("Model not found", async ({ request }) => {
            const brand = car_brand.Fiat;
            const model = negative.negativeModel;
            const requestBodyCar = {
                "carBrandId": brand.id,
                "carModelId": model.id,
                "mileage": Math.floor(Math.random() * 100)
            };
            const response = await request.post(endpoint.cars, {
                data: requestBodyCar
            });
            const responseBodyCar = await response.json();
            const expectedBodyCar = {
                "status": status.status.failed,
                "message": status.message.modelNotFound
            };
            expect(response.status()).toBe(status.code.notFound);
            expect(responseBodyCar).toEqual(expectedBodyCar);
        });
    });
});
