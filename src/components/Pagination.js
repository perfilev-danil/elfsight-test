import styled from 'styled-components';
import { useEffect, useState, useCallback } from 'react';
import { useData } from './providers';

export function Pagination() {
  const [pages, setPages] = useState([]);
  const { apiURL, info, activePage, setActivePage, setApiURL } = useData();

  const updateUrlPage = (pageNumber) => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', pageNumber);
    window.history.pushState(null, '', url.toString());
  };

  const handleFirstPage = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActivePage(0);
    setApiURL(pages[0]);
    updateUrlPage(1);
  }, [pages, setActivePage, setApiURL]);

  const handlePrevPage = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActivePage(activePage - 1);
    setApiURL(pages[activePage - 1]);
    updateUrlPage(activePage);
  }, [activePage, pages, setActivePage, setApiURL]);

  const handleNextPage = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActivePage(activePage + 1);
    setApiURL(pages[activePage + 1]);
    updateUrlPage(activePage + 2);
  }, [activePage, pages, setActivePage, setApiURL]);

  const handleLastPage = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActivePage(pages.length - 1);
    setApiURL(pages[pages.length - 1]);
    updateUrlPage(pages.length);
  }, [pages, setActivePage, setApiURL]);

  useEffect(() => {
    const createdPages = Array.from({ length: info.pages }, (_, i) => {
      const URLWithPage = new URL(apiURL);

      URLWithPage.searchParams.set('page', i + 1);

      return URLWithPage;
    });

    setPages(createdPages);
  }, [info, apiURL]);

  if (pages.length <= 1) return null;

  return (
    <StyledPagination>
      {pages[activePage - 1] && (
        <>
          {activePage - 1 !== 0 && (
            <>
              <Page onClick={handleFirstPage}>« First</Page>
              <Ellipsis>...</Ellipsis>
            </>
          )}

          <Page onClick={handlePrevPage}>{activePage}</Page>
        </>
      )}

      <Page active>{activePage + 1}</Page>

      {pages[activePage + 1] && (
        <>
          <Page onClick={handleNextPage}>{activePage + 2}</Page>

          {activePage + 1 !== pages.length - 1 && (
            <>
              <Ellipsis>...</Ellipsis>
              <Page onClick={handleLastPage}>Last »</Page>
            </>
          )}
        </>
      )}
    </StyledPagination>
  );
}

const StyledPagination = styled.div`
  width: 100%;
  text-align: center;
`;

const Page = styled.span`
  color: #fff;
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  transition: color 0.2s;
  ${({ active }) => active && 'color: #83bf46'};

  &:hover {
    color: #83bf46;
  }
`;

const Ellipsis = styled(Page)`
  cursor: default;

  &:hover {
    color: #fff;
  }
`;
