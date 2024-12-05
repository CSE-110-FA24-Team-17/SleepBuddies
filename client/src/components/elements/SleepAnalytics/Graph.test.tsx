import { render, screen, fireEvent} from "@testing-library/react";
import { Graph } from "./Graph"; // Adjust the path accordingly

describe("Graph Component", () => {
    test("renders the graph with sleep data", () => {
        const hoursSlept = [8, 5, 7, 6, 9, 4, 6]; 
        const goal = 6;

        render(<Graph hoursSlept={hoursSlept} goal={goal} />);
        expect(screen.getByText("Sleep Throughout the Week")).toBeInTheDocument();
    });

});
