import { truncateText, capitalizeFirstLetter, filterItems, sum } from '../utils/utilities';

// Tests for truncateText
describe('truncateText', () => {
  it('should return the full text if within limit', () => {
    expect(truncateText('Hello', 10)).toBe('Hello');
  });

  it('should truncate text and add ellipsis if too long', () => {
    expect(truncateText('Hello World!', 5)).toBe('Hello...');
  });
});

// Tests for capitalizeFirstLetter
describe('capitalizeFirstLetter', () => {
  it('should capitalize the first letter', () => {
    expect(capitalizeFirstLetter('hello')).toBe('Hello');
  });

  it('should return an empty string if input is empty', () => {
    expect(capitalizeFirstLetter('')).toBe('');
  });

  it('should not change an already capitalized first letter', () => {
    expect(capitalizeFirstLetter('Hello')).toBe('Hello');
  });
});

// Tests for filterItems
describe('filterItems', () => {
  it('should return matching items', () => {
    expect(filterItems(['Apple', 'Banana', 'Cherry'], 'Ap')).toEqual(['Apple']);
  });

  it('should be case insensitive', () => {
    expect(filterItems(['Apple', 'Banana', 'Cherry'], 'ap')).toEqual(['Apple']);
  });

  it('should return an empty array if no matches found', () => {
    expect(filterItems(['Apple', 'Banana', 'Cherry'], 'xyz')).toEqual([]);
  });

  it('should return all items if query is empty', () => {
    expect(filterItems(['Apple', 'Banana', 'Cherry'], '')).toEqual(['Apple', 'Banana', 'Cherry']);
  });
});

// Tests for sum
describe('sum', () => {
  it('should return the correct sum of two numbers', () => {
    expect(sum(2, 3)).toBe(5);
  });

  it('should handle negative numbers correctly', () => {
    expect(sum(-2, 3)).toBe(1);
  });

  it('should return 0 when summing two zeros', () => {
    expect(sum(0, 0)).toBe(0);
  });

  it('should handle large numbers', () => {
    expect(sum(1000000, 2000000)).toBe(3000000);
  });
});
