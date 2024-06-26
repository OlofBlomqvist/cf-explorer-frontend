import { screen } from "@testing-library/react";
import Router from "react-router";

import { render } from "src/test-utils";

import RecentRegistrations from ".";

test("should render RecentRegistrations call mock api", async () => {
  jest.spyOn(Router, "useParams").mockReturnValue({ stakeId: "1" });

  render(<RecentRegistrations setShowBackButton={jest.fn()} />);
  const elm = screen.getByTestId("recent-registration");
  expect(elm).toHaveTextContent("Showing");
  expect(elm).toHaveTextContent("Registration List");
});
