import { render, screen, fireEvent} from "@testing-library/react";
import { Graph } from "./Graph"; // Adjust the path accordingly

describe("Graph Component", () => {
    test("renders the graph with sleep data", () => {
        const hoursSlept = [8, 5, 7, 6, 9, 4, 6]; 

        render(<Graph hoursSlept={hoursSlept} />);
        expect(screen.getByText("Sleep Throughout the Week")).toBeInTheDocument();
    });

    test("updates goal", () => {
        const hoursSlept = [8, 5, 7, 6, 9, 4, 6];

        render(<Graph hoursSlept={hoursSlept} />);

        const goalInput = screen.getByLabelText(/Set your Sleep Goal/);
        fireEvent.change(goalInput, { target: { value: "6" } });

        fireEvent.change(goalInput, { target: { value: "10" } });
        expect(goalInput).toHaveValue(10);
        expect(goalInput).not.toHaveValue(6);
    });

});
