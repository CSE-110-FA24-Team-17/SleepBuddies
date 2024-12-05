import { render, screen } from "@testing-library/react";
import { SleepLog } from "./SleepLog"; 

describe("SleepLog Component", () => {
    it("should render average sleep", () => {
        const averageSleep = 7.2;
        const percentAchieved = 120;
        const bestDay = { day: "Monday", hours: 8 };
        const worstDay = { day: "Wednesday", hours: 5 };
        const goal = 0;

        render(
            <SleepLog 
                averageSleep={averageSleep} 
                bestDay={bestDay} 
                worstDay={worstDay} 
                goal ={goal}
            />
        );

        expect(screen.getByText(/Average Hours Slept:/)).toHaveTextContent("Average Hours Slept: 7.20");
        expect(screen.getByText(/Best Day: Monday/)).toHaveTextContent("Best Day: Monday (8.00 hours)");
        expect(screen.getByText(/Worst Day: Wednesday/)).toHaveTextContent("Worst Day: Wednesday (5.00 hours)");
    });

    it("should handle when average sleep is zero", () => {
        const averageSleep = 0;
        const percentAchieved = 0;
        const bestDay = { day: "Sunday", hours: 0 };
        const worstDay = { day: "Sunday", hours: 0 };
        const goal = 0;

        render(
            <SleepLog 
                averageSleep={averageSleep} 
                bestDay={bestDay} 
                worstDay={worstDay} 
                goal ={goal}
            />
        );

        expect(screen.getByText(/Average Hours Slept:/)).toHaveTextContent("Average Hours Slept: 0.00");
        expect(screen.getByText(/Best Day: Sunday/)).toHaveTextContent("Best Day: Sunday (0.00 hours)");
        expect(screen.getByText(/Worst Day: Sunday/)).toHaveTextContent("Worst Day: Sunday (0.00 hours)");
    });

    it("should handle no valid sleep data (all hours are 0)", () => {
        const averageSleep = 0;
        const percentAchieved = 0;
        const bestDay = { day: "Sunday", hours: 0 };
        const worstDay = { day: "Sunday", hours: 0 };
        const goal = 0;

        render(
            <SleepLog 
                averageSleep={averageSleep} 
                bestDay={bestDay} 
                worstDay={worstDay} 
                goal ={goal}
            />
        );

        // Check for empty or zero values for best and worst day when no valid sleep data is provided
        expect(screen.getByText(/Best Day: Sunday/)).toHaveTextContent("Best Day: Sunday (0.00 hours)");
        expect(screen.getByText(/Worst Day: Sunday/)).toHaveTextContent("Worst Day: Sunday (0.00 hours)");
    });

    it("should display the correct text for the best and worst days", () => {
        const averageSleep = 6.5;
        const percentAchieved = 110;
        const bestDay = { day: "Friday", hours: 9 };
        const worstDay = { day: "Tuesday", hours: 4 };
        const goal = 0;

        render(
            <SleepLog 
                averageSleep={averageSleep} 
                bestDay={bestDay} 
                worstDay={worstDay} 
                goal={goal}
            />
        );

        expect(screen.getByText("Best Day: Friday (9.00 hours)")).toBeInTheDocument();
        expect(screen.getByText("Worst Day: Tuesday (4.00 hours)")).toBeInTheDocument();
    });
});
