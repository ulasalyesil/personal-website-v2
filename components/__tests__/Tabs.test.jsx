import { render, screen, fireEvent } from '@testing-library/react';
import Tabs from '../Tabs';

function mockRect({ left = 0, width = 100 } = {}) {
  return {
    width,
    height: 20,
    top: 0,
    bottom: 20,
    left,
    right: left + width,
    x: left,
    y: 0,
    toJSON: () => {}
  };
}

describe('Tabs component', () => {
  test('renders all tabs', () => {
    window.innerWidth = 1024;
    render(<Tabs />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Works')).toBeInTheDocument();
    expect(screen.getByText('Bookmarks')).toBeInTheDocument();
  });

  test('hides tabs marked hideOnMobile on small screens', () => {
    window.innerWidth = 500;
    render(<Tabs />);
    expect(screen.queryByText('Bookmarks')).toBeNull();
  });

  test('updates highlight style on hover', () => {
    window.innerWidth = 1024;
    const { container } = render(<Tabs />);
    const tab = screen.getByText('About');

    tab.getBoundingClientRect = () => mockRect({ left: 100, width: 50 });
    const wrapper = tab.closest('nav');
    wrapper.getBoundingClientRect = () => mockRect({ left: 50, width: 300 });

    fireEvent.mouseOver(tab);

    const highlight = container.querySelector('nav div');
    expect(highlight.style.opacity).toBe('1');
    expect(highlight.style.width).toBe('50px');
    expect(highlight.style.transform).toBe('translateX(50px)');
  });
});
