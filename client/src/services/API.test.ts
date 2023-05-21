import { getCredentials, getConfig } from "./API";
import { mockLocalStorage } from "../tests/helpers/mockLocalStorage";
import { STORAGE_KEYS } from "../utils/constants";

const { setItemMock } = mockLocalStorage();

describe("API tests", () => {
    test("Set credentials in localStorage", async () => {
        const header = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
        const key = STORAGE_KEYS.TOKEN;
        await getCredentials();
        expect(setItemMock).toHaveBeenCalledWith(key, expect.stringContaining(header));
    });

    test("Get config", async () => {
        expect(await getConfig()).toEqual(
            expect.objectContaining({
                headers: { Authorization: expect.stringContaining("Bearer") },
            })
        );
    });
});
