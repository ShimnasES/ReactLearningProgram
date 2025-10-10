

/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductReview from '../productReview';

describe('ProductReview rating component', () => {
  test('renders should show number of gold , gray stars, and review count based on rating', () => {
    const rating = { rate: 3.6, count: 42 };
    render(<ProductReview rating={rating} />);

    // Based on provided rating ,Rounded stars should be 4 gold stars
    const goldStars = screen.getAllByText('★').filter(
      (el) => el.style.color === 'rgb(255, 215, 0)' 
    );
    //check the length/count of the gold star
    expect(goldStars).toHaveLength(4);

    // Remaining stars should be gray
    const grayStars = screen.getAllByText('★').filter(
      (el) => el.style.color === 'rgb(204, 204, 204)'
    );
    //check the length/count of the grey star
    expect(grayStars).toHaveLength(1);

    // Check review count text content
    expect(screen.getByText(/\(42 reviews\)/)).toBeInTheDocument();

    // Check that the prefix "Rating:" is present
    expect(screen.getByText(/Rating:/)).toBeInTheDocument();
  });

  test('render grey star when rating is not provided', () => {
    render(<ProductReview rating={{}} />);

    //gold star should be of count 0
    const goldStars = screen.queryAllByText('★').filter(
      (el) => el.style.color === 'rgb(255, 215, 0)'
    );
    expect(goldStars).toHaveLength(0);

    //all the star should be grey
    const grayStars = screen.queryAllByText('★').filter(
      (el) => el.style.color === 'rgb(204, 204, 204)'
    );
    expect(grayStars).toHaveLength(5);

    expect(screen.getByText(/\(0 reviews\)/)).toBeInTheDocument();
  });
});
