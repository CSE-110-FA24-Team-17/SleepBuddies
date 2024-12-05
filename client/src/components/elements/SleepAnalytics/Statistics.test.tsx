import { render, screen, fireEvent } from "@testing-library/react";
import { Statistics } from "./Statistics";

const updateSleepDataMock = jest.fn();

describe("Statistics Component", () => {
    beforeEach(() => {
        updateSleepDataMock.mockClear();
    });

    test("renders the component correctly", () => {
        render(<Statistics updateSleepData={updateSleepDataMock} />);

        // Check that the component renders the title and instructions
        expect(screen.getByText(/Sleeping Log/)).toBeInTheDocument();
        expect(screen.getByText(/Enter Sleep Time and Wake Up Time for Each Day/)).toBeInTheDocument();
    });

    test("calculates hours slept correctly", () => {
        render(<Statistics updateSleepData={updateSleepDataMock} />);

        const sleepInput = screen.getByTestId("startMonday") as HTMLInputElement;
        const wakeInput = screen.getByTestId("endMonday") as HTMLInputElement;

        fireEvent.change(sleepInput, { target: { value: "22:00" } }); 
        fireEvent.change(wakeInput, { target: { value: "06:00" } }); 

        // Check if the hours slept for Monday is calculated correctly
        expect(screen.getByText(/: 8.00 Hrs/)).toBeInTheDocument();
    });

    test("calculates the average hours slept correctly", () => {
        render(<Statistics updateSleepData={updateSleepDataMock} />);

        const mondaySleep = screen.getByTestId("startMonday") as HTMLInputElement;
        const mondayWake = screen.getByTestId("endMonday") as HTMLInputElement;
        const tuesdaySleep = screen.getByTestId("startTuesday") as HTMLInputElement;
        const tuesdayWake = screen.getByTestId("endTuesday") as HTMLInputElement;

        fireEvent.change(mondaySleep, { target: { value: "22:00" } });
        fireEvent.change(mondayWake, { target: { value: "06:00" } });

        fireEvent.change(tuesdaySleep, { target: { value: "23:00" } });
        fireEvent.change(tuesdayWake, { target: { value: "07:00" } });

        // Check if the average hours slept is updated correctly
        expect(screen.getByText(/Average Hours Slept this Week: 8.00/)).toBeInTheDocument();
    });
});
