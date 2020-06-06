import React from 'react';
import ReactDOM from 'react-dom';
import Bookmark from './Bookmark';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

const bookmark: BookmarkType = {
    id: 1,
    name: 'React Homepage',
    url: 'https://reactjs.org',
    description: 'gehe zur React-Homepage'
}

const handleBookmarkSave = jest.fn();
const handleBookmarkDelete = jest.fn();

afterEach(cleanup);

it('Test 1: Bookmark rendert ohne Crash', () => {
    const divElement = document.createElement('divElement');
    ReactDOM.render(
        <Bookmark bookmark={bookmark} key={bookmark.id} onBookmarkSave={handleBookmarkSave} onBookmarkDelete={handleBookmarkDelete} />,
        divElement
    );
    ReactDOM.unmountComponentAtNode(divElement);
});

it('Test 2: prüfe Bookmark-Ausgabewerte', () => {
    const {getByTestId: bookmarkComponent} = render(<Bookmark bookmark={bookmark} key={bookmark.id} onBookmarkSave={handleBookmarkSave} onBookmarkDelete={handleBookmarkDelete} />);
    //lade UI-Elemente per data-testid-Attribut aus Bookmark.tsx
    //Funktionen toHaveTextContent und toHaveAttribute stammen aus @testing-library/jest-dom/extend-expect
    expect(bookmarkComponent('bookmark-link-element')).toHaveTextContent(bookmark.name);
    expect(bookmarkComponent('bookmark-link-element')).toHaveAttribute('href', bookmark.url);
    expect(bookmarkComponent('bookmark-descr-element')).toHaveTextContent(bookmark.description);
});

it('Test 3: Komponente entspricht Snapshot', () => {
    const bookmarkComponent = renderer.create(<Bookmark bookmark={bookmark} key={bookmark.id} onBookmarkSave={handleBookmarkSave} onBookmarkDelete={handleBookmarkDelete} />);
    expect(bookmarkComponent).toMatchSnapshot();
})