import { millisToMinutesAndSeconds } from "@/shared/utils/millisToMinutesAndSeconds";

describe("millisToMinutesAndSeconds utility", () => {
  test("should return 0:00 when given 0", () => {
    expect(millisToMinutesAndSeconds(0)).toBe("0:00");
  });

  test("should return 3:10 when given 190000", () => {
    expect(millisToMinutesAndSeconds(190000)).toBe("3:10");
  });
});
