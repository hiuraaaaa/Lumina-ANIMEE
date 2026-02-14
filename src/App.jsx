import React, { useState, useEffect } from 'react';
import { ROUTES } from './config/settings';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Preloader from './components/layout/Preloader';
import HomePage from './pages/HomePage';
import SchedulePage from './pages/SchedulePage';
import OngoingPage from './pages/OngoingPage';
import CompletedPage from './pages/CompletedPage';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import WatchPage from './pages/WatchPage';

function App() {
  const [loading, setLoading] = useState(true);
  const [currentRoute, setCurrentRoute] = useState(ROUTES.HOME);
  const [routeParams, setRouteParams] = useState({});

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const navigate = (route, params = {}) => {
    setCurrentRoute(route);
    setRouteParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentRoute) {
      case ROUTES.HOME:
        return <HomePage onNavigateToDetail={(slug) => navigate(ROUTES.DETAIL, { slug })} />;
      
      case ROUTES.SCHEDULE:
        return (
          <SchedulePage
            onBack={() => navigate(ROUTES.HOME)}
            onNavigateToDetail={(slug) => navigate(ROUTES.DETAIL, { slug })}
          />
        );
      
      case ROUTES.ONGOING:
        return (
          <OngoingPage
            onBack={() => navigate(ROUTES.HOME)}
            onNavigateToDetail={(slug) => navigate(ROUTES.DETAIL, { slug })}
          />
        );
      
      case ROUTES.COMPLETED:
        return (
          <CompletedPage
            onBack={() => navigate(ROUTES.HOME)}
            onNavigateToDetail={(slug) => navigate(ROUTES.DETAIL, { slug })}
          />
        );
      
      case ROUTES.SEARCH:
        return (
          <SearchPage
            query={routeParams.query}
            onBack={() => navigate(ROUTES.HOME)}
            onNavigateToDetail={(slug) => navigate(ROUTES.DETAIL, { slug })}
          />
        );
      
      case ROUTES.DETAIL:
        return (
          <DetailPage
            slug={routeParams.slug}
            onBack={() => navigate(ROUTES.HOME)}
            onWatch={(slug) => navigate(ROUTES.WATCH, { slug })}
          />
        );
      
      case ROUTES.WATCH:
        return (
          <WatchPage
            slug={routeParams.slug}
            onBack={() => navigate(ROUTES.DETAIL, { slug: routeParams.previousSlug || routeParams.slug })}
          />
        );
      
      default:
        return <HomePage onNavigateToDetail={(slug) => navigate(ROUTES.DETAIL, { slug })} />;
    }
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-lighter">
      <Header
        onNavigate={(route) => navigate(route)}
        onSearch={(query) => navigate(ROUTES.SEARCH, { query })}
      />
      <main className="container-custom py-8 animate-fade-in">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
