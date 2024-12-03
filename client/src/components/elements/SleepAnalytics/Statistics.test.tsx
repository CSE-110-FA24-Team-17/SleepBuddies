import { render, screen, fireEvent } from '@testing-library/react';
import { Statistics } from './Statistics';

describe("Statistics for Weekly Hours input", () => {
    test("Test Statistics page renders", () => {
        render(<Statistics updateSleepData={function (newHoursSlept: number[]): void {
            throw new Error('Function not implemented.');
        } } />);
        const Sunday = screen.getByText(/Sunday/);
        expect(Sunday).toBeInTheDocument();

        const Monday = screen.getByText(/Monday/);
        expect(Monday).toBeInTheDocument();

        const Friday = screen.getByText(/Friday/);
        expect(Friday).toBeInTheDocument();
    });

    test("Test Inputting start and end time", () => {
        render(<Statistics updateSleepData={function (newHoursSlept: number[]): void {
            throw new Error('Function not implemented.');
        } } />);

        let MondayStart = screen.getByTestId("startMonday");
        expect(MondayStart).toBeInTheDocument();

        fireEvent.change(MondayStart, {target: {value: "08:00"}});
        MondayStart = screen.getByTestId("startMonday");
        expect(MondayStart).toHaveValue("08:00");

        let MondayEnd = screen.getByTestId("endMonday");
        expect(MondayEnd).toBeInTheDocument();

        fireEvent.change(MondayEnd, {target: {value: "10:00"}});
        MondayEnd = screen.getByTestId("endMonday");
        expect(MondayEnd).toHaveValue("10:00");

        const MondayHours = screen.getAllByText(/: 2.00/);
        expect(MondayHours[0]).toBeInTheDocument();
    });

    test("Test Finding Average Slept Hours", () => {
        render(<Statistics updateSleepData={function (newHoursSlept: number[]): void {
            throw new Error('Function not implemented.');
        } } />);

        const TuesdayStart = screen.getByTestId("startTuesday");
        fireEvent.change(TuesdayStart, {target: {value: "08:00"}});

        const TuesdayEnd = screen.getByTestId("endTuesday");
        fireEvent.change(TuesdayEnd, {target: {value: "10:00"}});

        const ThursdayStart = screen.getByTestId("startThursday");
        fireEvent.change(ThursdayStart, {target: {value: "13:00"}})

        const ThursdayEnd = screen.getByTestId("endThursday");
        fireEvent.change(ThursdayEnd, {target: {value: "18:00"}});

        const AverageHours = screen.getAllByText("Average Hours Slept this Week: 3.50");
        expect(AverageHours[0]).toBeInTheDocument();
    });

});

function updateSleepData(newHoursSlept: number[]): void {
    throw new Error('Function not implemented.');
}
