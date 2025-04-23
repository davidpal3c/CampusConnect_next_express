import { Button } from "@/components/ui/button";
import { fireEvent, render, screen } from "@testing-library/react";
import ActionButton from "@/app/components/Buttons/ActionButton";
import OptionsButton from "@/app/components/Buttons/OptionsButton";

test("Calls onClick when Button is clicked", () => {
  const handleClick = jest.fn();
  const buttonName = "test button";
  render(<Button onClick={handleClick}>{buttonName}</Button>);

  const button = screen.getByText(buttonName);
  fireEvent.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);
  // expect(buttonElement).toBeInTheDocument();
});

// Test ActionButton
test("Calls onClick when ActionButton is clicked", () => {
  const handleClick = jest.fn();
  render(<ActionButton onClick={handleClick} title="Click Me" />);

  const button = screen.getByText("Click Me");
  fireEvent.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);
});

// Test OptionsButton
test("OptionsButton renders and opens menu on click", () => {
  const mockOptions = [
    { title: "Option 1", handler: jest.fn() },
    { title: "Option 2", handler: jest.fn() },
  ];

  render(<OptionsButton title="Options" optionHandler={mockOptions} />);
  
  const button = screen.getByText("Options");
  expect(button).toBeInTheDocument();

  fireEvent.click(button);
  
  const option1 = screen.getByText("Option 1");
  expect(option1).toBeInTheDocument();
});
